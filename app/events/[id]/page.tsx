import { notFound } from "next/navigation";
import { EventDetailClient } from "@/components/sections/EventDetailClient";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { events, getEventById, getRelatedEvents } from "@/data/events";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  const relatedEvents = getRelatedEvents(event);

  return (
    <SectionWrapper className="py-6 sm:py-8">
      <EventDetailClient event={event} relatedEvents={relatedEvents} />
    </SectionWrapper>
  );
}
