import { cn } from "@/lib/utils";
import React from "react";

interface NavButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const NavButton = ({ className, children, ...props }: NavButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-full bg-white/10 px-4 py-2 font-medium transition-all duration-300 ease-in-out hover:bg-white hover:text-primary text-sm ",
        className,
      )}
      {...props}
    >
      <p>{children}</p>
    </button>
  );
};

export default NavButton;
