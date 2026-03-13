"use client";

import { useMemo, useState } from "react";
import { events } from "@/data/events";
import { EventCard } from "@/components/events/EventCard";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, UserCircle2 } from "lucide-react";

const tabs = ["Saved", "Joined", "Posted"] as const;
type Tab = (typeof tabs)[number];

const savedIds = ["ramadan-community-iftar", "language-exchange-evening", "naidoc-storytelling-night"];
const joinedIds = ["holi-celebration-meetup", "indonesian-food-night", "multicultural-campus-picnic"];
const postedIds = ["arabic-coffee-conversation"];

const interests = ["Food", "Art", "Language Exchange", "Student Life", "Volunteering"];

export function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Saved");

  const tabEvents = useMemo(() => {
    const byId = new Map(events.map((event) => [event.id, event]));
    const bucket =
      activeTab === "Saved"
        ? savedIds
        : activeTab === "Joined"
          ? joinedIds
          : postedIds;

    return bucket.map((id) => byId.get(id)).filter(Boolean);
  }, [activeTab]);

  const aiNextUp = useMemo(
    () =>
      events
        .filter((event) => interests.some((interest) => event.category.toLowerCase().includes(interest.toLowerCase())))
        .slice(0, 3),
    [],
  );

  return (
    <div className="space-y-8">
      <section className="glass-card grid gap-5 rounded-2xl p-5 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="space-y-3">
          <h1 className="inline-flex items-center gap-2 text-3xl font-semibold text-white">
            <UserCircle2 className="size-7 text-cyan-200" />
            Community Profile
          </h1>
          <p className="text-sm text-slate-300">
            Track your saved, joined, and posted events while AI suggests where you can connect next.
          </p>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} className="bg-white/10">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-cyan-200/20 bg-cyan-400/10 p-4 text-sm text-cyan-50">
          <p className="inline-flex items-center gap-2 font-semibold text-cyan-100">
            <Sparkles className="size-4" />
            AI recommendation summary
          </p>
          <p className="mt-2">
            You are most active in food, language, and student-life events. AI suggests joining one arts event this month
            to broaden cross-community connections.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`chip-action ${activeTab === tab ? "chip-action-active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tabEvents.map((event) =>
            event ? <EventCard key={`${activeTab}-${event.id}`} event={event} /> : null,
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">AI recommendations for next events</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {aiNextUp.map((event) => (
            <EventCard key={`next-${event.id}`} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
