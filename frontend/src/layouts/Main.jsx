import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Toaster } from "@/components/ui/sonner";

import { Outlet, ScrollRestoration } from "react-router-dom";

const Main = () => {

   return (
      <MainLayout>
         <Outlet />
         <ScrollRestoration />
         <Toaster
            position="bottom-right"
            richColors={true}
            duration={2000}
         />
      </MainLayout>
   );
};

export default Main;
