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
} from "@/components/ui/sheet";
import {
   Drawer,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { removeFromCart, updateQuantity } from '@/redux-store/slice/cartSlice';
import { toast } from 'sonner';
import { useMediaQuery } from "@/hooks/use-media-query";
import { useNavigate } from "react-router-dom";

const HeaderCarts = () => {
   const [isOpen, setIsOpen] = useState(false);
   const isDesktop = useMediaQuery("(min-width: 768px)");
   const navigate = useNavigate()
   const dispatch = useDispatch();
   const { cartItems, totalQuantity, totalCost } = useSelector((state) => state.cart);

   const handleUpdateQuantity = (id, change) => {
      const item = cartItems.find(item => item._id === id);
      if (item) {
         const newQuantity = Math.max(0, item.quantity + change);
         newQuantity === 0
            ? dispatch(removeFromCart(id)) && toast.success("Item removed from cart")
            : dispatch(updateQuantity({ _id: id, quantity: newQuantity })) && toast.success("Cart updated");
      }
   };

   // handle checkout
   const handleCheckout = () => {
      navigate("/checkout");
      setIsOpen(false);
   }

   const handleRemoveItem = (id) => {
      dispatch(removeFromCart(id));
      toast.success("Item removed from cart");
   };

   const renderCartItems = () => (
      cartItems.map((item) => (
         <div key={item._id} className="flex items-center gap-4 py-4">
            <div>
               {item?.images?.length > 0 ? (
                  <img src={item.images[0].url} alt={item.name} className="h-20 w-20 rounded-md object-cover mr-4" />
               ) : (
                  <div className="bg-slate-200 h-20 w-20 rounded-md"></div>
               )}
            </div>
            <div className="flex-1">
               <h3 className="font-semibold text-sm">{item.name}</h3>
               <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
               <div className="flex items-center mt-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(item._id, -1)}>
                     <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2 font-semibold">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleUpdateQuantity(item._id, 1)}>
                     <Plus className="h-4 w-4" />
                  </Button>
               </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500" onClick={() => handleRemoveItem(item._id)}>
               <X className="h-4 w-4" />
            </Button>
         </div>
      ))
   );

   const renderCartContent = () => (
      <>
         <ScrollArea className=" min-h-[20vh] lg:h-[calc(100vh-20.5rem)] mt-4 pr-4">
            {renderCartItems()}
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
      </>
   );

   return (
      <div>
         <Button onClick={() => setIsOpen(!isOpen)} variant="secondary" size="icon" className="relative hover:text-[#FF4500]">
            <ShoppingCart className="h-5 w-5" />
            {totalQuantity > 0 && (
               <span className="absolute -top-1 -right-1 bg-[#FF4500] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalQuantity}
               </span>
            )}
         </Button>
         {isDesktop ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>

               <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                     <SheetTitle>My Cart</SheetTitle>
                     <SheetDescription>Review your items before checking out.</SheetDescription>
                  </SheetHeader>
                  {renderCartContent()}
                  <SheetFooter className="mt-6">
                     <Button disabled={cartItems.length === 0} onClick={handleCheckout} className="w-full bg-[#FF4500] hover:bg-[#FF6347]">
                        Proceed to Checkout
                     </Button>
                  </SheetFooter>
               </SheetContent>
            </Sheet>
         ) : (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
               <DrawerContent className="w-full ">
                  <div className="w-full">
                     <DrawerHeader className="border-b">
                        <DrawerTitle className="pt-4 px-2 pb-4">My Cart</DrawerTitle>
                        <DrawerDescription>
                           Review your items before checking out.
                        </DrawerDescription>
                     </DrawerHeader>
                     <div className=" w-full px-6 pt-6 pb- max-h-[70vh] overflow-y-auto">
                        {renderCartContent()}
                        <DrawerFooter className="mt-6">
                           <Button onClick={handleCheckout} disabled={cartItems.length === 0} className="w-full bg-[#FF4500] hover:bg-[#FF6347]">
                              Proceed to Checkout
                           </Button>
                        </DrawerFooter>
                     </div>
                  </div>
               </DrawerContent>
            </Drawer>
         )}
      </div>
   );
};

export default HeaderCarts;
