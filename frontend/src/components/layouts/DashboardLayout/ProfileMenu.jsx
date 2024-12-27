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
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "../../user-avatar/UserAvatar"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthProvider"
import { Button } from "../../ui/button"

export function ProfileMenu() {
   const navigate = useNavigate()
   const { user } = useContext(AuthContext)
   const handleLogout = () => {
      navigate("/", { replace: true });
   };

   return (
      <DropdownMenu className="w-full">
         <DropdownMenuTrigger asChild className="w-full cursor-pointer px-2 py-2  rounded-[2px]">
            <div className="flex items-center justify-between gap-2">
               <div className="flex items-center gap-2">
                  <UserAvatar className="!bg-white" name={"Sohag"} photo={"https://lh3.googleusercontent.com/a/ACg8ocLCcTZmLK8f8H-LaA8AyDKo3ULmG0sANVr_qyMG6a8dLX6FijdI=s360-c-no"} />
                  <span className="flex flex-col ">
                     {user?.firstName || "Nur Tesla"}
                     <span className="text-xs font-normal text-[#B4B4B4]">System Admin</span>
                  </span>

               </div>
               <span>
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 0.999999L7 7L13 1" stroke="#8B8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

               </span>
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" >
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem className="gap-2 cursor-pointer">
                  <User />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
               </DropdownMenuItem>
               <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Settings />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>

               <Button variant="outline"

                  onClick={handleLogout}
                  className=" w-full gap-4 h-full">
                  <LogOut size={16} /> Log out
               </Button>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
