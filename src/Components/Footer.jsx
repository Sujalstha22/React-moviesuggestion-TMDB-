import { Film } from "lucide-react";
import { scrollToId } from "../lib/scroll";

const links = [
  { id: "trending", label: "Trending" },
  { id: "top-rated", label: "Top Rated" },
  { id: "tv-shows", label: "TV Shows" },
  { id: "genres", label: "Genres" },
];

export default function Footer() {
  return (
    <footer className="border-t border-charcoal-line/60 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <button
            onClick={() => scrollToId("home")}
            className="flex items-center gap-2 font-display text-xl tracking-wide text-bone"
          >
            <Film className="h-4 w-4 text-gold" strokeWidth={1.5} />
            Cine<span className="italic text-gold">Verse</span>
          </button>

          <nav className="flex flex-wrap gap-x-7 gap-y-3">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="text-xs font-medium uppercase tracking-[0.14em] text-fog transition-colors hover:text-gold-soft"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="my-10 h-px w-full bg-charcoal-line/70" />

        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-[10px] border border-charcoal-line px-4 py-2 text-xs text-fog transition-colors hover:border-gold/40 hover:text-gold-soft"
          >
            <span className="flex h-4 items-center gap-[2px]">
              <span className="h-2 w-2 rounded-full bg-[#01b4e4]" />
              <span className="h-2 w-2 rounded-full bg-[#90cea1]" />
              <span className="h-2 w-2 rounded-full bg-[#01d277]" />
            </span>
            Data &amp; imagery courtesy of TMDB
          </a>

          <p className="max-w-md text-[11px] leading-5 text-fog/60">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB. &copy; {new Date().getFullYear()} CineVerse.
          </p>
        </div>
      </div>
    </footer>
  );
}
