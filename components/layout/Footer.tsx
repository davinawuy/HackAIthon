import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-300 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-slate-100">Culture Cauldron</p>
          <p>Discover culture. Join community. Belong together.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/explore" className="transition hover:text-white">
            Explore Events
          </Link>
          <Link href="/create" className="transition hover:text-white">
            Create Event
          </Link>
          <Link href="/profile" className="transition hover:text-white">
            Profile
          </Link>
        </div>
      </div>
    </footer>
  );
}
