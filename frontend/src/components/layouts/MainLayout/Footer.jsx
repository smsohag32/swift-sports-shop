
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, YoutubeIcon as YouTube } from 'lucide-react'
import { Link } from "react-router-dom"
import logo from "@/assets/sports/image2.png"


// footer component
const Footer = () => {
   return (
      <footer className="bg-gray-900 text-whiteBg">
         <div className="main-container py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Company Info */}
               <div>
                  <div className="flex items-center gap-2">
                     <img src={logo} alt="" className="w-20" />
                     <h3 className="text-lg  font-semibold mb-4">Swift Sports Shop</h3>
                  </div>
                  <p className="text-gray-400">Your one-stop shop for all sports gear and equipment.</p>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                     <li><Link to="/about" className="text-gray-400 hover:underline transition-all duration-300 hover:text-whiteBg ">About Us</Link></li>
                     <li><Link to="/products" className="text-gray-400 hover:underline transition-all duration-300 hover:text-whiteBg ">Products</Link></li>
                     <li><Link to="/contact" className="text-gray-400 hover:underline transition-all duration-300 hover:text-whiteBg ">Contact</Link></li>
                     <li><Link to="/faq" className="text-gray-400 hover:underline transition-all duration-300 hover:text-whiteBg ">FAQ</Link></li>
                  </ul>
               </div>

               {/* Newsletter Signup */}
               <div className="">
                  <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                  <p className="text-gray-400 mb-2">Subscribe to our newsletter for the latest updates and offers.</p>
                  <form className="flex flex-col lg:pt-2 sm:flex-row gap-4 lg:gap-2">
                     <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-gray-800 text-whiteBg border-gray-700 focus:border-blue-500"
                     />
                     <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-whiteBg">
                        Subscribe
                     </Button>
                  </form>
               </div>

               {/* Social Links */}
               <div className="flex flex-col items-end">
                  <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                     <a href="#" className="text-gray-400 hover:text-whiteBg transition-colors">
                        <Facebook size={24} />
                        <span className="sr-only">Facebook</span>
                     </a>
                     <a href="#" className="text-gray-400 hover:text-whiteBg transition-colors">
                        <Twitter size={24} />
                        <span className="sr-only">Twitter</span>
                     </a>
                     <a href="#" className="text-gray-400 hover:text-whiteBg transition-colors">
                        <Instagram size={24} />
                        <span className="sr-only">Instagram</span>
                     </a>
                     <a href="#" className="text-gray-400 hover:text-whiteBg transition-colors">
                        <YouTube size={24} />
                        <span className="sr-only">YouTube</span>
                     </a>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
               <p className="text-gray-400 text-sm">&copy; 2024 <span className="">Swift Sports Shop</span>. All rights reserved. & <span>Develop by <a href="https://sohagsheik.vercel.app/" target="_blank" className="font-semibold text-complementaryBlue ps-1">Sohag Sheik</a></span></p>
               <div className="flex space-x-4 mt-4 sm:mt-0">
                  <Link href="/privacy" className="text-gray-400 hover:text-whiteBg text-sm transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="text-gray-400 hover:text-whiteBg text-sm transition-colors">Terms of Service</Link>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer

