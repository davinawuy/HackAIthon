"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Users, Heart, Check, Bookmark, ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Event } from "@/types/event";
import { Badge } from "@/components/ui/Badge";
import { AIInsightPanel } from "@/components/ai/AIInsightPanel";
import { CommentList } from "@/components/events/CommentList";
import { EventCard } from "@/components/events/EventCard";

type EventDetailClientProps = {
  event: Event;
  relatedEvents: Event[];
};

export function EventDetailClient({ event, relatedEvents }: EventDetailClientProps) {
  const [interested, setInterested] = useState(false);
  const [going, setGoing] = useState(false);
  const [saved, setSaved] = useState(false);

  const interestedCount = useMemo(
    () => event.interestedCount + Number(interested),
    [event.interestedCount, interested],
  );

  const attendeeCount = useMemo(() => event.attendeeCount + Number(going), [event.attendeeCount, going]);

  return (
    <div className="space-y-8">
      <Link
        href="/explore"
        className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to explore
      </Link>

      <section className="glass-card overflow-hidden rounded-2xl">
        <div className="relative h-52 sm:h-64">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, 80vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <Badge>{event.cultureTag}</Badge>
            <Badge className="bg-cyan-400/20 text-cyan-100">{event.category}</Badge>
            <Badge className="bg-emerald-400/20 text-emerald-100">{event.freeOrPaid}</Badge>
          </div>
        </div>

        <div className="grid gap-8 p-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-white">{event.title}</h1>
              <p className="text-sm text-cyan-100">Hosted by {event.host}</p>
              <p className="text-sm text-slate-300">{event.shortDescription}</p>
            </div>

            <div className="grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              <p className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-cyan-200" />
                {event.date} · {event.time}
              </p>
              <p className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-cyan-200" />
                {event.location}
              </p>
              <p className="inline-flex items-center gap-2 sm:col-span-2">
                <Users className="size-4 text-cyan-200" />
                {attendeeCount} going · {interestedCount} interested
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {event.safetyBadges.map((badge) => (
                <Badge key={badge} className="bg-emerald-400/15 text-emerald-100">
                  {badge}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setInterested((value) => !value)}
                className={`chip-action ${interested ? "chip-action-active" : ""}`}
              >
                <Heart className="size-3.5" /> Interested
              </button>
              <button
                type="button"
                onClick={() => setGoing((value) => !value)}
                className={`chip-action ${going ? "chip-action-active" : ""}`}
              >
                <Check className="size-3.5" /> Going
              </button>
              <button
                type="button"
                onClick={() => setSaved((value) => !value)}
                className={`chip-action ${saved ? "chip-action-active" : ""}`}
              >
                <Bookmark className="size-3.5" /> {saved ? "Saved" : "Save"}
              </button>
            </div>

            <article className="space-y-3">
              <h2 className="text-xl font-semibold text-white">About this event</h2>
              <p className="text-sm leading-relaxed text-slate-300">{event.longDescription}</p>
            </article>

            <article className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">Why this matters</h3>
              <p className="text-sm text-slate-300">{event.whyThisMatters}</p>
            </article>

            <article className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">What to expect</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {event.whatToExpect.map((item) => (
                  <li key={item} className="inline-flex items-start gap-2">
                    <Sparkles className="mt-0.5 size-4 text-cyan-200" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="space-y-3 rounded-xl border border-cyan-300/20 bg-cyan-400/10 p-4">
              <h3 className="text-lg font-semibold text-cyan-100">Comfort and accessibility</h3>
              <p className="text-sm text-cyan-50">{event.accessibilityNotes}</p>
              <div className="flex flex-wrap gap-2">
                {event.comfortFeatures.map((feature) => (
                  <Badge key={feature} className="bg-cyan-300/20 text-cyan-50">
                    {feature}
                  </Badge>
                ))}
              </div>
            </article>
          </div>

          <div className="space-y-4">
            <AIInsightPanel event={event} />
            <article className="glass-card rounded-2xl p-4">
              <h3 className="text-base font-semibold text-white">First-timer tips</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {event.beginnerTips.map((tip) => (
                  <li key={tip} className="inline-flex items-start gap-2">
                    <span className="mt-1 inline-block size-1.5 rounded-full bg-cyan-300" />
                    {tip}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <CommentList comments={event.comments} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Related events</h2>
        <motion.div
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {relatedEvents.map((related) => (
            <EventCard key={related.id} event={related} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
