import { Loader2, Truck } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const Loading = () => {
   return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground">
         <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
               <Truck className="h-8 w-8 animate-bounce text-primary" />
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Loading your sports gear...</h2>
            <p className="text-muted-foreground">Please wait while we prepare your athletic experience</p>
            <div className="w-64 mx-auto">
               <Progress value={66} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">Fetching the latest products and deals</p>
         </div>
      </div>
   )
}

export default Loading

