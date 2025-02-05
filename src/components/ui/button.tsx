import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
  variant?: "black" | "white"
}

export const Button = ({variant = "white", className, children, ...props}: ButtonProps) => {
  return (
    <button className={cn("bg-white rounded-full hover:text-white text-black transition-colors ease-in-out duration-300  font-sans text-sm font-medium hover:bg-primary  flex w-52 justify-center items-center py-3", className, {
      "text-white bg-black": variant === "black"
    })} {...props}>
      {children}
    </button>
  );
}

export default Button;