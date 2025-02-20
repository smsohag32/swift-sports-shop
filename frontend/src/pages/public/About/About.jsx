import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, ShoppingBag, Users, Truck } from 'lucide-react'
import { useNavigate } from "react-router-dom"

const About = () => {
   const navigate = useNavigate()
   return (
      <div className="bg-gradient-to-b bg-[#ffffff] min-h-screen">
         <div className="main-container pb-16 pt-10">
            <section className="text-center mb-16">
               <h2 className="text-[28px] font-medium text-title mb-4">Our Story</h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Founded in 2010, Swift Sports Shop has been on a mission to equip athletes and sports enthusiasts with top-quality gear. Our journey began with a passion for sports and a dream to make premium sporting goods accessible to all.
               </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8 mb-16">
               <Card>
                  <CardContent className="p-6">
                     <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                     <p className="text-gray-600">
                        At Swift Sports Shop, we&apos;re committed to empowering athletes of all levels by providing them with the best sporting equipment and apparel. We believe that everyone deserves access to high-quality gear that enhances their performance and enjoyment of sports.
                     </p>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className="p-6">
                     <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
                     <p className="text-gray-600">
                        We envision a world where sports bring people together, promote health and well-being, and inspire individuals to reach their full potential. Swift Sports Shop aims to be at the forefront of this movement, continuously innovating and expanding our offerings to meet the evolving needs of sports enthusiasts.
                     </p>
                  </CardContent>
               </Card>
            </section>

            <section className="mb-16">
               <h2 className="text-3xl font-semibold text-title text-center mb-8">What Sets Us Apart</h2>
               <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                     <Award className="w-12 h-12 text-orange-600 mb-4" />
                     <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Assurance</h3>
                     <p className="text-gray-600">We carefully curate our product selection, ensuring only the best makes it to our shelves.</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                     <Users className="w-12 h-12 text-orange-600 mb-4" />
                     <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Advice</h3>
                     <p className="text-gray-600">Our team of sports enthusiasts is always ready to provide personalized recommendations.</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                     <Truck className="w-12 h-12 text-orange-600 mb-4" />
                     <h3 className="text-xl font-semibold text-gray-800 mb-2">Swift Delivery</h3>
                     <p className="text-gray-600">We ensure your gear reaches you quickly, so you never miss a beat in your training or game day.</p>
                  </div>
               </div>
            </section>

            <section className="bg-orange-50 rounded-lg p-8 mb-16">
               <h2 className="text-3xl font-bold mb-4 text-center">Our Commitment to Sustainability</h2>
               <p className="text-lg mb-6 text-center">
                  We&apos;re dedicated to reducing our environmental impact. From eco-friendly packaging to partnering with brands that prioritize sustainable manufacturing, we&apos;re taking steps to ensure a greener future for sports.
               </p>
               <div className="flex justify-center">
                  <Badge variant="secondary" className="text-orange-600 bg-white">
                     Eco-Friendly
                  </Badge>
               </div>
            </section>

            <section className="mb-16">
               <h2 className="text-3xl font-semibold text-title text-center mb-8">Meet Our Team</h2>
               <div className="grid md:grid-cols-4 gap-8">
                  {['Sohag Sheik', 'Rakibul Islam', 'Ajom Khan', 'Rakibul Sohag'].map((name, index) => (
                     <Card key={index}>
                        <CardContent className="p-6 text-center">
                           <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                           <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
                           <p className="text-gray-600">Sports Enthusiast</p>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </section>

            <section className="text-center mb-16">
               <h2 className="text-3xl font-semibold text-title mb-4">Join the Swift Sports Community</h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Whether you&apos;re a professional athlete or a weekend warrior, we&apos;re here to support your sporting journey. Come visit us in-store or shop online to experience the Swift Sports difference.
               </p>
               <Button onClick={() => navigate("/products")} size="lg">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Shop Now
               </Button>
            </section>
         </div>
      </div>
   )
}

export default About
