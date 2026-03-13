import Link from "next/link";

export default function EventNotFound() {
  return (
    <div className="glass-card mx-auto max-w-xl rounded-2xl p-8 text-center">
      <h1 className="text-2xl font-semibold text-white">Event not found</h1>
      <p className="mt-2 text-sm text-slate-300">
        This event may have moved or is no longer available in the demo feed.
      </p>
      <Link
        href="/explore"
        className="mt-5 inline-flex rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
      >
        Back to explore
      </Link>
    </div>
  );
}
