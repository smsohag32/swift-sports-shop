import Empty from "@/components/empty/Empty";
import Loading from "@/components/loading/Loading";
import CustomPagination from "@/components/pagination/CustomPagination";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar/UserAvatar";
import { Edit, Tags, Trash2 } from "lucide-react";
import { useState } from "react";
import AddOrEditCategory from "./AddOrEditCategory";
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from "@/redux-store/api/categoryApi";
import VmAlert from "@/components/modals/VmAlert";
import { toast } from "sonner";

const Categories = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [isDelete, setIsDelete] = useState(false)
   const [deleteCategory, { isLoading: deleteLoading }] = useDeleteCategoryMutation()
   const { data: categoryData, isLoading, refetch } = useGetAllCategoryQuery()

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;
   const totalPages = Math.ceil(categoryData?.categories?.length / itemsPerPage);
   const handlePageChange = (page) => {
      setCurrentPage(page);
   };
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = categoryData?.categories?.slice(indexOfFirstItem, indexOfLastItem);

   const handleDeleteClick = (category) => {
      setSelectedCategory(category)
      setIsDelete(true)
   }

   const handleDelete = async () => {
      try {
         await deleteCategory(selectedCategory?._id)
         toast.success("Category deleted successfully.")
         refetch()
         setIsDelete(false)
      } catch {
         toast.error("Failed to delete category.")
      }
   }
   const handleAddNew = () => {
      setSelectedCategory(null);
      setIsOpen(true);
   };

   const handleEdit = (category) => {
      setSelectedCategory(category);
      setIsOpen(true);
   };



   return (
      <div>
         <div className="flex flex-col gap-4  items-center justify-between lg:flex-row">
            <h3 className="text-[20px] font-medium text-des flex items-center gap-2 "><Tags />Category Management</h3>
            <Button onClick={handleAddNew}>Add New</Button>
         </div>

         <div>
            {isLoading ? <Loading /> : categoryData && currentItems?.length > 0 ? <div className="w-full flex flex-col">
               <div className="mt-6 min-h-[70vh]  min-w-full relative overflow-y-auto overflow-x-auto">
                  <table className="overflow-auto border-0 m-0 w-full min-w-full">
                     <thead className="rounded-md border-none font-[500] text-center">
                        <tr className="border-none bg-[#e3e3e4a8] rounded-md text-[16px] font-[500]">
                           <th className="px-6 py-2 text-center whitespace-nowrap text-[#6C6C6C]">SL No</th>
                           <th className="px-6 py-2 text-start text-[#6C6C6C]">Image</th>
                           <th className="px-6 py-2 text-start text-[#6C6C6C]">Category</th>
                           <th className="px-6 py-2 text-start text-[#6C6C6C]">Total Product</th>
                           <th className="px-6 py-2 text-start text-[#6C6C6C]">Description</th>
                           <th className="px-6 py-2 text-center text-[#6C6C6C]">Action</th>
                        </tr>
                     </thead>
                     <tbody className="bg-white">
                        {currentItems?.map((data, index) => (
                           <tr
                              key={data.id}
                              className="bg-white border-b-[2px] border-[#E9EDF1] text-[16px]"
                           >
                              <td className="px-6 py-2 text-center font-medium text-[#6C6C6C]">
                                 {(currentPage - 1) * itemsPerPage + index + 1}
                              </td>
                              <td className="px-6 py-2 text-base font-medium text-[#6B6B6B] text-start">
                                 <div className="flex items-center gap-2">
                                    <UserAvatar size={"xl"} className={"rounded-sm"} name={data?.name} photo={data?.image} />
                                 </div>
                              </td>
                              <td className="px-6 py-2 text-base font-medium text-[#6B6B6B] text-start">
                                 <div className="flex font-semibold items-center gap-2">
                                    <p>{data.name}</p>
                                 </div>
                              </td>
                              <td className="px-6 py-2 text-base font-medium text-[#6B6B6B] text-start">
                                 {data?.product?.length || "0"}
                              </td>
                              <td className="px-6 py-2 text-base font-medium text-[#6B6B6B] text-start">
                                 <p className="w-full max-w-sm">{data?.description || "Not Set"}</p>
                              </td>

                              <td className="px-6 py-2 text-center">
                                 <div className="flex items-center gap-2 justify-center">
                                    <Button
                                       variant="secondary"
                                       type="button"
                                       className="h-8 w-8 rounded-[8px]"
                                       size="icon"
                                       onClick={() => handleEdit(data)}
                                    >
                                       <Edit size={16} />
                                    </Button>
                                    <Button
                                       variant="destructive"
                                       type="button"
                                       size="icon"
                                       className="h-8 w-8 rounded-[8px]"
                                       onClick={() => handleDeleteClick(data)}
                                    >
                                       <Trash2 size={16} />
                                    </Button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
               />
            </div> : <Empty message={"No data found in categories"} />}
         </div>


         <AddOrEditCategory refetch={refetch} isOpen={isOpen} setOpen={setIsOpen} selectedCategory={selectedCategory} />
         <VmAlert isOpen={isDelete} handleClose={() => {
            setIsDelete(false)
            setSelectedCategory(null)

         }}
            isLoading={deleteLoading}
            message={"Confirm to Delete Category"} description={"If you are confirm to delete category will be delete permanently"} handleConfirm={handleDelete} />
      </div>
   );
};

export default Categories;
