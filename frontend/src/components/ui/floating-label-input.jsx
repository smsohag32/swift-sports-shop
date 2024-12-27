import React from 'react';
import { cn } from '@/lib/utils';

import { Label } from '@/components/ui/label';

const FloatingInput = React.forwardRef((props, ref) => {
   const { className, ...rest } = props;
   return <input placeholder=" " className={cn('peer', className)} ref={ref} {...rest} />;
});
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = React.forwardRef((props, ref) => {
   const { className, ...rest } = props;
   return (
      <Label
         className={cn(
            'absolute start-2 top-1 z-10 origin-[0]  -translate-y-4 scale-75 transform bg-background px-2 text-sm duration-300 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
            className,
         )}
         ref={ref}
         {...rest}
      />
   );
});
FloatingLabel.displayName = 'FloatingLabel';

const FloatingLabelInput = React.forwardRef((props, ref) => {
   const { id, label, labelClassName, ...rest } = props;
   return (
      <div className="relative">
         <FloatingInput ref={ref} id={id} {...rest} />
         <FloatingLabel className={labelClassName} htmlFor={id}>{label}</FloatingLabel>
      </div>
   );
});
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingInput, FloatingLabel, FloatingLabelInput };
