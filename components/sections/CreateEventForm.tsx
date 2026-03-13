"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { WandSparkles, ShieldCheck, Smile, Accessibility } from "lucide-react";
import { categories, cultureTags } from "@/data/events";
import { Badge } from "@/components/ui/Badge";

type FormState = {
  title: string;
  description: string;
  category: string;
  cultureTag: string;
  date: string;
  time: string;
  location: string;
  image: string;
  accessibilityNotes: string;
  beginnerFriendly: boolean;
  familyFriendly: boolean;
  freeOrPaid: "Free" | "Paid";
};

const initialState: FormState = {
  title: "",
  description: "",
  category: categories[0] ?? "Community",
  cultureTag: cultureTags[0] ?? "Multicultural",
  date: "",
  time: "",
  location: "",
  image: "",
  accessibilityNotes: "",
  beginnerFriendly: true,
  familyFriendly: true,
  freeOrPaid: "Free",
};

const friendlierPhrases = [
  "Everyone is welcome, including first-time attendees.",
  "Join at your own pace in a respectful and supportive space.",
  "No prior experience needed. Friendly hosts will guide you.",
];

export function CreateEventForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onChangeText =
    (key: keyof Omit<FormState, "beginnerFriendly" | "familyFriendly" | "freeOrPaid">) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      updateField(key, event.target.value as FormState[typeof key]);
    };

  const aiSuggestion = useMemo(() => {
    const base = form.description.trim();
    if (!base) {
      return "Describe your event and AI Assist will suggest clearer, warmer wording for diverse communities.";
    }

    const tone = friendlierPhrases[(base.length + form.title.length) % friendlierPhrases.length];
    return `${base} ${tone}`;
  }, [form.description, form.title]);

  const aiSafetyNotes = useMemo(() => {
    const notes: string[] = [];

    if (form.beginnerFriendly) notes.push("Beginner-friendly badge recommended");
    if (form.familyFriendly) notes.push("Family-friendly wording suggested");
    if (form.freeOrPaid === "Free") notes.push("Highlight that this event is free to reduce joining anxiety");
    if (form.accessibilityNotes.trim()) notes.push("Accessibility note detected and boosted in event preview");

    return notes;
  }, [form]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form onSubmit={handleSubmit} className="glass-card space-y-4 rounded-2xl p-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-white">Create community event</h1>
          <p className="text-sm text-slate-300">Invite people with clarity, warmth, and inclusive language.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field sm:col-span-2">
            Event title
            <input
              required
              value={form.title}
              onChange={onChangeText("title")}
              placeholder="e.g. Indonesian Food Night"
            />
          </label>

          <label className="field sm:col-span-2">
            Description
            <textarea
              required
              value={form.description}
              onChange={onChangeText("description")}
              placeholder="Tell people what makes this event welcoming and meaningful"
              rows={4}
            />
          </label>

          <label className="field">
            Category
            <select value={form.category} onChange={onChangeText("category")}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            Culture/community tag
            <select value={form.cultureTag} onChange={onChangeText("cultureTag")}>
              {cultureTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            Date
            <input type="date" required value={form.date} onChange={onChangeText("date")} />
          </label>

          <label className="field">
            Time
            <input type="time" required value={form.time} onChange={onChangeText("time")} />
          </label>

          <label className="field sm:col-span-2">
            Location
            <input
              required
              value={form.location}
              onChange={onChangeText("location")}
              placeholder="Community center, park, campus room..."
            />
          </label>

          <label className="field sm:col-span-2">
            Optional image URL
            <input
              value={form.image}
              onChange={onChangeText("image")}
              placeholder="https://..."
            />
          </label>

          <label className="field sm:col-span-2">
            Accessibility notes
            <textarea
              value={form.accessibilityNotes}
              onChange={onChangeText("accessibilityNotes")}
              placeholder="Wheelchair access, quiet zones, dietary options, prayer spaces..."
              rows={3}
            />
          </label>
        </div>

        <div className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:grid-cols-3">
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={form.beginnerFriendly}
              onChange={(event) => updateField("beginnerFriendly", event.target.checked)}
            />
            Beginner friendly
          </label>
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={form.familyFriendly}
              onChange={(event) => updateField("familyFriendly", event.target.checked)}
            />
            Family friendly
          </label>
          <label className="toggle-row">
            <span>Pricing</span>
            <select
              value={form.freeOrPaid}
              onChange={(event) => updateField("freeOrPaid", event.target.value as "Free" | "Paid")}
              className="rounded-md border border-white/20 bg-slate-900/70 px-2 py-1 text-xs text-white"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </label>
        </div>

        <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">
          Publish Event Prototype
        </button>

        {submitted ? (
          <p className="rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-3 text-sm text-emerald-100">
            Event submitted. In a full product, this would be sent for AI safety checks and community moderation.
          </p>
        ) : null}
      </form>

      <aside className="space-y-4">
        <section className="glass-card space-y-4 rounded-2xl p-5">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-white">
            <WandSparkles className="size-4 text-cyan-200" />
            AI Assist for hosts
          </h2>
          <p className="text-sm text-slate-300">
            AI helps rewrite event descriptions with welcoming tone, respectful wording, and beginner-friendly guidance.
          </p>

          <div className="rounded-xl border border-cyan-200/20 bg-cyan-400/10 p-3 text-sm text-cyan-50">{aiSuggestion}</div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-emerald-400/15 text-emerald-100">
              <ShieldCheck className="mr-1 size-3.5" /> Respect-checked
            </Badge>
            <Badge className="bg-blue-400/15 text-blue-100">
              <Smile className="mr-1 size-3.5" /> Inclusive wording suggested
            </Badge>
            <Badge className="bg-violet-400/15 text-violet-100">
              <Accessibility className="mr-1 size-3.5" /> Comfort info highlighted
            </Badge>
          </div>

          <ul className="space-y-2 text-sm text-slate-300">
            {aiSafetyNotes.map((note) => (
              <li key={note} className="inline-flex items-start gap-2">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-cyan-300" />
                {note}
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white">Live preview snapshot</h3>
          <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{form.cultureTag || "Culture tag"}</p>
            <p className="text-lg font-semibold text-white">{form.title || "Your event title"}</p>
            <p className="text-sm text-slate-300">{form.description || "Your event description will appear here."}</p>
            <p className="text-xs text-slate-400">
              {[form.date || "Date", form.time || "Time", form.location || "Location"].join(" · ")}
            </p>
          </div>
        </section>
      </aside>
    </div>
  );
}
