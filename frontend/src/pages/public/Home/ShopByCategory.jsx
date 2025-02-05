import Empty from '@/components/empty/Empty';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useGetAllCategoryQuery } from '@/redux-store/services/categoryApi';
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";

const ShopByCategory = () => {
   const { data: categoriesData, isLoading } = useGetAllCategoryQuery();

   return (
      <section className="py-16">
         <div className="main-container">
            {/* <h2 className="text-2xl lg:text-[36px] text-title font-medium text-center mb-12">
               Shop by Category
            </h2> */}

            {isLoading ? (
               <LoadingSkeleton />
            ) : categoriesData && categoriesData?.categories?.length > 0 ? (
               <Carousel className="w-full px-6 relative">
                  <CarouselContent className="mx-2">
                     {categoriesData?.categories?.map((category, index) => (
                        <CarouselItem key={index} className="p-4 w-full md:basis-1/2 lg:basis-1/5">
                           <Card className="overflow-hidden w-full">
                              <CardHeader className="p-0">
                                 {category?.image ? (
                                    <img
                                       src={category.image}
                                       alt={category.name}
                                       width={300}
                                       height={300}
                                       className="w-full h-40 object-cover"
                                    />
                                 ) : (
                                    <div className="w-full h-40 bg-slate-200"></div>
                                 )}
                              </CardHeader>
                              <CardContent className="p-4 text-center">
                                 <Link
                                    to={`/products?category=${category?.name?.toLowerCase()}&id=${category?._id}`}
                                    className="text-lg hover:underline hover:text-complementaryBlue transition-all duration-300 cursor-pointer"
                                 >
                                    {category.name}
                                 </Link>
                              </CardContent>
                           </Card>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer">
                     ‹
                  </CarouselPrevious>
                  <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer">
                     ›
                  </CarouselNext>
               </Carousel>
            ) : (
               <Empty message="No data found" />
            )}
         </div>
      </section>
   );
};

const LoadingSkeleton = () => {
   return (
      <Carousel className="w-full px-6 relative">
         <CarouselContent className="mx-2">
            {[...Array(5)].map((_, index) => (
               <CarouselItem key={index} className="p-4 w-full md:basis-1/2 lg:basis-1/5">
                  <Card className="overflow-hidden w-full">
                     <CardHeader className="p-0">
                        <Skeleton className="w-full h-40" />
                     </CardHeader>
                     <CardContent className="p-4 text-center">
                        <Skeleton className="h-6 w-3/4 mx-auto" />
                     </CardContent>
                  </Card>
               </CarouselItem>
            ))}
         </CarouselContent>
         <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer">
            ‹
         </CarouselPrevious>
         <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 cursor-pointer">
            ›
         </CarouselNext>
      </Carousel>
   );
};

export default ShopByCategory;

