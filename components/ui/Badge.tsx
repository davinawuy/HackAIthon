import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100 backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}
