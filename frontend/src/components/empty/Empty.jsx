import { Database } from "lucide-react";

const Empty = ({ message }) => {
   return (
      <div className='flex items-center justify-center w-full h-[60vh]'>
         <div className="flex items-center justify-center w-full flex-col">
            <span className="text-primaryOrange">
               <Database size={40} />
            </span>
            <p className="text-[24px] font-normal mt-3">{message}</p>
         </div>
      </div>
   );
};

export default Empty;
