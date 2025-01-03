import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({ to, label, subItems, isOpen, onToggle, icon, hoverIcon, icon2 }) => {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const isSubActive = (path) => pathname === path;

   const isActive =
      pathname === to ||
      (subItems &&
         subItems?.some((subItem) => {
            return (
               isSubActive(subItem.to) ||
               (subItem.resubItems &&
                  subItem.resubItems.some((resubItem) => isSubActive(resubItem.to)))
            );
         }));

   const [openSubItems, setOpenSubItems] = useState({});
   const [isHovered, setIsHovered] = useState(false);

   const handleClick = () => {
      if (subItems) {
         onToggle();
      } else {
         navigate(to);
      }
   };

   const toggleResubItems = (index) => {
      setOpenSubItems((prev) => ({ ...prev, [index]: !prev[index] }));
   };

   return (
      <>
         <div
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`text-[16px] group whitespace-nowrap transition-all w-full font-normal  py-[10px] ps-[18px] pe-[12px] cursor-pointer
               ${isActive ? "bg-[#DEDEDE]  text-[#202020] " : " text-grayWhite"}`}
         >
            <div className="w-full bg-transparent">
               <div className="flex items-center w-full bg-transparent gap-[16px] h-full">
                  <div className="flex items-center gap-4 flex-1">
                     {icon && <span>{icon}</span>}
                     {label}
                  </div>
                  {subItems && (
                     <span
                        className={`flex items-center transition-all duration-300 transform justify-center ml-auto
                           ${isActive ? "primary-text" : ""} ${!isOpen ? "rotate-180" : ""}`}
                     >
                        <svg
                           width="14"
                           height="10"
                           viewBox="0 0 14 10"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M12 7.5L7 2.5L2 7.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                     </span>
                  )}
               </div>
            </div>
         </div>
         {subItems && (
            <div
               className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
               style={{ transitionTimingFunction: "ease-in-out" }}
            >
               <div className="w-full grid gap-1">
                  {subItems?.map((subItem, index) => {
                     const subItemActive =
                        isSubActive(subItem.to) ||
                        (subItem.resubItems &&
                           subItem.resubItems.some((resubItem) => isSubActive(resubItem.to)));
                     return (
                        <div key={index} className="w-full">
                           <div onClick={() => toggleResubItems(index)}>
                              <NavLink
                                 className={`rounded-[4px] whitespace-nowrap text-[16px] font-normal pl-[34px] flex items-center gap-[16px] py-[10px] pe-[12px] cursor-pointer
                                    ${subItemActive ? "bg-[#E9FFF4] border-b-[#006837] " : ""}
                                    hover:bg-[#E9FFF4] `}

                                 to={subItem.to}
                              >
                                 <span className={subItemActive ? "text-[#006837]" : ""}> {subItem.icon}</span> {subItem.label}
                              </NavLink>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         )}
      </>
   );
};

export default SidebarItem;
