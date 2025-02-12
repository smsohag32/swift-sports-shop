import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'
import Logo from '@/assets/svg/Logo'
import { useRegisterUserMutation } from '@/redux-store/services/userApi'

const RegistrationPage = () => {
   const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
      mode: 'onChange'
   })
   const [registerUser, { isLoading }] = useRegisterUserMutation()

   const onSubmit = async (data) => {

      try {
         const newUser = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            password: data.password,
            role: "user"
         }
         const res = await registerUser(newUser).unwrap()
         toast.success("Registration successful!")

      } catch (error) {
         toast.error("Registration failed: " + error.message)
      }
   }

   return (
      <div className="min-h-screen bg-[f3f3f3] flex items-center justify-center p-4">
         <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
               <div className='flex items-center justify-center '> <Logo className='32' /></div>
               <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
               <CardDescription className="text-center">
                  Enter your details below to create your account and get started
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                     <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                           id="name"
                           placeholder="Full Name"
                           className="pl-10"
                           {...register("name", { required: "Name is required" })}
                        />
                     </div>
                     {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                     <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                           id="email"
                           type="email"
                           placeholder="Email Address"
                           className="pl-10"
                           {...register("email", {
                              required: "Email is required",
                              pattern: {
                                 value: /\S+@\S+\.\S+/,
                                 message: "Invalid email address"
                              }
                           })}
                        />
                     </div>
                     {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                     <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                           id="phone"
                           type="tel"
                           placeholder="Phone Number"
                           className="pl-10"
                           maxLength={20}
                           {...register("phone", {
                              required: "Phone number is required",
                              pattern: {
                                 value: /^(\+?[\d\s\-()]{7,})$/,
                                 message: "Please enter a valid phone number",
                              },
                              validate: (value) => {
                                 const digitsOnly = value.replace(/\D/g, "")
                                 return (digitsOnly.length >= 7 && digitsOnly.length <= 15) || "Phone number must be between 7 and 15 digits"
                              },
                           })}
                        />
                     </div>
                     {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                     <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                           id="password"
                           type="password"
                           placeholder="Password"
                           className="pl-10"
                           {...register("password", {
                              required: "Password is required",
                              minLength: {
                                 value: 8,
                                 message: "Password must be at least 8 characters"
                              }
                           })}
                        />
                     </div>
                     {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
                     <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                           id="confirmPassword"
                           type="password"
                           placeholder="Confirm Password"
                           className="pl-10"
                           {...register("confirmPassword", {
                              required: "Please confirm your password",
                              validate: (val) => {
                                 if (watch('password') != val) {
                                    return "Your passwords do not match";
                                 }
                              }
                           })}
                        />
                     </div>
                     {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                  </div>
                  <Button
                     type="submit"
                     className="w-full"
                     disabled={!isValid || isLoading}
                  >
                     {isLoading ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Registering...
                        </>
                     ) : (
                        <>
                           Register
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                     )}
                  </Button>
               </form>
            </CardContent>
            <CardFooter>
               <p className="text-center text-sm text-gray-600 mt-2 w-full">
                  Already have an account?{' '}
                  <Link to="/authentication/login" className="text-blue-600 hover:underline">
                     Sign in
                  </Link>
               </p>
            </CardFooter>
         </Card>
      </div>
   )
}

export default RegistrationPage

