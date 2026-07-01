import { useEffect, useRef, useState } from "react";
import { Search, Film, X } from "lucide-react";
import { titles } from "../data/media";
import { scrollToId, tmdbUrl } from "../lib/scroll";

const links = [
  { id: "trending", label: "Trending" },
  { id: "top-rated", label: "Top Rated" },
  { id: "tv-shows", label: "TV Shows" },
  { id: "genres", label: "Genres" },
  { id: "classic", label: "Classic" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const results = query.trim()
    ? titles
        .filter((t) =>
          t.title.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .slice(0, 6)
    : [];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-charcoal-line/70"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <button
          onClick={() => scrollToId("home")}
          className="flex items-center gap-2 font-display text-2xl tracking-wide text-bone"
        >
          <Film className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span>
            Cine<span className="text-gold italic">Verse</span>
          </span>
        </button>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="text-[13px] font-medium uppercase tracking-[0.14em] text-fog transition-colors duration-300 hover:text-gold-soft"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="relative flex items-center">
          <button
            aria-label="Search titles"
            onClick={() => setSearchOpen((s) => !s)}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-charcoal-line/80 text-bone transition-colors hover:border-gold/60 hover:text-gold-soft"
          >
            {searchOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </button>

          {searchOpen && (
            <div className="absolute right-0 top-14 w-[320px] rounded-[10px] border border-charcoal-line bg-charcoal-soft/98 p-3 shadow-2xl shadow-black/60 sm:w-[380px]">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search films & shows…"
                className="w-full rounded-[8px] border border-charcoal-line bg-ink px-3 py-2.5 text-sm text-bone placeholder:text-fog/70 outline-none focus:border-gold/60"
              />
              {results.length > 0 && (
                <ul className="mt-2 max-h-80 space-y-1 overflow-y-auto">
                  {results.map((r) => (
                    <li key={r.id}>
                      <a
                        href={tmdbUrl(r.type, r.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-[8px] p-2 transition-colors hover:bg-white/5"
                      >
                        <img
                          src={r.poster}
                          alt=""
                          className="h-14 w-10 rounded-[4px] object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-bone">
                            {r.title}
                          </p>
                          <p className="text-xs text-fog">
                            {r.year} · {r.type === "tv" ? "TV Series" : "Film"}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {query.trim() && results.length === 0 && (
                <p className="mt-3 px-1 text-xs text-fog">
                  No titles match “{query}”.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
