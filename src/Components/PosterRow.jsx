import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PosterCard from "./PosterCard";

export default function PosterRow({
  id,
  eyebrow,
  title,
  items,
  ranked = false,
  size = "md",
}) {
  const scroller = useRef(null);

  const scrollBy = (dir) => {
    scroller.current?.scrollBy({
      left: dir * scroller.current.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <section id={id} className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              {eyebrow}
            </p>

            <h2 className="font-display text-3xl italic text-bone sm:text-4xl">
              {title}
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
        className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-6 pb-4 pt-8 snap-x snap-mandatory lg:px-10"
      >
        {items.map((item, i) => (
          <PosterCard
            key={item.id}
            item={item}
            rank={ranked ? i + 1 : undefined}
            size={size}
          />
        ))}

        <div className="w-2 shrink-0" />
      </div>
    </section>
  );
}
