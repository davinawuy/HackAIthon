import { ProfileDashboard } from "@/components/sections/ProfileDashboard";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function ProfilePage() {
  return (
    <SectionWrapper className="py-6 sm:py-8">
      <ProfileDashboard />
    </SectionWrapper>
  );
}
