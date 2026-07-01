import { useState } from "react";
import { genreList, titles } from "../data/media";
import PosterCard from "./PosterCard";

export default function GenreExplorer() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? titles : titles.filter((t) => t.genres.includes(active));

  return (
    <section
      id="genres"
      className="border-t border-charcoal-line/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
          Browse
        </p>
        <h2 className="font-display text-3xl italic text-bone sm:text-4xl">
          Find something by mood
        </h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {genreList.map((g) => (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={`rounded-[8px] border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                active === g
                  ? "border-gold-soft bg-gold-soft text-ink"
                  : "border-charcoal-line text-fog hover:border-gold/50 hover:text-gold-soft"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div
          key={active}
          className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-fog">
              No titles in this genre yet — check back soon.
            </p>
          )}
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <PosterCard item={item} size="lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
