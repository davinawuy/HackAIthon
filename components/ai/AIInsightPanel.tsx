import { Sparkles, ShieldCheck, MessageCircleHeart, Accessibility } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Event } from "@/types/event";

type AIInsightPanelProps = {
  event: Event;
};

export function AIInsightPanel({ event }: AIInsightPanelProps) {
  return (
    <aside className="glass-card space-y-5 rounded-2xl p-5">
      <div className="flex items-center gap-2 text-cyan-200">
        <Sparkles className="size-4" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em]">AI Event Explainer</h3>
      </div>

      <div className="space-y-4 text-sm text-slate-200">
        <div>
          <p className="font-semibold text-white">What is this event?</p>
          <p>{event.aiExplainer.whatIsThis}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Why is it important?</p>
          <p>{event.aiExplainer.whyItMatters}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Can first-timers join?</p>
          <p>{event.aiExplainer.firstTimerFriendly}</p>
        </div>
        <div>
          <p className="font-semibold text-white">What should attendees expect?</p>
          <p>{event.aiExplainer.whatToExpect}</p>
        </div>
      </div>

      <div className="space-y-2 border-t border-white/10 pt-4">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">AI safety layer</p>
        <div className="flex flex-wrap gap-2">
          {event.safetyBadges.map((badge) => (
            <Badge key={badge} className="bg-emerald-400/15 text-emerald-100">
              <ShieldCheck className="mr-1 size-3.5" />
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-2 rounded-xl border border-cyan-200/20 bg-cyan-400/10 p-3 text-xs text-cyan-50">
        <div className="flex items-center gap-2">
          <MessageCircleHeart className="size-4" />
          Friendly tone guidance applied to host description
        </div>
        <div className="flex items-center gap-2">
          <Accessibility className="size-4" />
          Accessibility comfort info highlighted for first-time attendees
        </div>
      </div>
    </aside>
  );
}
