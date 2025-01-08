import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useGetAllCategoryQuery } from '@/redux-store/api/categoryApi';
import { useAddProductMutation } from '@/redux-store/api/productApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, Tag, Palette, Box, DollarSign, BarChart, FileText, ImageIcon } from 'lucide-react';

const AddProduct = () => {
   const [addProduct, { isLoading: addLoading }] = useAddProductMutation();
   const { data: categoryData, isLoading: categoryLoading } = useGetAllCategoryQuery();
   const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
   const [imagePreview, setImagePreview] = useState([]);
   const [files, setFiles] = useState([]);
   const [dragging, setDragging] = useState(false);
   const fileInputRef = useRef(null);
   const sizeOptions = ["S", "M", "L", "XL", "XXL"];
   const colorOptions = ["Black", "White", "Red", "Blue", "Green"];

   const [selectedSizes, setSelectedSizes] = useState([]);
   const [selectedColors, setSelectedColors] = useState([]);

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
         await addProduct(formData);
         toast.success("Product Added Successfully.");
         reset()
      } catch {
         toast.error(`Failed to Add Product`);
      }
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
      <div className='py-2'>
         <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
               <CardTitle className="text-2xl font-medium text-title">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                           <FileText size={18} />
                           Product Name
                        </Label>
                        <Input
                           id="name"
                           {...register("name", { required: "Product name is required" })}
                           className="w-full"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="brand" className="flex items-center gap-2">
                           <Tag size={18} />
                           Brand
                        </Label>
                        <Input
                           id="brand"
                           {...register("brand", { required: "Brand is required" })}
                           className="w-full"
                        />
                        {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="description" className="flex items-center gap-2">
                        <FileText size={18} />
                        Description
                     </Label>
                     <Textarea
                        id="description"
                        {...register("description", { required: "Description is required" })}
                        className="w-full min-h-[100px]"
                     />
                     {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="price" className="flex items-center gap-2">
                           <DollarSign size={18} />
                           Price
                        </Label>
                        <Input
                           id="price"
                           type="number"
                           step="0.01"
                           {...register("price", { required: "Price is required", min: 0 })}
                           className="w-full"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="stock" className="flex items-center gap-2">
                           <Box size={18} />
                           Stock
                        </Label>
                        <Input
                           id="stock"
                           type="number"
                           {...register("stock", { required: "Stock is required", min: 0 })}
                           className="w-full"
                        />
                        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-secondary rounded-lg">
                     <div className="space-y-4">
                        <Label className="flex items-center gap-2">
                           <Tag size={18} />
                           Sizes
                        </Label>
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
                                    className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                 >
                                    {size}
                                 </label>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <Label className="flex items-center gap-2">
                           <Palette size={18} />
                           Colors
                        </Label>
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
                                    className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                 >
                                    {color}
                                 </label>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="category" className="flex items-center gap-2">
                        <BarChart size={18} />
                        Category
                     </Label>
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

                  <div className="space-y-2">
                     <Label htmlFor="images" className="flex items-center gap-2">
                        <ImageIcon size={18} />
                        Images
                     </Label>
                     <div
                        className={`border-2 ${dragging ? "border-primary" : "border-border"} border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={triggerFileInput}
                     >
                        {imagePreview.length > 0 ? (
                           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {imagePreview.map((preview, index) => (
                                 <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                              ))}
                           </div>
                        ) : (
                           <div className="flex flex-col items-center">
                              <Upload size={48} className="text-muted-foreground mb-2" />
                              <p className="text-muted-foreground">Drag & Drop or Click to Upload Multiple Images</p>
                           </div>
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

                  <div className="flex justify-end">
                     <Button type="submit" disabled={addLoading || categoryLoading} className="w-full sm:w-auto">
                        {addLoading ? (
                           <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Adding Product...
                           </>
                        ) : (
                           'Add Product'
                        )}
                     </Button>
                  </div>
               </form>
            </CardContent>
         </Card>
      </div>
   );
};

export default AddProduct;

