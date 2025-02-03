import { Button } from '@/components/ui/button';
import { addToCart } from '@/redux-store/slice/cartSlice';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AddCart = ({ product }) => {
   const dispatch = useDispatch();
   const cartItems = useSelector((state) => state.cart.cartItems);
   const navigate = useNavigate()
   const isInCart = cartItems.some((item) => item._id === product._id);

   const handleAddToCart = async () => {
      try {
         if (!isInCart) {
            await dispatch(addToCart(product));
            toast.success("Added to cart!");
         }
      } catch {
         toast.error("Failed to add cart.");
      }
   };

   return (
      <>
         <Button disabled={isInCart} onClick={handleAddToCart} className="w-full group bg-black text-[#ffff] disabled:cursor-not-allowed" variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
         </Button>
      </>
   );
};

export default AddCart;
