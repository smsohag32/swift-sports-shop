'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ShoppingCart, TrendingUp, Award, Zap } from 'lucide-react'
import heroSports from "@/assets/sports/hero.webp"
import wave from "@/assets/sports/wave.webp"

import { useNavigate } from 'react-router-dom'
const Hero = () => {
   const navigate = useNavigate()
   return (
      <div className=" min-h-[480px] relative  flex items-center bg-gradient-to-b from-[#fffff] to-transparent  overflow-hidden">

         <div className='flex   relative items-center lg:py-10 py-16 flex-col lg:flex-row lg:gap-0 gap-8 w-full main-container'>
            {/* <AnimatedIcon Icon={Basketball} className="bottom-2/4 hidden lg:block right-1/3" /> */}
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="w-full"
            >
               <h1 className="text-4xl lg:text-6xl text-center lg:text-start text-title  font-medium  mb-6">
                  <span className='text-primaryOrange'>S</span>wift Sports <span className='text-primaryOrange'>Shop</span>
               </h1>
               <p className="text-xl font-normal text-des text-center lg:text-start lg:text-xl mb-8">
                  Discover Top-Tier Sports Gear – Shop Now for Exclusive Deals on Premium Equipment and Apparel!
               </p>

               <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button onClick={() => navigate("/products")} size="lg" className="bg-white text-primaryOrange border-orange-200 border  hover:bg-orange-50 ">
                     Shop Now <ShoppingCart className="ml-2 h-5 w-5" />
                  </Button>

               </div>
               <div className="flex gap-8 justify-center  lg:flex-row  lg:justify-start">
                  <FeatureItem icon={TrendingUp} text="Top Brands" />
                  <FeatureItem icon={Award} text="Quality Gear" />
                  <FeatureItem icon={Zap} text="Fast Delivery" />
               </div>
            </motion.div>
            <div className=" flex items-center    w-full  pt-0 justify-center relative">
               <div className='lg:w-full w-full flex items-center justify-center  opacity-80'>
                  <motion.img initial={{ opacity: 1, scale: 0.8, rotateY: 0 }}
                     // animate={{
                     //    opacity: 1,
                     //    scale: 1,
                     //    x: [0, 50, 0],
                     //    y: [0, -50, 0],
                     //    rotateY: 20,
                     // }}
                     // transition={{
                     //    duration: 6,
                     //    repeat: Infinity,
                     //    repeatType: "reverse",
                     // }}
                     style={{
                        // transformStyle: 'preserve-3d',
                     }} src={heroSports} alt="Swift sports shop" />
               </div>
            </div>
         </div>
         {/* <div className=' absolute w-1/5 top-0 right-0 opacity-10'>
            <img src={wave} alt="Sports Shop" className='' />
         </div> */}
      </div>
   )
}

const FeatureItem = ({ icon: Icon, text }) => (
   <motion.div
      className="flex items-center "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
   >
      <Icon className="mr-2 h-6 w-6 text-darkOrange" />
      <span className='text-[10px] lg:text-sm whitespace-nowrap'>{text}</span>
   </motion.div>
)

// const AnimatedIcon = ({ className }) => (
//    <motion.div
//       className={`absolute ${className}`}
//       initial={{ opacity: 0, scale: 0.8, rotateY: 0 }}
//       animate={{
//          opacity: 0.5,
//          scale: 1,
//          x: [0, 10, 0],
//          y: [0, -10, 0],
//          rotateY: 360,
//       }}
//       transition={{
//          duration: 4,
//          repeat: Infinity,
//          repeatType: "reverse",
//       }}
//       style={{
//          transformStyle: 'preserve-3d',
//       }}
//    >
//       <img src={ball} className='w-20' alt="Ball" />
//    </motion.div>
// )



export default Hero

