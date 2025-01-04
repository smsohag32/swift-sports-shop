import { Database } from "lucide-react";

const Empty = ({ message }) => {
   return (
      <div className='flex items-center justify-center h-[60vh]'>
         <div className="flex items-center justify-center flex-col">
            <span>
               <Database />
            </span>
            <p className="text-[24px] font-normal mt-6">{message}</p>
         </div>
      </div>
   );
};

export default Empty;
