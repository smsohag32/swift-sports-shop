
import ProductCard from "@/components/cards/ProductCard";
import { useGetAllProductQuery } from "@/redux-store/api/productApi";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import ProductCardSkeleton from "@/components/skeleton/ProductSkeleton";

const ProductSection = () => {
   const { data: productData, isLoading } = useGetAllProductQuery();

   const filteredProducts = productData?.products

   const skeletonArray = Array(8).fill(null);

   return (
      <section className="py-16">
         <div className="main-container">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
               <h2 className="text-2xl lg:text-[36px] text-title font-medium text-center mb-12">
                  Featured Products
               </h2>
               <Button variant="outline" className="w-full sm:w-auto">
                  See All <ChevronRight />
               </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {isLoading
                  ? skeletonArray.map((_, index) => (
                     <ProductCardSkeleton key={index} />
                  ))
                  : filteredProducts && filteredProducts.length > 0
                     ? filteredProducts.map((product) => (
                        <ProductCard product={product} key={product?._id} />
                     ))
                     : <div className="col-span-full text-center text-gray-500">No products found.</div>
               }
            </div>
         </div>
      </section>
   );
};

export default ProductSection;

