import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { featuredProducts } from "@/utils/data";
import { Star } from "lucide-react";

const ProductSection = () => {
   return (
      <section className="py-16">
         <div className="container mx-auto px-4">

            <h2 className=" text-2xl lg:text-[36px] text-title  font-medium text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {featuredProducts.map((product) => (
                  <Card key={product.id} className="border-slate-100">
                     <CardHeader className="p-0">
                        {product?.image ? <img
                           src={product.image}
                           alt={product.name}
                           width={400}
                           height={300}
                           className="w-full h-48 object-cover"
                        /> : <div className="w-full h-48 bg-slate-300"></div>}
                     </CardHeader>
                     <CardContent className="p-4">
                        <CardTitle className="text-2xl font-normal text-title mb-2 ">{product.name}</CardTitle>
                        <p className="text-2xl font-bold text-orange-600">${product.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                           <Star className="w-5 h-5 text-orange-400 fill-current" />
                           <span className="ml-1 text-sm text-orange-700">{product.rating}</span>
                        </div>
                     </CardContent>
                     <CardFooter>
                        <Button className="w-full bg-title hover:bg-des  text-white ">Add to Cart</Button>
                     </CardFooter>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
};

export default ProductSection;
