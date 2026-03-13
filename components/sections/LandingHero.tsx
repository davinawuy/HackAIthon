"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Event } from "@/types/event";
import { ActionButton } from "@/components/ui/ActionButton";
import { Badge } from "@/components/ui/Badge";
import { HeroSpotlight } from "@/components/ui/HeroSpotlight";

type LandingHeroProps = {
  previewEvents: Event[];
};

export function LandingHero({ previewEvents }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <HeroSpotlight className="absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-20">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Badge className="bg-cyan-400/15 text-cyan-100">
              <Sparkles className="mr-1 size-3.5" />
              AI for stronger, safer communities
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
            className="text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Culture Cauldron
            <span className="mt-3 block bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-200 bg-clip-text text-3xl text-transparent sm:text-4xl lg:text-5xl">
              Discover culture. Join community. Belong together.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="max-w-xl text-pretty text-base text-slate-200 sm:text-lg"
          >
            A premium social discovery platform where AI helps people understand traditions, find welcoming events,
            and confidently join communities beyond their usual bubble.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <ActionButton href="/explore">
              Explore Events
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </ActionButton>
            <ActionButton href="/create" variant="secondary">
              Create Event
            </ActionButton>
          </motion.div>
        </div>

        <div className="relative min-h-[340px]">
          {previewEvents.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -3 : 3 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: index % 2 === 0 ? -3 : 3,
                x: index * 8,
              }}
              transition={{ duration: 0.6, delay: 0.15 * index, ease: "easeOut" }}
              whileHover={{ y: -8, rotate: 0 }}
              className="glass-card absolute right-0 w-full rounded-2xl p-4 shadow-2xl shadow-slate-900/35 sm:w-[92%]"
              style={{ top: `${index * 78}px`, zIndex: previewEvents.length - index }}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{event.cultureTag}</p>
                <Badge className="text-[10px]">AI safe</Badge>
              </div>
              <h3 className="text-base font-semibold text-white">{event.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-300">{event.shortDescription}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
