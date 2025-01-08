import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, ChevronRight, LogIn, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NavLink, useNavigate } from 'react-router-dom'
import {
   Sheet,
   SheetContent,
   SheetHeader,
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
import { categories } from '@/utils/data'
import { Card } from '@/components/ui/card'
import useAuth from '@/hooks/useAuth'
import { ProfileMenu } from '../DashboardLayout/ProfileMenu'
import { UserProfileMenu } from './UserProfileMenu'
import HeaderCarts from '@/pages/public/Carts/HeaderCarts'
import { logoutUser } from '@/redux-store/slice/authSlice'
import { useDispatch } from 'react-redux'
import { useGetAllCategoryQuery } from '@/redux-store/api/categoryApi'

const Header = () => {
   const { data: categoriesData } = useGetAllCategoryQuery();

   const [isScrolled, setIsScrolled] = useState(false)
   const dispatch = useDispatch()
   const { user } = useAuth()
   const navigate = useNavigate()
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
         subItems: categoriesData && categoriesData?.categories?.length > 0 ? categoriesData?.categories?.map(category => ({ name: category?.name, href: `/products?category=${category.name.toLowerCase()}&id=${category?._id}`, img: category.image })) : ""
      },
      { name: 'About', href: '/about-us' },
      { name: 'Contact', href: '/contact' },
   ]


   const handleLogout = async () => {
      await dispatch(logoutUser())
      navigate("/", { replace: true });
   };


   return (
      <motion.header
         className={`fixed w-full py-3 z-50 flex  items-center transition-all duration-300 ${isScrolled ? 'shadow-sm  bg-whiteBg' : ' bg-[#f3f3f3]'
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
                     <NavigationMenuItem key={item.name} >
                        {item.subItems ? (
                           <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                              <NavLink
                                 to={item.href}
                                 className={({ isActive }) =>
                                    `px-4 py-4 text-base font-medium rounded-md transition-colors ${isActive
                                       ? 'text-darkOrange font-semibold bg-opacity-20 '
                                       : ' hover:text-darkOrange hover:bg-opacity-20'
                                    }`
                                 }
                              >
                                 {item.name}
                              </NavLink>
                           </NavigationMenuTrigger>
                        ) : (
                           <NavLink
                              to={item.href}
                              className={({ isActive }) =>
                                 `px-4 py-4 rounded-md text-base font-medium transition-colors ${isActive
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
                              <ul className="grid w-[600px] max-w-3xl  lg:grid-cols-2 gap-3 p-4 bg-whiteBg shadow-md rounded-md">
                                 {item.subItems.map((subItem) => (
                                    <Card key={subItem.name} className="flex border-opacity-30 border-slate-300 border shadow-none items-center gap-3 px-4 py-3">
                                       {subItem?.img ? <img src={subItem?.img} className='w-10 h-10 object-cover' alt="" /> : <div className='h-10 w-10 bg-slate-200'></div>}
                                       <NavLink
                                          to={subItem.href}
                                          className="block py-2 px-4 text-base font-medium rounded-md transition-colors hover:text-darkOrange hover:bg-opacity-20"
                                       >
                                          {subItem.name}
                                       </NavLink>
                                    </Card>
                                 ))}
                              </ul>
                           </NavigationMenuContent>
                        )}
                     </NavigationMenuItem>
                  ))}
               </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
               <HeaderCarts />

               {user?.role === "user" ? (
                  <ProfileMenu adminView={true} />
               ) : user?.role === "admin" ? (
                  <UserProfileMenu />
               ) : (
                  <Button
                     onClick={() => navigate("/authentication/login")}
                     variant="outline"
                     size="sm"
                     className="hidden md:flex text-base font-medium items-center space-x-2 hover:text-[#FF4500] hover:border-[#FF4500]"
                  >
                     <LogIn className="h-4 w-4" />
                     <span>Sign In</span>
                  </Button>
               )}
               <Sheet>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon" className=" hover:text-[#FF4500] md:hidden">
                        <Menu className="h-5 w-5" />
                     </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-whiteBg">
                     <SheetHeader>
                        <Logo className='w-44' />
                     </SheetHeader>
                     <nav className="mt-8 flex flex-col w-full min-h-[60vh]">
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

                        {user?.role === "admin" ? (
                           <Button className="cursor-pointer absolute bottom-6  left-6   right-6 mt-auto" onClick={handleLogout}>
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>Log out</span>
                           </Button>
                        ) : user?.role === "user" ? (
                           <Button className="cursor-pointer" onClick={handleLogout}>
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>Log out</span>
                           </Button>
                        ) : (
                           <Button
                              onClick={() => navigate("/authentication/login")}
                              variant="outline"
                              size="sm"
                              className="cursor-pointer absolute bottom-6  left-6   right-6 mt-auto"
                           >
                              <LogIn className="h-4 w-4" />
                              <span>Sign In</span>
                           </Button>
                        )}


                     </nav>
                  </SheetContent>
               </Sheet>
            </div>
         </div>
      </motion.header>
   )
}

export default Header
