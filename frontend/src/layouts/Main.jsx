import MainLayout from "@/components/layouts/MainLayout/MainLayout";

import { Outlet, ScrollRestoration } from "react-router-dom";

const Main = () => {

   return (
      <MainLayout>
         <Outlet />
         <ScrollRestoration />
      </MainLayout>
   );
};

export default Main;
