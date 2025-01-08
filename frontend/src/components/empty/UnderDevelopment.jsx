import development from "@/assets/404/development.webp"
const UnderDevelopment = ({ message }) => {
   return (
      <div className="min-h-[60vh] flex items-center py-16 justify-center">
         <div className="flex items-center justify-center flex-col gap-4 max-w-md overflow-hidden mx-auto">
            <img src={development} alt="Under Development" className="w-full h-full object-cover" />
            <p className="text-title text-2xl lg:text-3xl animate-pulse font-medium ">{message}</p>
         </div>
      </div>
   );
};

export default UnderDevelopment;
