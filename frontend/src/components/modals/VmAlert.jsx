import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,

} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";

const VmAlert = ({ isOpen, message, description, handleClose, handleConfirm }) => {
   return (
      <AlertDialog open={isOpen} onOpenChange={handleClose} >
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{message}</AlertDialogTitle>
               <AlertDialogDescription>
                  {description}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <Button onClick={handleConfirm}>Continue</Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>

   );
};

export default VmAlert;
