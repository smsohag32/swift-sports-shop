import {
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
import { Button } from "@/components/ui/button"
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
                  <UserAvatar className="bg-green-700 text-white" name={formatName(user?.name?.slice(0, 13))} />
                  <span className="flex flex-col ">
                     {formatName((user?.name?.slice(0, 13)) || "Sohag Sheik")} ...
                     <span className="text-xs font-normal mt-0.5 text-[#B4B4B4]">
                        {formatName(user?.role)}
                     </span>
                  </span>


               </div>
               <span>
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 0.999999L7 7L13 1" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

               </span>
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-56" >
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem className="gap-2 cursor-pointer">
                  <User />
                  <span>Profile</span>
               </DropdownMenuItem>
               <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Settings />
                  <span>Settings</span>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
               <Button
                  variant="ghost"
                  size="sm"

                  className="flex !px-0 !py-0 items-center justify-start group gap-2 w-full">
                  <span><LogOut className="" size={16} /></span>
                  <span>Logout</span>
               </Button>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
