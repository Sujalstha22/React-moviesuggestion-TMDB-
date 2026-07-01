import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PosterCard from "./PosterCard";

export default function PosterRow({
  id,
  eyebrow,
  title,
  items = [],
  ranked = false,
  size = "md",
}) {
  const scroller = useRef(null);

  const scroll = (direction) => {
    if (!scroller.current) return;

    const amount = scroller.current.clientWidth * 0.82;

    scroller.current.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  if (!items.length) return null;

  return (
    <section id={id} className="relative overflow-visible py-10 sm:py-6">
      {/* Section Header */}
      <div className="mx-auto flex max-w-7xl items-end justify-between px-3 lg:px-5">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold-soft">
            {eyebrow}
          </p>

          <h2 className="font-display text-3xl italic text-bone sm:text-4xl">
            {title}
          </h2>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll Left"
            className=" group flex h-11 w-11 items-center justify-center rounded-xl border border-charcoal-line bg-charcoal-soft/50 backdrop-blur-md transition-all duration-300 hover:border-gold-soft hover:bg-gold-soft/10 hover:shadow-lg
            "
          >
            <ChevronLeft
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-0.5
                group-hover:text-gold-soft
              "
            />
          </button>

          <button
            onClick={() => scroll(1)}
            aria-label="Scroll Right"
            className=" group flex h-11 w-11 items-center justify-center rounded-xl border border-charcoal-line bg-charcoal-soft/50 backdrop-blur-md transition-all duration-300 hover:border-gold-soft hover:bg-gold-soft/10 hover:shadow-lg"
          >
            <ChevronRight
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:text-gold-soft
              "
            />
          </button>
        </div>
      </div>

      {/* Scroll Area */}
      <div className="relative">
        {/* Left Fade */}
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-30
            hidden
            h-full
            w-24
            bg-gradient-to-r
            from-ink
            via-ink/70
            to-transparent
            lg:block
          "
        />

        {/* Right Fade */}
        <div
          className=" pointer-events-none absolute right-0 top-0 z-30 hidden h-full w-24 bg-gradient-to-l from-ink via-ink/70 to-transparent lg:block
          "
        />
        {/* Posters */}
        <div
          ref={scroller}
          className=" relative flex snap-x snap-mandatory gap-8 overflow-x-auto overflow-y-visible scroll-smooth px-6 pb-20 pt-8 lg:px-10 scrollbar-hide "
        >
          {items.map((movie, index) => (
            <div
              key={movie.id}
              className=" relative shrink-0 transition-all duration-500 hover:z-50 focus-within:z-50
              "
            >
              <PosterCard
                item={movie}
                rank={ranked ? index + 1 : undefined}
                size={size}
              />
            </div>
          ))}

          {/* Spacer */}
          <div className="w-5 shrink-0" />
        </div>

        {/* Mobile Scroll Hint */}
        <div className="mt-6 flex justify-center md:hidden">
          <span className="rounded-full border border-charcoal-line bg-charcoal-soft/40 px-4 py-1 text-[11px] uppercase tracking-[0.25em] text-fog backdrop-blur-md">
            Swipe to Explore
          </span>
        </div>
      </div>
    </section>
  );
}
