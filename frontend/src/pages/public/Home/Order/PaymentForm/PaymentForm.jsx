import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Banknote } from "lucide-react"

export const PaymentForm = ({ onSubmit }) => {
   const [paymentMethod, setPaymentMethod] = useState("card")

   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const payment = Object.fromEntries(formData)
      payment.method = paymentMethod
      onSubmit({ payment })
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted">
               <RadioGroupItem value="card" id="card" />
               <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Credit/Debit Card
               </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted">
               <RadioGroupItem value="cod" id="cod" />
               <Label htmlFor="cod" className="flex items-center cursor-pointer">
                  <Banknote className="w-5 h-5 mr-2" />
                  Cash on Delivery
               </Label>
            </div>
         </RadioGroup>

         {paymentMethod === "card" && (
            <div className="space-y-4">
               <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <Label htmlFor="expiryDate">Expiry Date</Label>
                     <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div>
                     <Label htmlFor="cvv">CVV</Label>
                     <Input id="cvv" name="cvv" placeholder="123" required />
                  </div>
               </div>
               <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input id="nameOnCard" name="nameOnCard" required />
               </div>
            </div>
         )}

         <div className="flex items-center justify-center">
            <Button type="submit" className="w-full max-w-sm mx-auto">
               {paymentMethod === "card" ? (
                  <>
                     <CreditCard className="w-4 h-4 mr-2" />
                     Pay Securely
                  </>
               ) : (
                  <>
                     <Banknote className="w-4 h-4 mr-2" />
                     Confirm Cash on Delivery
                  </>
               )}
            </Button>
         </div>
      </form>
   )
}


