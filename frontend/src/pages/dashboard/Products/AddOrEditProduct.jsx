import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import VmModal from "@/components/modals/VmModal";
import { toast } from "sonner";
import { useAddProductMutation, useEditProductMutation } from "@/redux-store/api/productApi";
import { useGetAllCategoryQuery } from "@/redux-store/api/categoryApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"

const AddOrEditProduct = ({ isOpen, setOpen, selectedProduct, refetch }) => {
   const [addProduct, { isLoading: addLoading }] = useAddProductMutation();
   const [editProduct, { isLoading: editLoading }] = useEditProductMutation();
   const { data: categoryData, isLoading: categoryLoading } = useGetAllCategoryQuery();
   const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
   const [imagePreview, setImagePreview] = useState([]);
   const [files, setFiles] = useState([]);
   const [dragging, setDragging] = useState(false);
   const fileInputRef = useRef(null);
   const sizeOptions = ["S", "M", "L", "XL", "XXL"];
   const colorOptions = ["Black", "White", "Red", "Blue", "Green"];

   const [selectedSizes, setSelectedSizes] = useState([]);
   const [selectedColors, setSelectedColors] = useState([]);

   useEffect(() => {
      if (selectedProduct) {
         setImagePreview(selectedProduct?.images?.map(img => img.url) || []);
         setSelectedSizes(selectedProduct.sizes || []);
         setSelectedColors(selectedProduct.colors || []);
         reset({
            name: selectedProduct.name,
            description: selectedProduct.description,
            price: selectedProduct.price,
            brand: selectedProduct.brand,
            sizes: selectedProduct.sizes.join(", "),
            colors: selectedProduct.colors.join(", "),
            stock: selectedProduct.stock,
            category: selectedProduct.category._id
         });
      } else {
         reset({});
         setImagePreview([]);
         setFiles([]);
         setSelectedSizes([]);
         setSelectedColors([]);
      }
   }, [selectedProduct, reset]);

   const onSubmit = async (data) => {
      try {
         const formData = new FormData();
         const productData = {
            ...data,
            sizes: selectedSizes,
            colors: selectedColors,
            price: parseFloat(data.price),
            stock: parseInt(data.stock)
         };
         formData.append("content", JSON.stringify(productData));
         if (files?.length > 0) {
            files.forEach((file) => {
               formData.append(`images`, file);
            });
         }
         if (selectedProduct) {
            await editProduct({ id: selectedProduct?._id, formData });
            handleClose();

            toast.success("Product Updated Successfully.");
         } else {
            await addProduct(formData);
            handleClose();
            toast.success("Created new product successfully.");
         }
         refetch();
      } catch {
         toast.error(`Failed to ${selectedProduct ? "Edit" : "Add"} Product`);
      }
   };

   const handleClose = () => {
      setOpen(false);
      reset();
      setFiles(null);
      setImagePreview([]);

   };

   const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
      selectedFiles.forEach(file => {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(prev => [...prev, reader.result]);
         };
         reader.readAsDataURL(file);
      });
   };

   const handleDragOver = (e) => {
      e.preventDefault();
      setDragging(true);
   };

   const handleDragLeave = () => {
      setDragging(false);
   };

   const handleDrop = (e) => {
      e.preventDefault();
      setDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
      droppedFiles.forEach(file => {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(prev => [...prev, reader.result]);
         };
         reader.readAsDataURL(file);
      });
   };

   const triggerFileInput = () => {
      fileInputRef.current.click();
   };

   return (
      <VmModal isOpen={isOpen} handleClose={handleClose} title={`${selectedProduct ? "Edit" : "Add"} Product`} size={"900px"}>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-base">
            <div className="space-y-1.5">
               <Label htmlFor="name">Product Name</Label>
               <Input
                  id="name"
                  {...register("name", { required: "Product name is required" })}
               />
               {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
               <Label htmlFor="description">Description</Label>
               <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
               />
               {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input
                     id="price"
                     type="number"
                     step="0.01"
                     {...register("price", { required: "Price is required", min: 0 })}
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
               </div>
               <div className="space-y-1.5">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                     id="brand"
                     {...register("brand", { required: "Brand is required" })}
                  />
                  {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
               </div>
            </div>
            <div className="grid lg:grid-cols-2 border p-6 border-primary rounded-sm border-opacity-50 gap-8 lg:gap-4">
               <div className="space-y-2">
                  <Label>Sizes</Label>
                  <div className="flex flex-wrap gap-4">
                     {sizeOptions.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                           <Checkbox
                              id={`size-${size}`}
                              checked={selectedSizes.includes(size)}
                              onCheckedChange={(checked) => {
                                 setSelectedSizes(prev =>
                                    checked
                                       ? [...prev, size]
                                       : prev.filter(s => s !== size)
                                 );
                              }}
                           />
                           <label
                              htmlFor={`size-${size}`}
                              className="text-base cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                           >
                              {size}
                           </label>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="space-y-2 ">
                  <Label>Colors</Label>
                  <div className="flex flex-wrap gap-4">
                     {colorOptions.map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                           <Checkbox
                              id={`color-${color}`}
                              checked={selectedColors.includes(color)}
                              onCheckedChange={(checked) => {
                                 setSelectedColors(prev =>
                                    checked
                                       ? [...prev, color]
                                       : prev.filter(c => c !== color)
                                 );
                              }}
                           />
                           <label
                              htmlFor={`color-${color}`}
                              className="text-base cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                           >
                              {color}
                           </label>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                     id="stock"
                     type="number"
                     {...register("stock", { required: "Stock is required", min: 0 })}
                  />
                  {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
               </div>
               <div className="space-y-1.5 ">
                  <Label htmlFor="category">Category</Label>
                  <Controller
                     name="category"
                     control={control}
                     rules={{ required: "Category is required" }}
                     render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                           </SelectTrigger>
                           <SelectContent>
                              {categoryData?.categories?.map((category) => (
                                 <SelectItem key={category._id} value={category._id}>
                                    {category.name}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                     )}
                  />
                  {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
               </div>
            </div>
            <div className="space-y-1.5">
               <Label htmlFor="images">Images</Label>
               <div
                  className={`border-2 ${dragging ? "border-blue-500" : "border-gray-300"} border-dashed rounded-lg p-4 text-center cursor-pointer`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
               >
                  {imagePreview.length > 0 ? (
                     <div className="grid grid-cols-3 gap-2">
                        {imagePreview.map((preview, index) => (
                           <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                        ))}
                     </div>
                  ) : (
                     <p className="text-gray-500">Drag & Drop or Click to Upload Multiple Images</p>
                  )}
                  <Input
                     id="images"
                     type="file"
                     accept="image/*"
                     multiple
                     ref={fileInputRef}
                     className="hidden"
                     onChange={handleFileChange}
                  />
               </div>
            </div>
            <div className="flex justify-end space-x-2">
               <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
               </Button>
               <Button type="submit" disabled={addLoading || editLoading} className="disabled:opacity-40">
                  {selectedProduct ? "Update" : "Add"} Product
               </Button>
            </div>
         </form>
      </VmModal>
   );
};

export default AddOrEditProduct;

