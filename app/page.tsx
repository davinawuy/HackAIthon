import { ArrowRight, BrainCircuit, HandHeart, ShieldCheck, Sparkles, Users, WandSparkles } from "lucide-react";
import { LandingHero } from "@/components/sections/LandingHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ActionButton } from "@/components/ui/ActionButton";
import { Badge } from "@/components/ui/Badge";
import { featuredEvents } from "@/data/events";

const featureCards = [
  {
    icon: BrainCircuit,
    title: "AI event explainer",
    text: "Understand traditions, etiquette, and first-timer expectations before attending.",
  },
  {
    icon: ShieldCheck,
    title: "AI safety layer",
    text: "See respect-checked signals and inclusive wording cues across every event card.",
  },
  {
    icon: WandSparkles,
    title: "AI host helper",
    text: "Help organizers write warm, clear, and welcoming descriptions for diverse audiences.",
  },
  {
    icon: HandHeart,
    title: "Comfort-first discovery",
    text: "Highlight accessibility, dietary options, quiet zones, and beginner support.",
  },
];

const aiFlow = [
  "AI reads event details and detects cultural context.",
  "AI surfaces first-timer guidance and respectful participation tips.",
  "AI recommends relevant events based on interests and comfort preferences.",
  "AI nudges hosts toward safer, friendlier, and more inclusive language.",
];

const benefits = [
  "Reduce fear of joining unfamiliar communities",
  "Increase cross-cultural friendships and belonging",
  "Support safer public gatherings with clear expectations",
  "Help students and new residents find community faster",
];

export default function HomePage() {
  return (
    <div className="space-y-4 pb-8">
      <LandingHero previewEvents={featuredEvents.slice(0, 3)} />

      <SectionWrapper className="space-y-8">
        <AnimatedHeading
          badge={<Badge>Feature Highlights</Badge>}
          title="A premium social platform designed for community trust"
          subtitle="Culture Cauldron combines elegant event discovery with AI guidance so people can join with confidence, not uncertainty."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {featureCards.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.07}>
              <article className="glass-card rounded-2xl p-5">
                <Icon className="size-5 text-cyan-200" />
                <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-300">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div className="glass-card rounded-2xl p-6">
            <AnimatedHeading
              badge={<Badge className="bg-cyan-400/15 text-cyan-100">How AI helps communities</Badge>}
              title="From cultural curiosity to real connection"
              subtitle="AI reduces uncertainty and social friction by explaining events clearly and emphasizing safety, respect, and inclusion."
            />
            <ul className="mt-5 space-y-3 text-sm text-slate-200">
              {aiFlow.map((step) => (
                <li key={step} className="inline-flex items-start gap-2">
                  <Sparkles className="mt-0.5 size-4 text-cyan-200" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Problem to solve</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">People want to join, but fear awkwardness or cultural missteps.</h3>
            <p className="mt-3 text-sm text-slate-300">
              Communities grow weaker when newcomers feel excluded, confused, or unsafe. Culture Cauldron turns uncertainty
              into clarity using AI-powered event explainers, friendly tone support, and comfort-first information.
            </p>
            <div className="mt-5 rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-4 text-sm text-emerald-50">
              Solution: trusted guidance before arrival, inclusive language for hosts, and personalized event discovery for
              every comfort level.
            </div>
          </div>
        </Reveal>
      </SectionWrapper>

      <SectionWrapper className="space-y-6">
        <AnimatedHeading
          badge={<Badge className="bg-fuchsia-500/15 text-fuchsia-100">Community benefits</Badge>}
          title="Strengthen communities through safer participation"
          subtitle="When people understand each other better, they show up more often and form stronger relationships."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit} delay={index * 0.05}>
              <article className="glass-card rounded-2xl p-4">
                <Users className="size-5 text-cyan-200" />
                <p className="mt-3 text-sm text-slate-200">{benefit}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <Reveal>
          <section className="glass-card rounded-3xl bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-indigo-500/15 p-7 text-center sm:p-10">
            <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">Join culture with confidence.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
              Explore events beyond your bubble and create friendlier spaces where everyone feels they belong.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <ActionButton href="/explore">
                Explore Events
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </ActionButton>
              <ActionButton href="/create" variant="secondary">
                Create Event
              </ActionButton>
            </div>
          </section>
        </Reveal>
      </SectionWrapper>
    </div>
  );
}
