import { useState } from "react";
import { Bookmark, ExternalLink, Star } from "lucide-react";

export default function FeaturedClassic({ movie }) {
  const [saved, setSaved] = useState(false);

  if (!movie) return null;

  return (
    <section
      id="classic"
      className="relative overflow-hidden border-t border-charcoal-line/60 py-28 sm:py-36"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover object-top opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-soft">
            Featured Classic
          </p>

          <h2 className="font-display text-4xl italic leading-tight text-bone sm:text-6xl">
            {movie.title}
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fog">
            <span>{movie.release_date?.slice(0, 4)}</span>

            <span className="h-1 w-1 rounded-full bg-fog/60" />

            <span>{movie.runtime} min</span>

            <span className="h-1 w-1 rounded-full bg-fog/60" />

            <span>{movie.genres?.map((g) => g.name).join(" • ")}</span>

            <span className="h-1 w-1 rounded-full bg-fog/60" />

            <span className="flex items-center gap-1 text-gold-soft">
              <Star className="h-3.5 w-3.5 fill-gold-soft" />
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {movie.tagline && (
            <p className="mt-6 font-display text-xl italic text-gold-soft/90">
              "{movie.tagline}"
            </p>
          )}

          <p className="mt-6 text-[15px] leading-8 text-fog">
            {movie.overview}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`https://www.themoviedb.org/movie/${movie.id}`}
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
