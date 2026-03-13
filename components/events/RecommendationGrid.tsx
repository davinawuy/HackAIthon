import { Event } from "@/types/event";
import { EventCard } from "@/components/events/EventCard";

type RecommendationGridProps = {
  title: string;
  events: Event[];
  subtitle?: string;
};

export function RecommendationGrid({ title, events, subtitle }: RecommendationGridProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {subtitle ? <p className="text-sm text-slate-300">{subtitle}</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
