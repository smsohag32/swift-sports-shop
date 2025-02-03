import { useState, useRef } from "react"
import { ChevronRight, Minus, Plus, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGetProductByIdQuery } from "@/redux-store/api/productApi"
import { Link, useParams } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { formatName } from "@/utils/helper"
import AddCart from "./AddCart"

const ProductDetails = () => {
   const { productId } = useParams()
   const [quantity, setQuantity] = useState(1)
   const [activeImageIndex, setActiveImageIndex] = useState(0)
   const [magnifyStyle, setMagnifyStyle] = useState({})
   const imageRef = useRef(null)
   const { data, isLoading } = useGetProductByIdQuery(productId)

   const product = data?.product

   const handleQuantityChange = (action) => {
      if (action === "increase" && quantity < product?.stock) {
         setQuantity(quantity + 1)
      } else if (action === "decrease" && quantity > 1) {
         setQuantity(quantity - 1)
      }
   }

   const handleMouseMove = (e) => {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = ((e.pageX - left) / width) * 100
      const y = ((e.pageY - top) / height) * 100
      setMagnifyStyle({
         display: "block",
         backgroundImage: `url(${product.images[activeImageIndex].url})`,
         backgroundPosition: `${x}% ${y}%`,
      })
   }

   const handleMouseLeave = () => {
      setMagnifyStyle({ display: "none" })
   }

   if (isLoading) {
      return (
         <div className="main-container py-12">
            <div className="grid md:grid-cols-2 gap-8">
               <Skeleton className="w-full aspect-square rounded-lg" />
               <div className="space-y-6">
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-24 w-full" />
                  <div className="space-y-4">
                     <Skeleton className="h-6 w-1/2" />
                     <Skeleton className="h-6 w-1/3" />
                     <div className="flex items-center space-x-2">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                     </div>
                  </div>
                  <Skeleton className="h-12 w-full" />
               </div>
            </div>
         </div>
      )
   }

   if (!product) {
      return <div className="main-container my-12">Product not found</div>
   }

   return (
      <div className="main-container py-12">
         <div className="grid md:grid-cols-2 gap-14">
            <div className="space-y-4">
               <div className="relative border shadow-sm border-slate-200 w-full aspect-square bg-slate-50 rounded-lg overflow-hidden">
                  <img
                     ref={imageRef}
                     src={product.images[activeImageIndex].url || "/placeholder.svg"}
                     alt={product.images[activeImageIndex].alt}
                     className="w-full h-full cursor-zoom-in object-cover"
                     onMouseMove={handleMouseMove}
                     onMouseLeave={handleMouseLeave}
                  />
                  <div
                     className="absolute inset-0 pointer-events-none bg-no-repeat bg-cover"
                     style={{
                        ...magnifyStyle,
                        backgroundSize: "200%",
                        zIndex: 10,
                     }}
                  />
               </div>
               <div className="flex justify-start space-x-4 px-3 overflow-x-auto py-2">
                  {product.images.map((image, index) => (
                     <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${index === activeImageIndex
                           ? "ring-2 ring-primary shadow-lg"
                           : "opacity-60 hover:opacity-100 hover:shadow-md"
                           }`}
                     >
                        <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                     </button>
                  ))}
               </div>
            </div>
            <div className="space-y-6">
               <nav className="flex" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                     <li className="inline-flex items-center">
                        <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                           Home
                        </Link>
                     </li>
                     <ChevronRight className="w-4 h-4 text-gray-400" />
                     <li>
                        <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
                           Products
                        </Link>
                     </li>
                     <ChevronRight className="w-4 h-4 text-gray-400" />
                     <li>
                        <span className="text-primary font-medium" aria-current="page">
                           {formatName(product?.name)}
                        </span>
                     </li>
                  </ol>
               </nav>
               <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
               <div className="flex items-center space-x-2">
                  <div className="flex">
                     {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400" />
                     ))}
                  </div>
                  <span className="text-sm text-gray-500">(No reviews yet)</span>
               </div>
               <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
               <p className="text-gray-600">{product.description}</p>
               <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <span className="font-semibold">Size:</span>
                     <div className="flex space-x-2">
                        {product.sizes.map((size, index) => (
                           <span key={index} className="px-2 py-1 border rounded-md text-sm">
                              {size}
                           </span>
                        ))}
                     </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <span className="font-semibold">Color:</span>
                     <div className="flex space-x-2">
                        {product.colors.map((color, index) => (
                           <div
                              key={index}
                              className="w-6 h-6 rounded-full border"
                              style={{ backgroundColor: color.toLowerCase() }}
                           ></div>
                        ))}
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center space-x-2">
                        <span className="font-semibold">Quantity:</span>
                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange("decrease")}>
                           <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange("increase")}>
                           <Plus className="h-4 w-4" />
                        </Button>
                     </div>
                     <AddCart product={product} />
                  </div>
                  <div className="flex items-center gap-4">
                     <Button variant="" size="lg" className="w-full">
                        <ShoppingBag />   Order now
                     </Button>
                  </div>
               </div>
               <Card className="p-4 bg-gray-50">
                  <h3 className="font-semibold mb-2 text-lg">Product Details:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                     <li>Brand: {product.brand}</li>
                     <li>Category: {product.category.name}</li>
                     <li>Stock: {product.stock} available</li>
                  </ul>
               </Card>
            </div>
         </div>
      </div>
   )
}

export default ProductDetails

