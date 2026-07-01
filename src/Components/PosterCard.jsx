import { useState } from "react";
import {
  Star,
  Heart,
  ExternalLink,
  Calendar,
  Clapperboard,
} from "lucide-react";

import { useMovieContext } from "../Contexts/useMovieContect";
import { tmdbUrl } from "../lib/scroll";

export default function PosterCard({ item, rank, size = "md" }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const favorite = isFavorite(item.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const width =
    size === "lg" ? "w-[220px] sm:w-[240px]" : "w-[175px] sm:w-[190px]";

  const open = hovered || expanded;

  const releaseYear = item.release_date?.slice(0, 4) || item.year || "—";

  const rating = item.vote_average ?? item.rating ?? 0;

  const genres = item.genres || [];

  const overview = item.overview || "No description available.";

  return (
    <div
      className={`group relative shrink-0 snap-start cursor-pointer ${width}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);

        if (!expanded) return;
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Ranking Number */}

      {rank !== undefined && (
        <span
          className="
          pointer-events-none
          absolute
          -left-5
          -top-6
          z-0
          select-none
          font-display
          text-[6rem]
          italic
          font-bold
          leading-none
          text-transparent
          opacity-70
          [-webkit-text-stroke:1.5px_theme(colors.gold-dim)]
        "
        >
          {String(rank).padStart(2, "0")}
        </span>
      )}

      {/* Card */}

      <div
        className={`
        relative
        z-10
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-charcoal-soft
        shadow-[0_18px_45px_rgba(0,0,0,.45)]

        transition-all
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        group-hover:-translate-y-3
        group-hover:scale-[1.05]
        group-hover:shadow-[0_28px_65px_rgba(0,0,0,.65)]

        ${open ? "ring-1 ring-gold-soft/50" : ""}
      `}
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <img
            src={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : item.poster
            }
            alt={item.title}
            loading="lazy"
            className={`
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out

              ${open ? "scale-[1.12]" : "scale-100"}
            `}
          />

          {/* Cinematic Overlay */}
          <div
            className={`
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/40
              to-transparent
              transition-opacity
              duration-500

              ${open ? "opacity-100" : "opacity-30"}
            `}
          />

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`
              absolute
              right-3
              top-3
              z-30

              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-full
              border
              border-white/20
              backdrop-blur-md

              transition-all
              duration-300

              ${
                favorite
                  ? "bg-red-500 text-white"
                  : "bg-black/40 text-white hover:bg-red-500"
              }
            `}
          >
            <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
          </button>

          {/* Rating Badge */}
          <div
            className="
              absolute
              left-3
              top-3
              z-30

              flex
              items-center
              gap-1

              rounded-full
              bg-black/60
              px-3
              py-1

              backdrop-blur-md
            "
          >
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

            <span className="text-xs font-semibold text-white">
              {rating.toFixed(1)}
            </span>
          </div>

          {/* Bottom Gradient */}
          <div
            className={`
              absolute
              inset-x-0
              bottom-0

              bg-gradient-to-t
              from-black
              via-black/70
              to-transparent

              transition-all
              duration-500

              ${open ? "h-full" : "h-28"}
            `}
          />

          {/* Hover Content */}
          <div
            className={`
              absolute
              inset-x-0
              bottom-0

              z-20

              p-4

              transition-all
              duration-500

              ${
                open
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              }
            `}
          >
            <h3 className="line-clamp-2 text-lg font-semibold text-white">
              {item.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-300">
              <div className="flex items-center gap-1">
                <Calendar size={13} />
                {releaseYear}
              </div>

              <div className="flex items-center gap-1">
                <Clapperboard size={13} />
                {item.media_type === "tv" || item.type === "tv"
                  ? "TV Series"
                  : "Movie"}
              </div>
            </div>
            {/* Expandable Content */}
            <div
              className={`
                overflow-hidden
                transition-all
                duration-500
                ease-in-out

                ${open ? "mt-4 max-h-72 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              {/* Overview */}
              <p className="line-clamp-4 text-sm leading-6 text-gray-300">
                {overview}
              </p>

              {/* Genres */}
              {genres.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {genres.slice(0, 3).map((genre, index) => (
                    <span
                      key={index}
                      className="
                        rounded-full
                        border
                        border-yellow-400/30
                        bg-yellow-400/10
                        px-3
                        py-1
                        text-[11px]
                        font-medium
                        text-yellow-300
                      "
                    >
                      {typeof genre === "string" ? genre : genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={15} className="fill-yellow-400" />
                  <span className="text-sm font-semibold">
                    {rating.toFixed(1)}
                  </span>
                </div>

                <a
                  href={tmdbUrl(
                    item.type || (item.media_type === "tv" ? "tv" : "movie"),
                    item.id,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-yellow-400
                    px-4
                    py-2

                    text-sm
                    font-semibold
                    text-black

                    transition-all
                    duration-300

                    hover:bg-yellow-300
                    hover:scale-105
                  "
                >
                  Details
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
