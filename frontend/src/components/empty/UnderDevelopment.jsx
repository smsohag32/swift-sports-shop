import development from "@/assets/404/development.webp"
const UnderDevelopment = ({ message }) => {
   return (
      <div className="min-h-[60vh] flex items-center py-16 justify-center">
         <div className="flex items-center justify-center flex-col gap-4">
            <img src={development} alt="Under Development" className="max-w-md mx-auto" />
            <p className="text-title text-2xl lg:text-3xl animate-pulse font-medium ">{message}</p>
         </div>
      </div>
   );
};

export default UnderDevelopment;
