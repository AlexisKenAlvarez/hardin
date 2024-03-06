import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={cn("relative w-full px-5", className)}>
      {children}
    </section>
  );
};

export default Container;
