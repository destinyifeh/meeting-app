import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import React from "react";
import { classNames } from "../lib/className";

// export const Checkbox = () => (
//   <CheckboxPrimitive.Root
//     id="c1"
//     className="w-8 h-8 bg-white border-2 border-default flex items-center justify-cente focus:outline-none"
//     checked={true}
//   >
//     <CheckboxPrimitive.Indicator>
//       <Check className="h-8 w-8 text-white" />
//     </CheckboxPrimitive.Indicator>
//   </CheckboxPrimitive.Root>
// );

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={classNames(
      "w-8 h-8 bg-white shrink-0 border-2 border-default flex items-center justify-center focus:outline-none data-[state=checked]:bg-inverted",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <Check className="h-8 w-8 text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
