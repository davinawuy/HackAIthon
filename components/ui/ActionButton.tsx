import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

type ActionButtonProps =
  | (CommonProps & {
      href: string;
    })
  | (CommonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
      });

const baseClassName =
  "group relative inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70";

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5 hover:shadow-cyan-400/40",
  secondary:
    "border border-white/20 bg-white/10 text-slate-100 backdrop-blur hover:-translate-y-0.5 hover:bg-white/15",
  ghost:
    "text-slate-200 hover:bg-white/10",
};

export function ActionButton({ children, className, variant = "primary", ...props }: ActionButtonProps) {
  const classes = cn(baseClassName, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
