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
    <section className={cn("relative mx-auto w-full px-4 2xl:max-w-screen-xl max-w-screen-lg", className)}>
      {children}
    </section>
  );
};

export default Container;
