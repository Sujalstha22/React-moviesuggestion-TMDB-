import { useEffect, useRef, useState } from "react";
import { Search, Film, X } from "lucide-react";
import { scrollToId, tmdbUrl } from "../lib/scroll";
import { searchMovies } from "../services/api";

const links = [
  { id: "trending", label: "Trending" },
  { id: "top-rated", label: "Top Rated" },
  { id: "tv-shows", label: "TV Shows" },
  { id: "genres", label: "Genres" },
  { id: "classic", label: "Classic" },
];

export default function Navbar() {
  const [results, setResults] = useState([]);
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

  useEffect(() => {
    if (query === "") {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const data = await searchMovies(query);
      setResults(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ================= GLOBAL GRADIENT BACKDROP ================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-black/90
          via-black/60
          to-transparent
        "
      />

      {/* ================= NAV BAR ================= */}
      <div
        className={`
          relative
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
          lg:px-10

          transition-all
          duration-500

          ${
            scrolled
              ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
              : "bg-transparent"
          }
        `}
      >
        {/* LOGO */}
        <button
          onClick={() => scrollToId("home")}
          className="
            flex
            items-center
            gap-2
            font-display
            text-2xl
            tracking-wide
            text-white
          "
        >
          <Film className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span>
            Cine<span className="text-gold italic">Verse</span>
          </span>
        </button>

        {/* NAV LINKS */}
        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="
                text-[13px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-white/80
                transition-colors
                duration-300
                hover:text-gold-soft
              "
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* SEARCH */}
        <div className="relative flex items-center">
          <button
            aria-label="Search titles"
            onClick={() => setSearchOpen((s) => !s)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-[10px]
              border
              border-white/15
              bg-black/20
              text-white
              backdrop-blur-md
              transition-all
              hover:border-gold/60
              hover:text-gold-soft
            "
          >
            {searchOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </button>

          {/* SEARCH DROPDOWN */}
          {searchOpen && (
            <div
              className="
                absolute
                right-0
                top-14
                w-[320px]
                sm:w-[380px]
                rounded-[12px]
                border
                border-white/10
                bg-black/70
                backdrop-blur-2xl
                shadow-2xl
                shadow-black/70
                p-3
              "
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search films & shows…"
                className="
                  w-full
                  rounded-[8px]
                  border
                  border-white/10
                  bg-black/40
                  px-3
                  py-2.5
                  text-sm
                  text-white
                  placeholder:text-white/40
                  outline-none
                  focus:border-gold/60
                "
              />

              {results.length > 0 && (
                <ul className="mt-2 max-h-80 space-y-1 overflow-y-auto">
                  {results.map((r) => (
                    <li key={r.id}>
                      <a
                        href={tmdbUrl(r.type, r.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-[8px]
                          p-2
                          transition-colors
                          hover:bg-white/5
                        "
                      >
                        <img
                          src={r.poster}
                          alt=""
                          className="h-14 w-10 rounded-[4px] object-cover"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {r.title}
                          </p>
                          <p className="text-xs text-white/60">
                            {r.year} · {r.type === "tv" ? "TV Series" : "Film"}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {query.trim() && results.length === 0 && (
                <p className="mt-3 px-1 text-xs text-white/50">
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
