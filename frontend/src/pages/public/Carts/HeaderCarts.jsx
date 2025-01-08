import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetFooter,
   SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { removeFromCart, updateQuantity } from '@/redux-store/slice/cartSlice';
import { toast } from 'sonner';

const HeaderCarts = () => {
   const [isOpen, setIsOpen] = useState(false);
   const dispatch = useDispatch();
   const { cartItems, totalQuantity, totalCost } = useSelector((state) => state.cart);

   const handleUpdateQuantity = (id, change) => {
      const item = cartItems.find(item => item._id === id);
      if (item) {
         const newQuantity = Math.max(0, item.quantity + change);
         if (newQuantity === 0) {
            dispatch(removeFromCart(id));
            toast.success("Item removed from cart");
         } else {
            dispatch(updateQuantity({ _id: id, quantity: newQuantity }));
            toast.success("Cart updated");
         }
      }
   };

   const handleRemoveItem = (id) => {
      dispatch(removeFromCart(id));
      toast.success("Item removed from cart");
   };

   return (
      <div>
         <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:text-[#FF4500]"
               >
                  <ShoppingCart className="h-5 w-5" />
                  {totalQuantity > 0 && (
                     <span className="absolute -top-1 -right-1 bg-[#FF4500] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {totalQuantity}
                     </span>
                  )}
               </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
               <SheetHeader>
                  <SheetTitle>My Cart</SheetTitle>
                  <SheetDescription>
                     Review your items before checking out.
                  </SheetDescription>
               </SheetHeader>
               <ScrollArea className="h-[calc(100vh-20.5rem)] mt-4 pr-4">
                  {cartItems.map((item) => (
                     <div key={item._id} className="flex items-center gap-4 py-4">
                        <div>
                           {item?.images && item.images.length > 0 ? (
                              <img
                                 src={item.images[0].url}
                                 alt={item.name}
                                 className="h-20 w-20 rounded-md object-cover mr-4"
                              />
                           ) : (
                              <div className="bg-slate-200 h-20 w-20 rounded-md"></div>
                           )}
                        </div>
                        <div className="flex-1">
                           <h3 className="font-semibold text-sm">{item.name}</h3>
                           <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                           <div className="flex items-center mt-2">
                              <Button
                                 variant="outline"
                                 size="icon"
                                 className="h-8 w-8"
                                 onClick={() => handleUpdateQuantity(item._id, -1)}
                              >
                                 <Minus className="h-4 w-4" />
                              </Button>
                              <span className="mx-2 font-semibold">{item.quantity}</span>
                              <Button
                                 variant="outline"
                                 size="icon"
                                 className="h-8 w-8"
                                 onClick={() => handleUpdateQuantity(item._id, 1)}
                              >
                                 <Plus className="h-4 w-4" />
                              </Button>
                           </div>
                        </div>
                        <Button
                           variant="ghost"
                           size="icon"
                           className="h-8 w-8 text-gray-500 hover:text-red-500"
                           onClick={() => handleRemoveItem(item._id)}
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
                  {/* if cart items 0 then button will be disabled */}
                  <Button disabled={cartItems?.length <= 0} className="w-full bg-[#FF4500] hover:bg-[#FF6347]">
                     Proceed to Checkout
                  </Button>
               </SheetFooter>
            </SheetContent>
         </Sheet>
      </div>
   );
};

export default HeaderCarts;

