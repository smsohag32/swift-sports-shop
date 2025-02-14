import { Button } from "@/components/ui/button"
import { CheckCircle, ShoppingBag, Truck } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const OrderSuccess = () => {
   const navigate = useNavigate()
   return (
      <div className="text-center space-y-6">
         <div className="bg-primary text-primary-foreground rounded-full p-4 inline-block">
            <CheckCircle className="w-16 h-16" />
         </div>
         <h2 className="text-3xl font-bold">Thank You for Your Order!</h2>
         <p className="text-xl">Your order has been placed successfully and is being processed.</p>
         <div className="bg-muted p-6 rounded-lg space-y-4">
            <p className="font-semibold">Order number: #12345</p>
            <div className="flex items-center justify-center space-x-2 text-primary">
               <Truck className="w-5 h-5" />
               <span>Estimated delivery: 3-5 business days</span>
            </div>
         </div>
         <Button onClick={() => navigate("/products")} className="w-full max-w-md">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
         </Button>
      </div>
   )
}

