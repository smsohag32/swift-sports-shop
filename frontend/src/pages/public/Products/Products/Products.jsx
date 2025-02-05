
import ProductCard from "@/components/cards/ProductCard";
import { useSearchProductQuery } from "@/redux-store/services/productApi";

import ProductCardSkeleton from "@/components/skeleton/ProductSkeleton";
import { Link, useSearchParams } from "react-router-dom";
import { formatName } from "@/utils/helper";
import FilterPanel from "./FilterPanel";
import { Input } from "@/components/ui/input";
import { ChevronRight, ShoppingBag } from "lucide-react";
import Empty from "@/components/empty/Empty";
import { useState } from "react";

const Products = () => {
   const [searchParams] = useSearchParams();
   const category = searchParams.get("category");
   const [searchText, setSearchText] = useState("")
   const categoryId = searchParams.get("id");
   const { data: productData, error, isLoading } = useSearchProductQuery({
      searchText: searchText,
      isAscending: true,
      itemPerPage: 10,
      page: 1,
      ...(categoryId ? { categoryId } : category ? { category } : {}),
   });

   const filteredProducts = productData?.products

   const skeletonArray = Array(8).fill(null);

   return (
      <div className="pt-10 pb-16">
         <div className="main-container">
            <div className="flex flex-col mb-6 sm:flex-row justify-between items-center gap-4">
               <div className="text-2xl lg:text-3xl text-gray-800 font-semibold flex items-center space-x-2">
                  <ShoppingBag className="w-6 h-6 text-primary" aria-hidden="true" />
                  <span className="sr-only">Products</span>
                  <nav className="flex items-center text-sm sm:text-base" aria-label="Breadcrumb">
                     <ol className="flex items-center space-x-2">
                        <li>
                           <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
                              Home
                           </Link>
                        </li>
                        <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
                        <li>
                           <Link to="/products" className="text-gray-500 hover:text-primary transition-colors">
                              Products
                           </Link>
                        </li>
                        {category && (
                           <>
                              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
                              <li>
                                 <span className="text-primary font-medium" aria-current="page">
                                    {formatName(category)}
                                 </span>
                              </li>
                           </>
                        )}
                     </ol>
                  </nav>
               </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
               <FilterPanel />
               <div className="w-full lg:w-3/4">
                  <div className="mb-4">
                     <Input
                        onChange={(e) => setSearchText(e.target.value)}
                        type="search"
                        placeholder="Search products..."
                        className="w-full"
                     />
                  </div>
                  {
                     filteredProducts && filteredProducts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isLoading
                           ? skeletonArray.map((_, index) => (
                              <ProductCardSkeleton key={index} />
                           ))
                           : filteredProducts && filteredProducts.length > 0
                              ? filteredProducts.map((product) => (
                                 <ProductCard product={product} key={product?._id} />
                              ))
                              : <Empty message={"No products found."}></Empty>
                        }
                     </div> : <Empty message={"No products found."}></Empty>
                  }

               </div>
            </div>

         </div>
      </div>
   );
};

export default Products;


