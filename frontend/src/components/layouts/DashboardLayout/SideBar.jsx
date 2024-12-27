import { useState } from "react";
import SidebarItem from "./SidebarItem";
// import logo from "@/assets/icons/logo.png";
import {
   ArrowLeftToLine,
   Bell,

} from "lucide-react";
import { ProfileMenu } from "./ProfileMenu";

export default function Sidebar({ toggle, setToggle }) {
   const [openItems, setOpenItems] = useState({});
   const handleToggle = (label) => {
      setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
   };

   const items = [
      {
         to: "/notifications",
         label: "Notifications",

         icon: <Bell />,
      },
   ];

   return (
      <div className="w-[300px]  pb-6  bg-lightDark  flex flex-col  h-screen overflow-hidden   ">
         <button
            onClick={() => setToggle(!toggle)}
            className="absolute bg-lightOrange   text-nOrange rounded-s-full p-3 text-bold right-0 top-5">
            <ArrowLeftToLine size={16} />
         </button>
         <div className="flex items-center mb-6 w-full flex-col py-2 overflow-hidden  justify-center px-4  ">
            <div className="w-full flex items-center gap-6 justify-start py-2">
               {/* <img src={logo} alt="" className="max-w-[120px]" /> */} logo
            </div>

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
