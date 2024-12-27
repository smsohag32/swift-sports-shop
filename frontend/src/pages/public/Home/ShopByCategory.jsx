import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from '@/utils/data';

const ShopByCategory = () => {
   return (
      <section className="py-16">
         <div className="main-container">
            <h2 className=" text-2xl lg:text-[36px] text-title  font-medium text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
               {categories.map((category, index) => (
                  <Card key={index} className="overflow-hidden">
                     <CardHeader className="p-0">
                        <img
                           src={category.image}
                           alt={category.name}
                           width={300}
                           height={300}
                           className="w-full h-40 object-cover"
                        />
                     </CardHeader>
                     <CardContent className="p-4 text-center">
                        <CardTitle className="text-lg hover:underline hover:text-complementaryBlue transition-all duration-300 cursor-pointer">{category.name}</CardTitle>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
};

export default ShopByCategory;
