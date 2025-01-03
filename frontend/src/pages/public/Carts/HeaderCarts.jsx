import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const HeaderCarts = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [cartItems, setCartItems] = useState([
      { id: 1, name: "Sport Shoes", price: 89.99, quantity: 1, image: "" },
      { id: 2, name: "Running Shorts", price: 29.99, quantity: 2, image: "" },
      { id: 3, name: "Workout T-Shirt", price: 24.99, quantity: 1, image: "" },
   ]);

   const updateQuantity = (id, change) => {
      setCartItems(cartItems.map(item =>
         item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      ).filter(item => item.quantity > 0));
   };

   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
   const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

   return (
      <div>
         <Button
            variant="ghost"
            size="icon"
            className="relative hover:text-[#FF4500]"
            onClick={() => setIsOpen(true)}
         >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
               <span className="absolute -top-1 -right-1 bg-[#FF4500] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
               </span>
            )}
         </Button>
         <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full sm:max-w-lg">
               <SheetHeader>
                  <SheetTitle>My Cart</SheetTitle>
                  <SheetDescription>
                     Review your items before checking out.
                  </SheetDescription>
               </SheetHeader>
               <ScrollArea className="h-[calc(100vh-20.5rem)] mt-4 pr-4">
                  {cartItems.map((item) => (
                     <div key={item.id} className="flex items-center gap-4 py-4">
                        <div>
                           {item?.image ? <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover mr-4" />
                              : <div className="bg-slate-200 h-20 w-20 rounded-md"></div>}
                        </div>
                        <div className="flex-1">
                           <h3 className="font-semibold text-sm">{item.name}</h3>
                           <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                           <div className="flex items-center mt-2">
                              <Button
                                 variant="outline"
                                 size="icon"
                                 className="h-8 w-8"
                                 onClick={() => updateQuantity(item.id, -1)}
                              >
                                 <Minus className="h-4 w-4" />
                              </Button>
                              <span className="mx-2 font-semibold">{item.quantity}</span>
                              <Button
                                 variant="outline"
                                 size="icon"
                                 className="h-8 w-8"
                                 onClick={() => updateQuantity(item.id, 1)}
                              >
                                 <Plus className="h-4 w-4" />
                              </Button>
                           </div>
                        </div>
                        <Button
                           variant="ghost"
                           size="icon"
                           className="h-8 w-8 text-gray-500 hover:text-red-500"
                           onClick={() => updateQuantity(item.id, -item.quantity)}
                        >
                           <X className="h-4 w-4" />
                        </Button>
                     </div>
                  ))}
               </ScrollArea>
               <Separator className="my-4" />
               <div className="space-y-4">
                  <div className="flex justify-between">
                     <span>Subtotal</span>
                     <span className="font-semibold">${totalCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Shipping</span>
                     <span>Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                     <span>Total</span>
                     <span>${totalCost.toFixed(2)}</span>
                  </div>
               </div>
               <SheetFooter className="mt-6">
                  <Button className="w-full bg-[#FF4500] hover:bg-[#FF6347]">
                     Proceed to Checkout
                  </Button>
               </SheetFooter>
            </SheetContent>
         </Sheet>
      </div>
   );
};

export default HeaderCarts;

