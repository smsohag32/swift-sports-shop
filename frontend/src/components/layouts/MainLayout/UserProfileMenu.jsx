import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { LogOut, User, ShoppingCart, Package, Heart, CreditCard, HelpCircle, Settings } from 'lucide-react'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar/UserAvatar"
import { formatName } from "@/utils/helper"
import useAuth from "@/hooks/useAuth"
import { logoutUser } from "@/redux-store/slice/authSlice"

export function UserProfileMenu() {
   const navigate = useNavigate()
   const { user } = useAuth()
   const dispatch = useDispatch()

   const handleLogout = async () => {
      await dispatch(logoutUser())
      navigate("/", { replace: true })
   }

   const menuItems = [
      { icon: ShoppingCart, label: "My Cart", action: () => navigate("/cart") },
      { icon: Package, label: "My Orders", action: () => navigate("/orders") },
      { icon: Heart, label: "Wishlist", action: () => navigate("/wishlist") },
      { icon: CreditCard, label: "Payment Methods", action: () => navigate("/payment-methods") },
      { icon: User, label: "Profile", action: () => navigate("/profile") },
      { icon: Settings, label: "Account Settings", action: () => navigate("/settings") },
      { icon: HelpCircle, label: "Help & Support", action: () => navigate("/support") },
   ]

   return (
      <DropdownMenu className="outline-none ring-0" >
         <DropdownMenuTrigger asChild className="outline-none">
            <div className="flex cursor-pointer outline-none items-center gap-2 px-2  py-1 rounded-full bg-gray-200">
               <UserAvatar size={"sm"} className="bg-blue-600  text-white" name={formatName(user?.name?.slice(0, 20))} />
               <span className="font-medium text-gray-700">
                  {formatName((user?.name?.slice(0, 20)) || "Guest User")}
               </span>
               <svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0.999999L7 7L13 1" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-64 p-5 outline-none">
            <DropdownMenuLabel className="font-normal">
               <div className="flex flex-col space-y-1">
                  <p className="text-base font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-gray-500">{user?.email}</p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               {menuItems.map((item, index) => (
                  <DropdownMenuItem key={index} className="cursor-pointer" onSelect={item.action}>
                     <item.icon className="w-4 h-4 mr-2" />
                     <span>{item.label}</span>
                  </DropdownMenuItem>
               ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
               <LogOut className="w-4 h-4 mr-2" />
               <span>Log out</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

