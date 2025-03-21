import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "outline";
  asChild?: boolean;
}

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = "default",
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
        "flex items-center justify-center bg-orange hover:bg-orange-hover px-24 py-4 font-sans text-sm font-medium text-white transition-colors duration-300 ease-in-out",
        className,
        {
          "bg-transparent border-2 border-white hover:bg-white hover:text-orange": variant === "outline" 
        }
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});

CustomButton.displayName = "CustomButton";

export default CustomButton;