"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { EventCard } from "@/components/events/EventCard";
import { FilterChips } from "@/components/ui/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";
import { AIRecommendations } from "@/components/ai/AIRecommendations";
import { categories, cultureTags, featuredEvents, events, trendingEvents } from "@/data/events";
import { normalize } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Flame } from "lucide-react";

const categoryOptions = ["All", ...categories];
const cultureOptions = ["All", ...cultureTags];

export function ExploreClient() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCulture, setSelectedCulture] = useState("All");

  const filteredEvents = useMemo(() => {
    const query = normalize(search);

    return events.filter((event) => {
      const matchesSearch =
        query.length === 0 ||
        normalize(event.title).includes(query) ||
        normalize(event.shortDescription).includes(query) ||
        normalize(event.location).includes(query);
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      const matchesCulture = selectedCulture === "All" || event.cultureTag === selectedCulture;

      return matchesSearch && matchesCategory && matchesCulture;
    });
  }, [search, selectedCategory, selectedCulture]);

  return (
    <div className="space-y-10">
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Explore Cultural Events</h1>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Discover relevant activities with AI-powered event insights, safety badges, and comfort notes.
            </p>
          </div>
          <Badge className="bg-fuchsia-500/15 text-fuchsia-100">
            <Sparkles className="mr-1 size-3.5" />
            AI Curated Feed
          </Badge>
        </div>

        <div className="glass-card grid gap-4 rounded-2xl p-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by event, culture, or location" />
          <FilterChips
            label="Category"
            options={categoryOptions}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <FilterChips
            label="Community"
            options={cultureOptions}
            selected={selectedCulture}
            onSelect={setSelectedCulture}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-white">
          <Flame className="size-5 text-orange-300" />
          Featured and trending
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredEvents.slice(0, 2).map((event) => (
            <EventCard key={`featured-${event.id}`} event={event} priority="featured" />
          ))}
          {trendingEvents.slice(0, 2).map((event) => (
            <EventCard key={`trending-${event.id}`} event={event} />
          ))}
        </div>
      </section>

      <AIRecommendations />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-white">All events</h2>
          <p className="text-sm text-slate-300">{filteredEvents.length} results</p>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center text-slate-300">
            No events match your filters yet. Try a broader search.
          </div>
        ) : (
          <motion.div
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
