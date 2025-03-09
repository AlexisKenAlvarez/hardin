import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
  variant?: "black" | "white"
  ref?: React.Ref<HTMLButtonElement>
}

const CustomButton = ({variant = "white", className, children, ref, ...props}: ButtonProps) => {
  return (
    <button ref={ref} className={cn("bg-white rounded-full hover:text-white text-black transition-colors ease-in-out duration-300 font-sans text-sm font-medium hover:bg-primary flex justify-center items-center px-6 py-4", className, {
      "text-white bg-black-primary": variant === "black"
    })} {...props}>
      {children}
    </button>
  );
}

export default CustomButton;