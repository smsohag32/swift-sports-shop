
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@/components/ui/avatar"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"

const avatarVariants = cva(
   "relative inline-block",
   {
      variants: {
         size: {
            sm: "h-8 w-8",
            md: "h-10 w-10",
            lg: "h-12 w-12",
            xl: "h-14 w-14"
         },
         status: {
            online: "after:bg-green-500",
            offline: "after:bg-gray-500",
            busy: "after:bg-red-500",
            away: "after:bg-yellow-500"
         }
      },
      defaultVariants: {
         size: "md",
      }
   }
)



export function UserAvatar({
   className,
   size,
   status,
   photo,
   name,
   fallback,
   showStatus = false,
   ...props
}) {
   const statusClass = showStatus
      ? "after:absolute after:bottom-0 after:right-0 after:h-3 after:w-3 after:rounded-full after:border-2 after:border-white"
      : ""

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               <span className={cn(avatarVariants({ size, status }), statusClass)} {...props}>
                  <Avatar className={cn("h-full w-full transition-transform hover:scale-105 rounded-full overflow-hidden", className)}>
                     <AvatarImage src={photo} alt={name || "User Avatar"} />
                     <AvatarFallback className={cn("rounded-full text-sm", className)}>{fallback || name?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
               </span>
            </TooltipTrigger>
            <TooltipContent>
               <p>{name || "User"}</p>
               {status && <p className="text-xs capitalize">{status}</p>}
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
}
