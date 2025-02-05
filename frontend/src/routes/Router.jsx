
import Dashboard from "@/layouts/Dashboard";
import Main from "@/layouts/Main";
import Login from "@/pages/authentication/Login";
import Registration from "@/pages/authentication/Registration";
import Categories from "@/pages/dashboard/Categories/Categories";
import Overview from "@/pages/dashboard/Overview/Overview";
import AddProduct from "@/pages/dashboard/Products/AddProduct";
import ManageProducts from "@/pages/dashboard/Products/ManageProducts";
import NotFound from "@/pages/NotFound/NotFound";
import Notifications from "@/pages/notifications/Notifications";
import About from "@/pages/public/About/About";
import Contact from "@/pages/public/Contact/Contact";
import HomePage from "@/pages/public/Home/HomePage";
import { Checkout } from "@/pages/public/Home/Order/Checkout/Checkout";
import ProductDetails from "@/pages/public/Products/ProductDetails/ProductDetails";
import Products from "@/pages/public/Products/Products/Products";
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
            path: "/products",
            element: <Products />,
         },
         {
            path: "/checkout",
            element: <Checkout />,
         },
         {
            path: "/products/details/:productId",
            element: <ProductDetails />,
         },
         {
            path: "/contact",
            element: <Contact />,
         },
         {
            path: "/notifications",
            element: <Notifications />,
         },
         {
            path: "/authentication/login",
            element: <Login />,
         },
         {
            path: "/authentication/registration",
            element: <Registration />,
         },
      ],
   },
   {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
         {
            path: "/dashboard",
            element: <Overview />,
         },
         {
            path: "/dashboard/categories",
            element: <Categories />,
         },
         {
            path: "/dashboard/products",
            element: <ManageProducts />,
         },
         {
            path: "/dashboard/products/all",
            element: <ManageProducts />,
         },
         {
            path: "/dashboard/products/new",
            element: <AddProduct />,
         },
         {
            path: "/dashboard/products/inventory",
            element: <ManageProducts />,
         },
      ],
   },
   {
      path: "*",
      element: <NotFound />
   }
]);
