import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
}

export const Button = ({className, children, ...props}: ButtonProps) => {
  return (
    <button className={cn("bg-black transition-colors ease-in-out duration-300  text-white font-sans text-sm font-medium hover:bg-primary  flex w-52 rounded-lg justify-center items-center py-3", className)} {...props}>
      {children}
    </button>
  );
}

export default Button;