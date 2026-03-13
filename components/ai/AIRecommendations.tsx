"use client";

import { useMemo, useState } from "react";
import { aiInterestRecommendations } from "@/data/events";
import { FilterChips } from "@/components/ui/FilterChips";
import { EventCard } from "@/components/events/EventCard";
import { Sparkles } from "lucide-react";

const interestOptions = Object.keys(aiInterestRecommendations);

export function AIRecommendations() {
  const [interest, setInterest] = useState<string>(interestOptions[0]);

  const recommended = useMemo(() => aiInterestRecommendations[interest] ?? [], [interest]);

  return (
    <section className="space-y-5 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-5 backdrop-blur">
      <div className="space-y-2">
        <h3 className="inline-flex items-center gap-2 text-xl font-semibold text-white">
          <Sparkles className="size-4 text-cyan-200" />
          AI recommendation engine
        </h3>
        <p className="text-sm text-cyan-100/90">
          Discover events matched to your interests like food, language exchange, student life, and volunteering.
        </p>
      </div>

      <FilterChips
        options={interestOptions}
        selected={interest}
        onSelect={setInterest}
        label="Interest"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {recommended.map((event) => (
          <EventCard key={`${interest}-${event.id}`} event={event} />
        ))}
      </div>
    </section>
  );
}
