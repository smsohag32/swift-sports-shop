import { LayoutDashboard, ShoppingBag, Tags, Users, ClipboardList, BarChart2, Settings, HelpCircle, Dot, } from "lucide-react";

export const items = [
   {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
   },
   {
      to: "/dashboard/products",
      label: "Products",
      icon: <ShoppingBag className="h-5 w-5" />,
      subItems: [
         { to: "/dashboard/products/all", icon: <Dot />, label: "All Products" },
         { to: "/dashboard/products/new", icon: <Dot />, label: "Add Product" },
         { to: "/dashboard/products/inventory", icon: <Dot />, label: "Inventory" },
      ]
   },
   {
      to: "/dashboard/categories",
      label: "Categories",
      icon: <Tags className="h-5 w-5" />,
      subItems: [
         { to: "/dashboard/categories/sports", icon: <Dot />, label: "Sportswear" },
         { to: "/dashboard/categories/equipment", icon: <Dot />, label: "Equipment" },
      ]
   },
   {
      to: "/dashboard/customers",
      label: "Customers",
      icon: <Users className="h-5 w-5" />,
   },
   {
      to: "/dashboard/orders",
      label: "Orders",
      icon: <ClipboardList className="h-5 w-5" />,
      subItems: [
         { to: "/dashboard/orders/pending", icon: <Dot />, label: "Pending Orders" },
         { to: "/dashboard/orders/completed", icon: <Dot />, label: "Completed Orders" },
      ]
   },
   {
      to: "/dashboard/analytics",
      label: "Analytics",
      icon: <BarChart2 className="h-5 w-5" />,
   },
   {
      to: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
   },
   {
      to: "/dashboard/help",
      label: "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
   },
];
