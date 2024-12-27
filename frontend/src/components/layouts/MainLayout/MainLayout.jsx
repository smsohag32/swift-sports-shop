import Header from "./Header";

const MainLayout = ({ children }) => {
   return (
      <div>
         <Header />
         <div className="pt-16 min-h-[40vh]">
            {children}
         </div>
      </div>
   );
};

export default MainLayout;
