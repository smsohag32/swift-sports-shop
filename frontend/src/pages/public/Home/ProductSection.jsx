
import ProductCard from "@/components/cards/ProductCard";
import { useGetAllProductQuery } from "@/redux-store/services/productApi";
import ProductCardSkeleton from "@/components/skeleton/ProductSkeleton";
import Empty from "@/components/empty/Empty";

const ProductSection = () => {
   const { data: productData, isLoading } = useGetAllProductQuery();

   const filteredProducts = productData?.products

   const skeletonArray = Array(8).fill(null);

   return (
      <section className="py-16">
         <div className="main-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {isLoading
                  ? skeletonArray.map((_, index) => (
                     <ProductCardSkeleton key={index} />
                  ))
                  : filteredProducts && filteredProducts.length > 0
                     ? filteredProducts.map((product) => (
                        <ProductCard product={product} key={product?._id} />
                     ))
                     : <div className="lg:col-span-3">
                        <Empty message={"No products found."} ></Empty>
                     </div>
               }
            </div>
         </div>
      </section>
   );
};

export default ProductSection;

