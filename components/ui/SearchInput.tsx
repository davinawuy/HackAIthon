"use client";

import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = "Search events" }: SearchInputProps) {
  return (
    <label className="relative block w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      <input
        aria-label="Search events"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 backdrop-blur transition-colors focus:border-cyan-300/70 focus:outline-none"
      />
    </label>
  );
}
