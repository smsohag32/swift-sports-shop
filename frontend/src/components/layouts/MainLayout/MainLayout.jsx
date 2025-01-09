import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
   return (
      <div className="relative  transition-all duration-300">
         <Header />
         <div className="pt-16 min-h-[40vh]">
            {children}
         </div>
         <Footer />
      </div>
   );
};

export default MainLayout;
