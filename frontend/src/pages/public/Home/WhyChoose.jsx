import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/utils/data";

const WhyChoose = () => {
   return (
      <section className="py-16 bg-gray-50">
         <div className="container mx-auto px-4">
            <h2 className=" text-2xl lg:text-[36px] text-title  font-medium text-center mb-12">Why Choose Swift Sports Shop?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {features.map((feature, index) => (
                  <Card key={index} className="text-center">
                     <CardHeader>
                        <div className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                           <feature.icon className="w-8 h-8 text-blue-600" />
                        </div>
                     </CardHeader>
                     <CardContent>
                        <CardTitle className="mb-2">{feature.title}</CardTitle>
                        <p className="text-gray-600">{feature.description}</p>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
};

export default WhyChoose;
