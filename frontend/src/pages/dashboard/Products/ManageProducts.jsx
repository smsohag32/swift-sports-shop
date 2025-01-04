import { buttonVariants } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const ManageProducts = () => {
   return (
      <div>
         <div className="flex flex-col gap-4  items-center justify-between lg:flex-row">
            <h3 className="text-[20px] font-medium text-des flex items-center gap-2 "><ShoppingBag />Product</h3>
            <Link className={`${buttonVariants("primary")}`} to={"/dashboard/products/new"}>Add New</Link>
         </div>
      </div>
   );
};

export default ManageProducts;
