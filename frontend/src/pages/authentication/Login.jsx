'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/assets/svg/Logo"
import loginImage from "@/assets/login/login.webp"

const Login = () => {
   const { register, handleSubmit, formState: { isValid } } = useForm({
      mode: 'onChange'
   })
   const [isLoading, setIsLoading] = useState(false)

   const handleLogin = async (data) => {
      setIsLoading(true)
      // Implement your login logic here
      console.log('Login data:', data)
      // Simulate API call8
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsLoading(false)
   }

   return (
      <div className="min-h-screen  flex items-center justify-center main-container">
         <div className="hidden lg:block lg:w-1/2 ">
            <img
               className="object-cover w-full h-full rounded-2xl "
               src={loginImage}
               alt="Swift Sports Shop"
            />
         </div>
         <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
               <div className="flex justify-center mb-4">
                  <Logo className="w-auto h-12" />
               </div>
               <CardTitle className="text-2xl font-bold text-center">Sign in to Swift Sports</CardTitle>
               <CardDescription className="text-center">
                  Enter your email and password to access your account
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                  <div className="space-y-2">
                     <div className="relative">
                        <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                        <Input
                           id="email"
                           type="email"
                           placeholder="Email address"
                           className="pl-10"
                           {...register("email", { required: true })}
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="relative">
                        <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                        <Input
                           id="password"
                           type="password"
                           placeholder="Password"
                           className="pl-10"
                           {...register("password", { required: true })}
                        />
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                           htmlFor="remember"
                           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                           Remember me
                        </label>
                     </div>
                     <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                     </Link>
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
                           Signing in...
                        </>
                     ) : (
                        <>
                           Sign in
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                     )}
                  </Button>
               </form>
            </CardContent>
            <CardFooter>
               <p className="text-center text-sm text-gray-600 mt-2">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                     Sign up
                  </Link>
               </p>
            </CardFooter>
         </Card>

      </div>
   )
}

export default Login

