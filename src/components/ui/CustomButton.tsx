import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  
  return (
    <Comp
      ref={ref}
      className={cn(
        "px-16 py-3 border dark:border-green-shadow  dark:hover:bg-green-primary/80 dark:bg-green-primary border-button-shadow shadow-button dark:shadow-green-button hover:bg-orange/80 transition-colors ease-in-out duration-300 bg-orange font-button text-xl text-white",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});

CustomButton.displayName = "CustomButton";

export default CustomButton;