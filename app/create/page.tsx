import { CreateEventForm } from "@/components/sections/CreateEventForm";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function CreatePage() {
  return (
    <SectionWrapper className="py-6 sm:py-8">
      <CreateEventForm />
    </SectionWrapper>
  );
}
