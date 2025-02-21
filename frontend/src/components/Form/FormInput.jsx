import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export const FormInput = ({ label, name, ...props }) => {
   const { register, formState: { errors } } = useFormContext();

   return (
      <div>
         <Label htmlFor={name}>{label}</Label>
         <Input id={name} {...register(name)} {...props} />
         {errors[name] && (
            <p className="text-sm text-red-500 mt-1">{errors[name].message}</p>
         )}
      </div>
   );
};
