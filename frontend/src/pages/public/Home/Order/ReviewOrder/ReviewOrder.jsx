import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"


export const ReviewOrder = ({ formData, onSubmit }) => {
   const { address, payment, order } = formData
   const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
   const shipping = 9.99
   const total = subtotal + shipping

   const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit({})
   }

   return (
      <div className="space-y-8">
         <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <h3 className="text-lg font-semibold">Shipping Address</h3>
               <div className="bg-muted p-4 rounded-lg">
                  <p>{`${address.firstName} ${address.lastName}`}</p>
                  <p>{address.address}</p>
                  <p>{`${address.city}, ${address.postalCode}`}</p>
                  <p>{address.country}</p>
               </div>
            </div>
            <div className="space-y-4">
               <h3 className="text-lg font-semibold">Payment Method</h3>
               <div className="bg-muted p-4 rounded-lg">
                  {payment.method === "card" ? <p>Card ending in {payment.cardNumber.slice(-4)}</p> : <p>Cash on Delivery</p>}
               </div>
            </div>
         </div>
         <div>
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-4">
               {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                     <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md"
                     />
                     <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                     </div>
                     <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
               ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2">
               <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
               </div>
               <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
               </div>
            </div>
         </div>
         <Button onClick={handleSubmit} className="w-full">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Place Order
         </Button>
      </div>
   )
}

