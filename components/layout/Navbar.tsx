"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/create", label: "Create" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-cyan-500/30">
            CC
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-100">Culture Cauldron</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "bg-white/15 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 p-2 text-slate-200 md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-slate-950/95 md:hidden"
          >
            <div className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6 lg:px-8">
              {navItems.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm transition",
                      active ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
