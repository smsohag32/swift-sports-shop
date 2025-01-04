import Hero from "./Hero";
import ProductSection from "./ProductSection";
import ShopByCategory from "./ShopByCategory";
import WhyChoose from "./WhyChoose";

const HomePage = () => {
   return (
      <div className="relative overflow-hidden" >
         <Hero />
         <ProductSection />
         <WhyChoose />
         <ShopByCategory />
      </div>
   );
};

export default HomePage;
