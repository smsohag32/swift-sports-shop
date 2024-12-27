import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

const VmModal = ({ isOpen, handleClose, title, size, children }) => {
   const isDesktop = useMediaQuery("(min-width: 768px)");



   if (isDesktop) {
      return <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="w-full"
            style={{ maxWidth: size || "auto" }}>
            <DialogHeader className={"border-b"}>
               <DialogTitle className="px-6 pt-4 pb-4">{title}</DialogTitle>
            </DialogHeader>
            <div className="  w-full px-6 -mt-4 pt-6 pb-6 max-h-[85vh] overflow-y-auto">
               {children}
            </div>
         </DialogContent>
      </Dialog>
   }


   return (
      <Drawer open={isOpen} onOpenChange={handleClose}>

         <DrawerContent className="w-full"
            style={{ maxWidth: size || "auto" }}>
            <div className="mx-auto w-full max-w-sm">
               <DrawerHeader className={"border-b"}>
                  <DrawerTitle className=" pt-4 pb-4">{title}</DrawerTitle>
               </DrawerHeader>
               <div className="  w-full  pt-6 pb-6 max-h-[85vh] overflow-y-auto">
                  {children}
               </div>
            </div>
         </DrawerContent>
      </Drawer>
   );
};

export default VmModal;
