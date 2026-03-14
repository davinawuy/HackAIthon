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
import { ChatWidget } from "@/components/chat/ChatWidget";

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

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <AIInsightPanel event={event} />

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setInterested((value) => !value)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  interested
                    ? "bg-rose-500 text-white"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                {interested ? <Check className="size-4" /> : <Heart className="size-4" />}
                {interested ? "Interested" : "Mark Interested"}
              </button>

              <button
                type="button"
                onClick={() => setGoing((value) => !value)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  going
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                {going ? <Check className="size-4" /> : <Users className="size-4" />}
                {going ? "Going" : "Join Event"}
              </button>

              <button
                type="button"
                onClick={() => setSaved((value) => !value)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  saved
                    ? "bg-cyan-500 text-white"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                <Bookmark className="size-4" />
                {saved ? "Saved" : "Save Event"}
              </button>
            </div>
          </div>

          <ChatWidget
            eventId={event.id}
            title="Ask about this event"
            subtitle="Ask about first-timer comfort, etiquette, accessibility, or what to expect."
          />
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
