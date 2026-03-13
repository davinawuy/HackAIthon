"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, Bookmark, Heart, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Event } from "@/types/event";
import { Badge } from "@/components/ui/Badge";
import { formatEventDate } from "@/lib/utils";

type EventCardProps = {
  event: Event;
  priority?: "featured" | "default";
};

export function EventCard({ event, priority = "default" }: EventCardProps) {
  const [saved, setSaved] = useState(false);
  const [interested, setInterested] = useState(false);
  const [going, setGoing] = useState(false);

  const interestedCount = useMemo(
    () => event.interestedCount + Number(interested),
    [event.interestedCount, interested],
  );

  const attendeeCount = useMemo(
    () => event.attendeeCount + Number(going),
    [event.attendeeCount, going],
  );

  return (
    <motion.article
      className="glass-card group overflow-hidden rounded-2xl"
      whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="relative h-40 overflow-hidden sm:h-44">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/10 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-cyan-400/20 text-cyan-100">{event.cultureTag}</Badge>
          {priority === "featured" ? <Badge className="bg-fuchsia-500/20 text-fuchsia-100">Featured</Badge> : null}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
          <p className="text-sm text-slate-300">{event.shortDescription}</p>
        </div>

        <div className="grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
          <p className="inline-flex items-center gap-2">
            <CalendarDays className="size-3.5 text-cyan-200" />
            {formatEventDate(event.dateISO)} · {event.time}
          </p>
          <p className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 text-cyan-200" />
            {event.location}
          </p>
          <p className="inline-flex items-center gap-2 sm:col-span-2">
            <Users className="size-3.5 text-cyan-200" />
            {attendeeCount} going · {interestedCount} interested
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {event.safetyBadges.slice(0, 2).map((badge) => (
            <Badge key={badge} className="text-[10px] text-emerald-100">
              {badge}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setInterested((value) => !value)}
            className={`chip-action ${interested ? "chip-action-active" : ""}`}
          >
            <Heart className="size-3.5" />
            Interested
          </button>
          <button
            type="button"
            onClick={() => setGoing((value) => !value)}
            className={`chip-action ${going ? "chip-action-active" : ""}`}
          >
            <Check className="size-3.5" />
            Going
          </button>
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            className={`chip-action ${saved ? "chip-action-active" : ""}`}
          >
            <Bookmark className="size-3.5" />
            {saved ? "Saved" : "Save"}
          </button>
          <Link href={`/events/${event.id}`} className="chip-action ml-auto">
            View details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
