import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import VmModal from "@/components/modals/VmModal";
import { toast } from "sonner";
import { useAddCategoryMutation, useEditCategoryMutation } from "@/redux-store/services/categoryApi";

const AddOrEditCategory = ({ isOpen, setOpen, selectedCategory, refetch }) => {
   const [addCategory, { isLoading: addLoading }] = useAddCategoryMutation()
   const [editCategory, { isLoading: editLoading }] = useEditCategoryMutation()
   const { register, handleSubmit, reset, formState: { errors } } = useForm();
   const [imagePreview, setImagePreview] = useState(null);
   const [file, setFile] = useState(null)
   const [dragging, setDragging] = useState(false);
   const fileInputRef = useRef(null);

   useEffect(() => {
      if (selectedCategory) {
         setImagePreview(selectedCategory?.image);
         reset({
            name: selectedCategory.name,
            description: selectedCategory.description
         });
      } else {
         reset({});
      }
   }, [selectedCategory, reset]);

   const onSubmit = async (data) => {
      console.log(data);

      try {
         const formData = new FormData();
         formData.append("content", JSON.stringify(data))
         if (file) {
            formData.append("image", file)
         }
         if (selectedCategory) {
            await editCategory({ id: selectedCategory?._id, formData })
            handleClose()
            toast.success("Category Updated Successfully.")
            refetch()
         } else {
            await addCategory(formData)
            handleClose()
            toast.success("Created new category successfully.")
            refetch()
         }
      } catch {
         toast.error(`Failed to ${selectedCategory ? "Edit" : "Add"} Category`)
      }
   };

   const handleClose = () => {
      setOpen(false);
      reset({});
      setFile(null)
      setImagePreview(null);
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setFile(file)
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result);
         };
         reader.readAsDataURL(file);
      }
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
      const file = e.dataTransfer.files[0];
      if (file) {
         setFile(file)
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   const triggerFileInput = () => {
      fileInputRef.current.click();
   };

   return (
      <VmModal isOpen={isOpen} handleClose={handleClose} title={`${selectedCategory ? "Edit" : "Add"} Category`} size={"700px"}>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
               <Label htmlFor="name">Category Name</Label>
               <Input
                  id="name"
                  {...register("name", { required: "Category name is required" })}
               />
               {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
               <Label htmlFor="description">Description</Label>
               <Textarea
                  id="description"
                  {...register("description")}
               />
            </div>
            <div className="space-y-1.5">
               <Label htmlFor="image">Image</Label>
               <div
                  className={`border-2 ${dragging ? "border-blue-500" : "border-gray-300"} border-dashed rounded-lg p-4 text-center cursor-pointer`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
               >
                  {imagePreview ? (
                     <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-md mb-2" />
                  ) : (
                     <p className="text-gray-500">Drag & Drop or Click to Upload</p>
                  )}
                  <Input
                     id="image"
                     type="file"
                     accept="image/*"
                     {...register("image")}
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
                  {selectedCategory ? "Update" : "Add"} Category
               </Button>
            </div>
         </form>
      </VmModal>
   );
};

export default AddOrEditCategory;
