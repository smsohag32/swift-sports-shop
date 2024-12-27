'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ShoppingCart, TrendingUp, Award, Zap, ShoppingBasketIcon as Basketball, TurtleIcon as Tennis, ClubIcon as Soccer } from 'lucide-react'
import heroSports from "@/assets/sports/image.webp"
const Hero = () => {
   return (
      <div className=" min-h-[calc(100vh-100px)]  flex items-center bg-gradient-to-b from-[#f3f3f3] to-transparent  overflow-hidden">


         <div className='flex  relative items-center flex-col lg:flex-row gap-8 w-full main-container'>
            <AnimatedIcon Icon={Basketball} className="bottom-0 right-10" />
            <AnimatedIcon Icon={Tennis} className="top-5 right-0" />
            <AnimatedIcon Icon={Soccer} className=" left-2/3" />
         <motion.div
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="w-full"
            >
               <h1 className="text-4xl lg:text-6xl font-semibold text-gray-800 mb-4">
                  Swift Sports <span className='text-primaryOrange'>Shop</span>
               </h1>
               <p className="text-xl lg:text-2xl mb-8">
                  Gear Up for Greatness with Our Premium Sports Equipment
               </p>
               <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                     Shop Now <ShoppingCart className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent  border border-slate-300  hover:bg-white hover:text-blue-600">
                     View Deals
                  </Button>
               </div>
               <div className="flex gap-8">
                  <FeatureItem icon={TrendingUp} text="Top Brands" />
                  <FeatureItem icon={Award} text="Quality Gear" />
                  <FeatureItem icon={Zap} text="Fast Delivery" />
               </div>
            </motion.div>
            <div className=" flex items-center justify-end relative">
               <div className='w-4/5'>
                  <img src={heroSports} alt="Swift sports shop" />
               </div>
            </div>
         </div>

      </div>
   )
}

const FeatureItem = ({ icon: Icon, text }) => (
   <motion.div
      className="flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
   >
      <Icon className="mr-2 h-6 w-6" />
      <span>{text}</span>
   </motion.div>
)

const AnimatedIcon = ({ Icon, className }) => (
   <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8, rotateY: 0 }}
      animate={{
         opacity: 0.5,
         scale: 1,
         x: [0, 10, 0],
         y: [0, -10, 0],
         rotateY: 360,
      }}
      transition={{
         duration: 4,
         repeat: Infinity,
         repeatType: "reverse",
      }}
      style={{
         transformStyle: 'preserve-3d',
      }}
   >
      <Icon size={48} className="text-darkOrange" />
   </motion.div>
)



export default Hero

