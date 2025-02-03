import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { addToCart } from '@/redux-store/slice/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
         <div className="relative overflow-hidden">
            {product?.images && product.images.length > 0 ? (
               <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
               />
            ) : (
               <div className="w-full h-64 bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-400">No image available</span>
               </div>
            )}
            <div className="absolute top-2 left-2 flex gap-2">
               {product.stock <= 5 && (
                  <Badge variant="destructive">Low Stock</Badge>
               )}
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <Button onClick={() => navigate(`/products/details/${product?._id}`)} size="icon" variant="secondary">
                  <Eye className="h-4 w-4" />
               </Button>
               <Button size="icon" variant="secondary">
                  <Heart className="h-4 w-4" />
               </Button>
            </div>
         </div>
         <CardContent className="p-4">
            <Link to={`/products/details/${product?._id}`} className="text-lg font-semibold text-gray-800  mb-2 truncate">{product.name}</Link>
            <p className="text-sm text-gray-500 mb-2 truncate">{product.brand}</p>
            <div className="flex justify-between items-center">
               <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
               <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">
                     {product.rating || '4.5'}
                  </span>
               </div>
            </div>
         </CardContent>
         <CardFooter className="p-4 pt-0">
            <Button disabled={isInCart} onClick={handleAddToCart} className="w-full group disabled:cursor-not-allowed" variant="outline">
               <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
               {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </Button>
         </CardFooter>
      </Card>
   );
};

export default ProductCard;

