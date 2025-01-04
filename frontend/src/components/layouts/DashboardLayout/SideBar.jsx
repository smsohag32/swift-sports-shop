'use client'

import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { ChevronsLeft, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/svg/Logo";
import { items } from "./LinkItems";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar({ toggle, setToggle }) {
   const [openItems, setOpenItems] = useState({});
   const [isOpen, setIsOpen] = useState(false);

   const handleToggle = (label) => {
      setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
   };



   const SidebarContent = () => (
      <div className="flex  scroll-smooth flex-col h-full bg-white dark:bg-gray-800">
         <div className="flex items-center justify-between py-4 ps-4">
            <Logo className="w-32" />
            <Button
               variant="ghost"
               onClick={() => setToggle(!toggle)}
               className="hidden !px-2 p-0 lg:block"
            >
               <ChevronsLeft className="h-6 w-6" />
            </Button>
         </div>
         <ScrollArea className="flex-1 px-4 pb-8 scroll-smooth ">
            <div className="!grid  !gap-2">
               {items.map((item, index) => (
                  <SidebarItem
                     key={index}
                     to={item.to}
                     label={item.label}
                     isOpen={!!openItems[item.label]}
                     onToggle={() => handleToggle(item.label)}
                     icon={item.icon}
                     subItems={item.subItems}
                  />
               ))}
            </div>
         </ScrollArea>
      </div>
   );

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth >= 1024) {
            setIsOpen(false);
            setToggle(false);
         }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, [setToggle]);

   return (
      <>
         <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden fixed left-4 top-4 z-40"
               >
                  <Menu className="h-6 w-6" />
               </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px]">
               <SidebarContent />
            </SheetContent>
         </Sheet>

         <div className="hidden lg:block top-0 left-0 w-[300px] h-screen">
            <SidebarContent />
         </div>
      </>
   );
}
