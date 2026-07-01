import { useRef } from "react";
import { ChevronLeft, ChevronRight, Radio } from "lucide-react";
import PosterCard from "./PosterCard";
import { useLiveTrending } from "../hooks/useLiveTrending";

export default function TrendingToday() {
  const { items, isLive } = useLiveTrending();
  const scroller = useRef(null);

  const scrollBy = (dir) => {
    scroller.current?.scrollBy({
      left: dir * scroller.current.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="trending"
      className="border-t border-charcoal-line/60 bg-charcoal py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-soft/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-soft" />
              </span>
              Trending Today{" "}
              {isLive && <span className="text-fog">· Live from TMDB</span>}
            </p>
            <h2 className="font-display text-3xl italic text-bone sm:text-4xl">
              What everyone is watching right now
            </h2>
          </div>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-charcoal-line text-fog transition-colors hover:border-gold/50 hover:text-gold-soft"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-charcoal-line text-fog transition-colors hover:border-gold/50 hover:text-gold-soft"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-6 pb-4 pt-10 snap-x snap-mandatory lg:px-10"
      >
        {items.map((item, i) => (
          <PosterCard
            key={`${item.type}-${item.id}`}
            item={item}
            rank={i + 1}
          />
        ))}
        <div className="w-2 shrink-0" />
      </div>

      {!isLive && (
        <p className="mt-2 flex items-center gap-2 px-6 text-[11px] text-fog/70 lg:px-10">
          <Radio className="h-3 w-3" /> Showing this week's editorial trending
          picks.
        </p>
      )}
    </section>
  );
}
