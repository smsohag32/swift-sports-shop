import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const OrderConfirmation = ({ formData, onSubmit }) => {
   const handleSubmit = () => {
      onSubmit({})
   }

   return (
      <div className="text-center space-y-4">
         <CheckCircle className="w-16 h-16 mx-auto text-primary" />
         <h2 className="text-2xl font-semibold">Confirm Your Order</h2>
         <p>Please review your order details one last time before confirming.</p>
         <Button onClick={handleSubmit} className="w-full">
            Confirm Order
         </Button>
      </div>
   )
}

