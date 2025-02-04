import Empty from "@/components/empty/Empty";
import CustomPagination from "@/components/pagination/CustomPagination";
import { Button } from "@/components/ui/button";
import { Edit, ShoppingBag, Trash2 } from "lucide-react";
import AddOrEditProduct from "./AddOrEditProduct";
import VmAlert from "@/components/modals/VmAlert";
import Loading from "@/components/loading/Loading";
import { toast } from "sonner";
import { useState } from "react";
import { useDeleteProductMutation, useGetAllProductQuery } from "@/redux-store/services/productApi";
import { UserAvatar } from "@/components/user-avatar/UserAvatar";

const ManageProducts = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [isDelete, setIsDelete] = useState(false)
   const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation()
   const { data: productData, isLoading, refetch } = useGetAllProductQuery()

   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;
   const totalPages = Math.ceil(productData?.products?.length / itemsPerPage);
   const handlePageChange = (page) => {
      setCurrentPage(page);
   };
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = productData?.products?.slice(indexOfFirstItem, indexOfLastItem);

   const handleDeleteClick = (category) => {
      setSelectedProduct(category)
      setIsDelete(true)
   }

   const handleDelete = async () => {
      try {
         await deleteProduct(selectedProduct?._id)
         toast.success("Product deleted successfully.")
         refetch()
         setIsDelete(false)
      } catch {
         toast.error("Failed to delete Product.")
      }
   }
   const handleAddNew = () => {
      setSelectedProduct(null);
      setIsOpen(true);
   };

   const handleEdit = (category) => {
      setSelectedProduct(category);
      setIsOpen(true);
   };




   return (
      <div>
         <div className="flex flex-col gap-4  items-center justify-between lg:flex-row">
            <h3 className="text-[20px] font-medium text-des flex items-center gap-2 "><ShoppingBag />Product</h3>
            <Button className={``} onClick={handleAddNew}>Add New</Button>
         </div>

         <div>
            {isLoading ? <Loading /> : productData && currentItems?.length > 0 ? <div className="w-full flex flex-col">
               <div className="mt-6 min-h-[70vh]  min-w-full relative overflow-y-auto overflow-x-auto">
                  <table className="overflow-auto border-0 m-0 w-full min-w-full">
                     <thead className="rounded-md border-none font-[500] text-center">
                        <tr className="border-none bg-[#e3e3e4a8] rounded-md text-[16px] font-[500]">
                           <th className="px-6 py-2 text-center whitespace-nowrap text-[#6C6C6C]">SL No</th>
                           <th className="px-6 py-2 text-start text-[#6C6C6C]">Product</th>
                           <th className="px-6 py-2 text-start text-[#6C6C6C]">Category</th>
                           <th className="px-6 py-2 text-start text-[#6C6C6C]">Stock</th>
                           <th className="px-6 py-2 text-start text-[#6C6C6C]">Price</th>
                           <th className="px-6 py-2 text-center text-[#6C6C6C]">Action</th>
                        </tr>
                     </thead>
                     <tbody className="bg-white">
                        {currentItems?.map((data, index) => (
                           <tr
                              key={data._id}
                              className="bg-white border-b-[2px] border-[#E9EDF1] text-[16px]"
                           >
                              <td className="px-6 py-2 text-center font-medium text-[#6C6C6C]">
                                 {(currentPage - 1) * itemsPerPage + index + 1}
                              </td>
                              <td className="px-6 py-2 text-base font-medium text-[#6B6B6B] text-start">
                                 <div className="flex items-center gap-2">
                                    <UserAvatar size={"xl"} className={"rounded-sm"} name={data?.name} photo={data?.images[0]?.url} />
                                    <span>{data.name}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-2 text-base font-medium text-[#6B6B6B] text-start">
                                 {data.category.name}
                              </td>
                              <td className="px-6 py-2 text-base font-medium text-[#6B6B6B] text-start">
                                 {data.stock}
                              </td>
                              <td className="px-6 py-2 text-base font-medium text-primary text-start">
                                 $ {data.price.toFixed(2)}
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
            </div> : <Empty message={"No data found in products"} />}
         </div>


         <AddOrEditProduct refetch={refetch} isOpen={isOpen} setOpen={setIsOpen} selectedProduct={selectedProduct} />
         <VmAlert isOpen={isDelete} handleClose={() => {
            setIsDelete(false)
            setSelectedProduct(null)

         }}
            isLoading={deleteLoading}
            message={"Confirm to Delete Product"} description={"If you are confirm to delete product will be delete permanently"} handleConfirm={handleDelete} />
      </div>
   );
};

export default ManageProducts;
