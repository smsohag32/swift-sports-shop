import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Menu, ChevronRight, LogIn, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NavLink } from 'react-router-dom'
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuList,
   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Logo from '@/assets/svg/Logo'

const Header = () => {
   const [isScrolled, setIsScrolled] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 10)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const navItems = [
      { name: 'Home', href: '/' },
      {
         name: 'Products',
         href: '/products',
         subItems: [
            { name: 'Category 1', href: '/products/category-1' },
            { name: 'Category 2', href: '/products/category-2' },
            { name: 'Category 3', href: '/products/category-3' },
         ],
      },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
   ]

   return (
      <motion.header
         className={`fixed w-full py-3 z-50 flex items-center transition-all duration-300 ${isScrolled ? 'shadow-sm  bg-whiteBg' : ' bg-transparent'
            }`}
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         transition={{ duration: 0.5 }}
      >
         <div className="main-container  flex justify-between items-center">
            <motion.div
               className="text-2xl font-bold"
               whileHover={{ scale: 1.05 }}
            >
               <Logo className="w-40 h-10" />

            </motion.div>

            <NavigationMenu className="hidden md:flex">
               <NavigationMenuList>
                  {navItems.map((item) => (
                     <NavigationMenuItem key={item.name}>
                        {item.subItems ? (
                           <NavigationMenuTrigger className="px-4 py-4 rounded-md transition-colors hover:text-darkOrange hover:bg-opacity-20">
                              {item.name}
                           </NavigationMenuTrigger>
                        ) : (
                           <NavLink
                              to={item.href}
                              className={({ isActive }) =>
                                 `px-4 py-4 rounded-md transition-colors ${isActive
                                    ? 'text-darkOrange font-semibold bg-opacity-20 '
                                    : ' hover:text-darkOrange hover:bg-opacity-20'
                                 }`
                              }
                           >
                              {item.name}
                           </NavLink>
                        )}
                        {item.subItems && (
                           <NavigationMenuContent className="">
                              <ul className="grid w-[200px] gap-3 p-4 bg-whiteBg shadow-md rounded-md">
                                 {item.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                       <NavLink
                                          to={subItem.href}
                                          className="block py-4 px-4 rounded-md transition-colors hover:text-darkOrange hover:bg-opacity-20"
                                       >
                                          {subItem.name}
                                       </NavLink>
                                    </li>
                                 ))}
                              </ul>
                           </NavigationMenuContent>
                        )}
                     </NavigationMenuItem>
                  ))}
               </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
               <Button variant="ghost" size="icon" className=" hover:text-[#FF4500]">
                  <ShoppingCart className="h-5 w-5" />
               </Button>

               <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-2  hover:text-[#FF4500] hover:border-[#FF4500]">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
               </Button>

               <Sheet>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon" className=" hover:text-[#FF4500] md:hidden">
                        <Menu className="h-5 w-5" />
                     </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#0066CC]">
                     <SheetHeader>
                        <SheetTitle className="text-[#FF4500]">Menu</SheetTitle>
                     </SheetHeader>
                     <nav className="mt-8">
                        {navItems.map((item) => (
                           <NavLink
                              key={item.name}
                              to={item.href}
                              className={({ isActive }) =>
                                 `block py-2 px-4 rounded-md transition-colors ${isActive
                                    ? 'bg-[#32CD32] bg-opacity-20 '
                                    : ' hover:bg-[#FF4500] hover:bg-opacity-20'
                                 }`
                              }
                           >
                              <motion.span
                                 className="flex items-center"
                                 whileHover={{ x: 5 }}
                              >
                                 <ChevronRight className="h-4 w-4 mr-2" />
                                 {item.name}
                              </motion.span>
                           </NavLink>
                        ))}
                        <Button variant="outline" size="sm" className="mt-4 w-full flex items-center justify-center space-x-2  hover:text-[#FF4500] hover:border-[#FF4500]">
                           <LogIn className="h-4 w-4" />
                           <span>Sign In</span>
                        </Button>
                     </nav>
                  </SheetContent>
               </Sheet>
            </div>
         </div>
      </motion.header>
   )
}

export default Header
