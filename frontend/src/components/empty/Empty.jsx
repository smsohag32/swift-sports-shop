import emptyIcon from "@/assets/icons/empty.png"
const Empty = ({ message }) => {
   return (
      <div className='flex items-center justify-center h-[60vh]'>
         <div className="flex items-center justify-center flex-col">
            <img src={emptyIcon} className="w-[56px]" alt="Empty" />
            <p className="text-[24px] font-normal mt-6">{message}</p>
         </div>
      </div>
   );
};

export default Empty;
