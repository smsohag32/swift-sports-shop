import MainLayout from "@/components/layouts/MainLayout/MainLayout";

import { Outlet } from "react-router-dom";

const Main = () => {

   return (
      <MainLayout>
         <Outlet />
      </MainLayout>
   );
};

export default Main;
