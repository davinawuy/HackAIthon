"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FilterChipsProps = {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  label?: string;
};

export function FilterChips({ options, selected, onSelect, label }: FilterChipsProps) {
  return (
    <div className="space-y-2">
      {label ? <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{label}</p> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected === option;

          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active
                  ? "border-cyan-300/80 bg-cyan-400/20 text-cyan-100"
                  : "border-white/20 bg-white/5 text-slate-300 hover:border-white/40 hover:bg-white/10",
              )}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
