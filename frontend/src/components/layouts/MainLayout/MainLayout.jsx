import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
   return (
      <div>
         <Header />
         <div className="pt-16 min-h-[40vh]">
            {children}
         </div>
         <Footer />
      </div>
   );
};

export default MainLayout;
