import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
   return (
      <Card className="overflow-hidden">
         <Skeleton className="w-full h-48" />
         <CardContent className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <div className="flex justify-between items-center">
               <Skeleton className="h-6 w-1/3" />
               <Skeleton className="h-4 w-1/4" />
            </div>
         </CardContent>
         <CardFooter className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
         </CardFooter>
      </Card>
   );
};

export default ProductCardSkeleton;
