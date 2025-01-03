
import Dashboard from "@/layouts/Dashboard";
import Main from "@/layouts/Main";
import Login from "@/pages/authentication/Login";
import NotFound from "@/pages/NotFound/NotFound";
import Notifications from "@/pages/notifications/Notifications";
import About from "@/pages/public/About/About";
import HomePage from "@/pages/public/Home/HomePage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <HomePage />,
         },
         {
            path: "/about-us",
            element: <About />,
         },
         {
            path: "/notifications",
            element: <Notifications />,
         },
         {
            path: "/authentication/login",
            element: <Login />,
         },
      ],
   },
   {
      path: "/dashboard/",
      element: <Dashboard />,
      children: [

         {
            path: "/dashboard/notifications",
            element: <Notifications />,
         },
      ],
   },
   {
      path: "*",
      element: <NotFound />
   }
]);
