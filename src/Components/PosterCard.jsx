import { Star } from "lucide-react";
import { tmdbUrl } from "../lib/scroll";

export default function PosterCard({ item, rank, size = "md" }) {
  const width =
    size === "lg" ? "w-[190px] sm:w-[210px]" : "w-[150px] sm:w-[168px]";

  return (
    <a
      href={tmdbUrl(item.type, item.id)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative shrink-0 snap-start ${width}`}
    >
      {rank !== undefined && (
        <span
          aria-hidden
          className="pointer-events-none absolute -left-3 -top-3 z-0 select-none font-display text-[5.5rem] font-bold italic leading-none text-transparent [-webkit-text-stroke:1.5px_theme(colors.gold-dim)] opacity-70 sm:text-[6.5rem]"
        >
          {String(rank).padStart(2, "0")}
        </span>
      )}

      <div className="relative z-10 overflow-hidden rounded-[10px] border border-white/10 bg-charcoal-soft shadow-lg shadow-black/40 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04] group-hover:shadow-2xl group-hover:shadow-black/70">
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            src={item.poster}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-3 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="truncate text-sm font-semibold text-bone">
            {item.title}
          </p>

          <div className="mt-1 flex items-center gap-2 text-[11px] text-fog">
            <span>{item.year}</span>

            <span className="flex items-center gap-0.5 text-gold-soft">
              <Star className="h-3 w-3 fill-gold-soft" />
              {item.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
