import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionWrapperProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8", className)}>
      {children}
    </section>
  );
}
