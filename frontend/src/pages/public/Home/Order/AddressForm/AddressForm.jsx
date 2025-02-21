import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/Form/FormInput"

const addressSchema = z.object({
   firstName: z.string().min(1, "First name is required"),
   lastName: z.string().min(1, "Last name is required"),
   address: z.string().min(1, "Address is required"),
   city: z.string().min(1, "City is required"),
   postalCode: z.string().min(1, "Postal code is required"),
   country: z.string().min(1, "Country is required"),
})

export const AddressForm = ({ onSubmit }) => {
   const methods = useForm({
      resolver: zodResolver(addressSchema),
      mode: "onChange",
   })

   const handleSubmit = (data) => {
      onSubmit({ address: data })
   }

   return (
      <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <FormInput label="First Name" name="firstName" />
               <FormInput label="Last Name" name="lastName" />
            </div>
            <FormInput label="Address" name="address" />
            <div className="grid grid-cols-2 gap-4">
               <FormInput label="City" name="city" />
               <FormInput label="Postal Code" name="postalCode" />
            </div>
            <FormInput label="Country" name="country" />
            <div className="flex items-center justify-center">
               <Button type="submit" className="w-full max-w-sm mx-auto">
                  Continue to Payment
               </Button>
            </div>
         </form>
      </FormProvider>
   )
}

