import UnderDevelopment from "@/components/empty/UnderDevelopment";
import { useSearchParams } from "react-router-dom";

const Products = () => {
   const [searchParams] = useSearchParams();
   const category = searchParams.get("category");
   return (
      <div>
         <UnderDevelopment message={`Under development`} />
      </div>
   );
};

export default Products;
