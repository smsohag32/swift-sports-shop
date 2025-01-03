import { useState } from "react";
import SidebarItem from "./SidebarItem";
import {
   ChevronsLeft,
   House,
} from "lucide-react";
import { ProfileMenu } from "./ProfileMenu";
import Logo from "@/assets/svg/Logo";

export default function Sidebar({ toggle, setToggle }) {
   const [openItems, setOpenItems] = useState({});
   const handleToggle = (label) => {
      setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
   };

   const items = [
      {
         to: "/dashboard",
         label: "Dashboard",
         icon: <House />,
      },
   ];

   return (
      <div className="w-[300px] bg-white  pb-6  bg-lightDark  flex flex-col  h-screen overflow-hidden   ">
         <div className="flex items-center mb-6 w-full  py-4 overflow-hidden  justify-center px-4  ">
            <div className="w-full flex items-center  gap-6 justify-start">
               <Logo className="w-32" />
            </div>
            {!toggle && <button onClick={() => setToggle(!toggle)} className="">
               <ChevronsLeft />
            </button>}
         </div>

         <div className="px-4  space-y-6 max-h-[60vh] overflow-auto custom-scrollbar pb-6">
            {items.map((item, index) => (
               <SidebarItem
                  key={index}
                  to={item.to}
                  label={item.label}
                  subItems={item.subItems}
                  isOpen={!!openItems[item.label]}
                  onToggle={() => handleToggle(item.label)}
                  icon2={item.icon2}
                  icon={item.icon}
                  hoverIcon={item.hoverIcon}
               />
            ))}
         </div>

         <div className="mt-auto ps-[18px] pe-[12px] w-full">
            <ProfileMenu />
         </div>
      </div>
   );
}
