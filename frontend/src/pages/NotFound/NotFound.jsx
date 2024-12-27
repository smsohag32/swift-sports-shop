
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
   return (
      <div className="min-h-screen bg-[#f4f4f4]  flex flex-col items-center justify-center text-center px-4">
         <div className="space-y-8 max-w-md">
            <svg
               className="w-48 h-48 mx-auto text-des opacity-80"
               fill="none"

               viewBox="0 0 24 24"
               stroke="currentColor"
               strokeWidth="1"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
               />
            </svg>

            <div className="space-y-4">
               <h1 className="text-4xl font-bold tracking-tight text-title">
                  <span className="text-primaryOrange">404</span> - Page Not Found
               </h1>
               <p className="text-xl text-muted-foreground">
                  Oops! It looks like you&apos;ve ventured into uncharted territory.
               </p>
               <p className="text-muted-foreground">
                  The page you&apos;re looking for might have been moved, deleted, or possibly never existed.
               </p>
            </div>


            <Button onClick={() => window.history.back()} asChild size="lg" className="mt-8 cursor-pointer bg-primaryOrange">
               <p>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
               </p>
            </Button>
         </div>
      </div>
   )
}

