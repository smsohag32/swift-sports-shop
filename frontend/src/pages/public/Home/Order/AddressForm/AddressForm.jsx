import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const AddressForm = ({ onSubmit }) => {
   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const address = Object.fromEntries(formData)
      onSubmit({ address })
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
            <div>
               <Label htmlFor="firstName">First Name</Label>
               <Input id="firstName" name="firstName" required />
            </div>
            <div>
               <Label htmlFor="lastName">Last Name</Label>
               <Input id="lastName" name="lastName" required />
            </div>
         </div>
         <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" required />
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div>
               <Label htmlFor="city">City</Label>
               <Input id="city" name="city" required />
            </div>
            <div>
               <Label htmlFor="postalCode">Postal Code</Label>
               <Input id="postalCode" name="postalCode" required />
            </div>
         </div>
         <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" required />
         </div>
         <Button type="submit" className="w-full">
            Continue to Payment
         </Button>
      </form>
   )
}

