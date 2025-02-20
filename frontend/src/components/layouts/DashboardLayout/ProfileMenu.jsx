import {
   Bell,
   HelpCircle,
   LogOut,
   Settings,
   User,

} from "lucide-react"

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { formatName } from "@/utils/helper"
import useAuth from "@/hooks/useAuth"
import { UserAvatar } from "@/components/user-avatar/UserAvatar"
import { logoutUser } from "@/redux-store/slice/authSlice"
import { useDispatch } from "react-redux"

export function ProfileMenu() {
   const navigate = useNavigate()
   const { user } = useAuth()
   const dispatch = useDispatch()
   const handleLogout = async () => {
      await dispatch(logoutUser())
      navigate("/", { replace: true });
   };

   return (
      <DropdownMenu className="w-full">
         <DropdownMenuTrigger asChild className="w-full cursor-pointer px-2 py-2 bg-titleBg rounded-[2px]">
            <div className="flex items-center justify-between gap-2">
               <div className="flex items-center gap-2">
                  <UserAvatar size={"md"} className="bg-darkOrange text-white" name={formatName(user?.name?.slice(0, 13))} />
                  <span className="lg:flex hidden flex-col text-base ">
                     {formatName((user?.name?.slice(0, 13)) || "Sohag Sheik")} ...
                     <span className="text-xs hidden lg:block font-normal  text-[#B4B4B4]">
                        {formatName(user?.role)}
                     </span>
                  </span>


               </div>
               <span className="hidden lg:block ps-3">
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 0.999999L7 7L13 1" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </span>
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56 py-3 px-3" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
               <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                     {user?.email}
                  </p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
               </DropdownMenuItem>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => window.open("https://sohagsheik.vercel.app", "_blank")}
               >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
               </DropdownMenuItem>

            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
               <LogOut className="mr-2 h-4 w-4" />
               <span>Log out</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
