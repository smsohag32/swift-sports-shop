'use client'

import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/assets/svg/Logo"
import { toast } from 'sonner'
import { loginUser } from '@/redux-store/slice/authSlice'
import { useDispatch } from 'react-redux'
import { Separator } from '@/components/ui/separator'

const Login = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const location = useLocation()
   const from = location?.state?.from?.pathName || "/"
   const { register, handleSubmit, formState: { isValid } } = useForm({
      mode: 'onChange'
   })
   const [isLoading, setIsLoading] = useState(false)

   const handleLogin = async (data) => {
      const { email, password } = data;
      setIsLoading(true);
      try {
         const resultAction = await dispatch(loginUser({ email, password })).unwrap();

         if (resultAction) {
            if (resultAction?.user?.role == "admin") {
               toast.success("Login successful");
               navigate("/dashboard");

            } else if (resultAction?.user?.role === "user") {
               toast.success("Login successful");
               navigate(from, { replace: true });
            } else {
               toast.success("Unknown User");
               navigate("/");
            }
         } else {
            console.log(resultAction)
            toast.error(`${resultAction?.message}` || "Login Failed");
         }
      } catch (error) {
         console.log(error)
         if (error.response && error.response.status === 400) {
            toast.error("Login failed: ", error.response.data || "Invalid login credentials");
         } else {
            console.log(error)
            toast.error(error?.message || "Login failed due to an unexpected error");
         }
      } finally {
         setIsLoading(false);
      }
   };
   useEffect(() => {
      console.log("useEffect running...");

      // Show cookie policy notification
      const cookieToast = toast.info(
         <div>
            <p>
               We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
            <Button variant="outline" size="sm" onClick={() => toast.dismiss(cookieToast)} className="mt-2">
               Got it
            </Button>
         </div>,
         {
            duration: Number.POSITIVE_INFINITY,
            position: "bottom-right",
         },
      );

      // Show default credentials notification
      toast.info(
         <div>
            <p className='text-2xl font-normal mb-2'>Default credentials:</p>
            <div className='p-4'>
               <p>Admin</p>
               <p className='text-base text-gray-800'>Email: sohagsheik32@gmail.com</p>
               <p className='text-base text-gray-800'>Password: 11223344</p>
               <Separator className="my-4" />
               <p>User</p>
               <p className='text-base text-gray-800'>Email: sohag@gmail.com</p>
               <p className='text-base text-gray-800'>Password: 11223344</p>
               <Separator className="my-4" />
            </div>
         </div>,
         {
            duration: 10000,
            position: "bottom-right",
            icon: <Mail />,
            closeButton: true,
         },
      );
   }, []);



   return (
      <div className="min-h-screen  flex items-center justify-center main-container">

         <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
               <div className='flex items-center justify-center -mt-24'>
                  <div className="flex justify-center bg-blue-50 border  shadow-sm rounded-full p-6 w-32  items-center h-32  mb-4">
                     <Logo className=" " width='100' />
                  </div>
               </div>
               <CardTitle className="text-2xl font-medium text-center text-title ">Sign in to Swift Sports</CardTitle>
               <CardDescription className="text-center">
                  Enter your email and password to access your account
               </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
               <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                  <div className="space-y-2">
                     <div className="relative">
                        <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                        <Input
                           id="email"
                           type="email"
                           defaultValue="sohagsheik32@gmail.com"
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
                           defaultValue="11223344"
                           className="pl-10"
                           {...register("password", { required: true })}
                        />
                     </div>
                  </div>
                  {/* <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                           htmlFor="remember"
                           className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                           Remember me
                        </label>
                     </div>
                     <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                     </Link>
                  </div> */}
                  <div className='pt-4'>
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
                  </div>
               </form>
            </CardContent>
            <CardFooter className="flex items-center mb-3 justify-center">
               <p className="text-center text-sm text-gray-600 mt-2">
                  Don&apos;t have an account?{' '}
                  <Link to="/authentication/registration" className="text-blue-600 hover:underline">
                     Sign up
                  </Link>
               </p>
            </CardFooter>
         </Card>

      </div>
   )
}

export default Login

