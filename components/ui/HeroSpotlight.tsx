"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

type HeroSpotlightProps = {
  className?: string;
};

export function HeroSpotlight({ className }: HeroSpotlightProps) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}% ${mouseY}%, rgba(34, 211, 238, 0.25), transparent 60%)`;

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div onMouseMove={onMove} className={className} aria-hidden>
      <motion.div className="absolute inset-0" style={{ background }} />
      <motion.div
        className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, -10, 20, 0] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-4 right-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
