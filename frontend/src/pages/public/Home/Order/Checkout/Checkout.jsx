import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin, CreditCard, ShoppingCart, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { AddressForm } from "../AddressForm/AddressForm"
import { PaymentForm } from "../PaymentForm/PaymentForm"
import { ReviewOrder } from "../ReviewOrder/ReviewOrder"
import { OrderConfirmation } from "../OrderConfirmation/OrderConfirmation"
import { OrderSuccess } from "../OrderSuccess/OrderSuccess"

const steps = [
   { title: "Address", icon: MapPin },
   { title: "Payment", icon: CreditCard },
   { title: "Review", icon: ShoppingCart },
   { title: "Confirm", icon: CheckCircle },
]

export const Checkout = () => {
   const [currentStep, setCurrentStep] = useState(0)
   const [formData, setFormData] = useState({
      address: {},
      payment: {},
      order: {
         items: [
            { id: 1, name: "Smartphone X", price: 599.99, quantity: 1, image: "/placeholder.svg" },
            { id: 2, name: "Wireless Earbuds", price: 79.99, quantity: 2, image: "/placeholder.svg" },
         ],
      },
   })

   const handleNext = () => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
   }

   const handleBack = () => {
      setCurrentStep((prev) => Math.max(prev - 1, 0))
   }

   const handleSubmit = (stepData) => {
      setFormData((prev) => ({ ...prev, ...stepData }))
      handleNext()
   }

   const renderStep = () => {
      switch (currentStep) {
         case 0:
            return <AddressForm onSubmit={handleSubmit} />
         case 1:
            return <PaymentForm onSubmit={handleSubmit} />
         case 2:
            return <ReviewOrder formData={formData} onSubmit={handleSubmit} />
         case 3:
            return <OrderConfirmation formData={formData} onSubmit={handleSubmit} />
         case 4:
            return <OrderSuccess />
         default:
            return null
      }
   }

   return (
      <div className="min-h-screen  py-12">
         <div className="main-container">
            <Card className="w-full mx-auto shadow-sm">
               <CardHeader className="bg-slate-100 text-gray-800">
                  <CardTitle className="text-2xl font-bold">
                     {currentStep === 0
                        ? "Address"
                        : currentStep === 1
                           ? "Confirm Order"
                           : currentStep === 2
                              ? "Review Order"
                              : currentStep === 3
                                 ? "Order Confirmation"
                                 : currentStep === 4
                                    ? "Order Success"
                                    : "Order Step"}
                  </CardTitle>

               </CardHeader>
               <CardContent className="p-6">
                  <div className="mb-8">
                     <Progress value={(currentStep / (steps.length - 1)) * 100} className="w-full h-2" />
                  </div>
                  <div className="flex justify-between mb-8">
                     {steps.map((step, index) => (
                        <div
                           key={step.title}
                           className={`flex flex-col items-center ${index <= currentStep ? "text-primary" : "text-muted-foreground"
                              }`}
                        >
                           <div
                              className={`rounded-full p-2 ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                           >
                              <step.icon className="w-6 h-6" />
                           </div>
                           <span className="text-sm font-medium mt-2">{step.title}</span>
                        </div>
                     ))}
                  </div>
                  {renderStep()}
                  <div className="flex justify-between mt-8">
                     {currentStep > 0 && currentStep < steps.length && (
                        <Button variant="outline" onClick={handleBack}>
                           <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                     )}
                     {/* {currentStep < steps.length - 1 && (
                        <Button className="ml-auto" onClick={handleNext}>
                           Next <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                     )} */}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}

