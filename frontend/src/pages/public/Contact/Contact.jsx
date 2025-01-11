import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import { toast } from 'sonner'


const Contact = () => {

   const handleMessageSend = (event) => {
      event.preventDefault();
      toast.success("Message send successfully.")
   }
   return (
      <div className="min-h-screen bg-gray-100">

         <main className="main-container px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card >
                  <form onSubmit={handleMessageSend} className="flex flex-col h-full w-full">
                     <CardHeader>
                        <CardTitle>Contact Us</CardTitle>
                        <CardDescription>We&apos;d love to hear from you!</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           <Input placeholder="Your Name" />
                           <Input type="email" placeholder="Your Email" />
                           <Input placeholder="Subject" />
                           <Textarea rows={10} placeholder="Your Message" />
                        </div>
                     </CardContent>
                     <CardFooter className="mt-auto">
                        <Button type="submit" className="w-full">Send Message</Button>
                     </CardFooter>
                  </form>
               </Card>

               <div className="space-y-8">
                  <Card>
                     <CardHeader>
                        <CardTitle>Our Information</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                           <MapPin className="text-blue-600" />
                           <span>123 Sports Avenue, Dhaka,  SP 12345</span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Phone className="text-blue-600" />
                           <span>(+880) 15400-42699</span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Mail className="text-blue-600" />
                           <span>sohagsheik32@gmail.com</span>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>Find Us</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="bg-gray-300 h-80 flex items-center justify-center">
                           <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192289.3443123126!2d90.258073766693!3d23.780753027627565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e1!3m2!1sen!2sbd!4v1736448100605!5m2!1sen!2sbd"
                              style={{ border: "0", width: "100%", height: "100%" }}
                              allowFullScreen=""
                              loading="lazy"
                           ></iframe>
                        </div>
                     </CardContent>

                  </Card>


               </div>
            </div>
         </main>
      </div>
   );
};

export default Contact;

