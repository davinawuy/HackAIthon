"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimatedHeadingProps = {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  className?: string;
};

export function AnimatedHeading({ title, subtitle, badge, className }: AnimatedHeadingProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {badge ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {badge}
        </motion.div>
      ) : null}
      <motion.h2
        className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          className="max-w-3xl text-pretty text-sm text-slate-300 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
