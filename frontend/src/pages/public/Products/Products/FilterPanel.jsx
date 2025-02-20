import { useState } from "react";
const brands = ["Nike", "Adidas", "Under Armour", "Puma", "Reebok"]
const colors = ["Red", "Blue", "Black", "White", "Green"]
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Star, ChevronDown, ChevronUp } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetAllCategoryQuery } from "@/redux-store/services/categoryApi";


const FilterPanel = ({ selectedCategories, setSelectedCategories }) => {
   const { data: categoryData } = useGetAllCategoryQuery()
   const [priceRange, setPriceRange] = useState([0, 200])
   const [selectedBrands, setSelectedBrands] = useState([])
   const [selectedColors, setSelectedColors] = useState([])
   const [minRating, setMinRating] = useState(0)
   const [isFilterOpen, setIsFilterOpen] = useState(true)
   const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

   const handleBrandChange = (brand) => {
      setSelectedBrands(prev =>
         prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
      )
   }
   const handleCategoryChange = (category) => {
      setSelectedCategories(prev =>
         prev.includes(category) ? prev.filter(b => b !== category) : [...prev, category]
      )
   }

   const handleColorChange = (color) => {
      setSelectedColors(prev =>
         prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
      )
   }

   return (
      <div className="w-full lg:w-1/4">
         <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-semibold">Filters</h2>
               <Button variant="ghost" size="sm" onClick={toggleFilter}>
                  {isFilterOpen ? <ChevronUp /> : <ChevronDown />}
               </Button>
            </div>
            {isFilterOpen && (
               <>
                  {/* <div className="mb-6">
                     <h3 className="font-semibold mb-2">Filter by Price Range</h3>
                     <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={2500}
                        step={10}
                        className="mb-2"
                     />
                     <div className="flex justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                     </div>
                  </div> */}
                  <div className="mb-6">
                     <h3 className="font-semibold mb-2">Filter by category</h3>
                     <ScrollArea className="h-[200px] ">
                        <div className="grid gap-1">
                           {categoryData?.categories?.map(category => (
                              <div key={category} className="flex items-center space-x-2 mb-2">
                                 <Checkbox
                                    id={`category-${category?._id}`}
                                    checked={selectedCategories.includes(category?._id)}
                                    onCheckedChange={() => handleCategoryChange(category?._id)}
                                 />
                                 <label htmlFor={`category-${category?._id}`} className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {category?.name}
                                 </label>
                              </div>
                           ))}
                        </div>
                     </ScrollArea>
                  </div>
                  <div className="mb-6">
                     <h3 className="font-semibold mb-2">Brand</h3>
                     <ScrollArea className="h-[120px]">
                        {brands.map(brand => (
                           <div key={brand} className="flex items-center space-x-2 mb-2">
                              <Checkbox
                                 id={`brand-${brand}`}
                                 checked={selectedBrands.includes(brand)}
                                 onCheckedChange={() => handleBrandChange(brand)}
                              />
                              <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                 {brand}
                              </label>
                           </div>
                        ))}
                     </ScrollArea>
                  </div>
                  <div className="mb-6">
                     <h3 className="font-semibold mb-2">Color</h3>
                     <ScrollArea className="h-[130px]">
                        {colors.map(color => (
                           <div key={color} className="flex items-center space-x-2 mb-2">
                              <Checkbox
                                 id={`color-${color}`}
                                 checked={selectedColors.includes(color)}
                                 onCheckedChange={() => handleColorChange(color)}
                              />
                              <label htmlFor={`color-${color}`} className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                 {color}
                              </label>
                           </div>
                        ))}
                     </ScrollArea>
                  </div>
                  <div>
                     <h3 className="font-semibold mb-2">Minimum Rating</h3>
                     <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                           <Button
                              key={rating}
                              variant={minRating >= rating ? "default" : "outline"}
                              size="sm"
                              onClick={() => setMinRating(rating)}
                           >
                              <Star className={`h-4 w-4 ${minRating >= rating ? "fill-current" : ""}`} />
                           </Button>
                        ))}
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default FilterPanel;
