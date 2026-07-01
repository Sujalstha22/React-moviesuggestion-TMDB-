import { useState } from "react";
import { Bookmark, ExternalLink, Star } from "lucide-react";
import { featuredClassic } from "../data/media";
import { tmdbUrl } from "../lib/scroll";

export default function FeaturedClassic() {
  const [saved, setSaved] = useState(false);
  const m = featuredClassic;

  return (
    <section
      id="classic"
      className="relative overflow-hidden border-t border-charcoal-line/60 py-28 sm:py-36"
    >
      <div className="absolute inset-0">
        <img
          src={m.backdrop}
          alt=""
          className="h-full w-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-soft">
            Featured Classic
          </p>
          <h2 className="font-display text-4xl italic leading-tight text-bone sm:text-6xl">
            {m.title}
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fog">
            <span>{m.year}</span>
            <span className="h-1 w-1 rounded-full bg-fog/60" />
            <span>{m.runtime}</span>
            <span className="h-1 w-1 rounded-full bg-fog/60" />
            <span>{m.director}</span>
            <span className="h-1 w-1 rounded-full bg-fog/60" />
            <span className="flex items-center gap-1 text-gold-soft">
              <Star className="h-3.5 w-3.5 fill-gold-soft" />{" "}
              {m.rating.toFixed(1)}
            </span>
          </div>

          <p className="mt-6 font-display text-xl italic text-gold-soft/90">
            “{m.tagline}”
          </p>

          <p className="mt-6 text-[15px] leading-8 text-fog">{m.overview}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={tmdbUrl(m.type, m.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-[10px] bg-gold-soft px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold"
            >
              View on TMDB
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={() => setSaved((s) => !s)}
              className={`flex items-center gap-2 rounded-[10px] border px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                saved
                  ? "border-gold-soft text-gold-soft"
                  : "border-charcoal-line text-bone hover:border-gold/50 hover:text-gold-soft"
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${saved ? "fill-gold-soft" : ""}`}
              />
              {saved ? "Saved to Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
