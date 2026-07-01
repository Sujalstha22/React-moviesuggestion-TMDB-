import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { heroFeatured } from "../data/media";
import { scrollToId, tmdbUrl } from "../lib/scroll";

const COUNT = heroFeatured.length;

function circularOffset(i, current) {
  let d = i - current;
  if (d > COUNT / 2) d -= COUNT;
  if (d < -COUNT / 2) d += COUNT;
  return d;
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((p) => (p + 1) % COUNT);
    }, 4800);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const active = heroFeatured[index];

  return (
    <section
      id="home"
      className="relative h-screen min-h-[760px] w-full overflow-hidden bg-ink"
    >
      {/* Backdrop layers */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${scrollY * 0.28}px, 0)` }}
      >
        {heroFeatured.map((m, i) => (
          <div
            key={m.id}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={m.backdrop}
              alt=""
              className={`h-full w-full scale-105 object-cover object-top ${i === index ? "animate-ken-burns" : ""}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/5 to-black/40" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center gap-14 px-6 pt-16 lg:flex-row lg:items-center lg:gap-6 lg:px-10">
        {/* LEFT */}
        <div className="animate-fade-up lg:w-[46%]">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold-soft">
            <span className="h-px w-8 bg-gold-soft/70" />
            Cinema, curated nightly
          </p>

          <h1 className="text-balance font-display text-[2.9rem] font-medium italic leading-[1.05] text-bone sm:text-6xl lg:text-[4.2rem]">
            Where every story finds you.
          </h1>

          <p className="mt-7 max-w-md text-[15px] leading-7 text-fog">
            One curated feed of trending films, celebrated classics, and the
            television everyone's talking about — no noise, just the next great
            watch.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <button
              onClick={() => scrollToId("trending")}
              className="group flex items-center gap-2.5 rounded-[10px] bg-gold-soft px-7 py-3.5 text-sm font-semibold tracking-wide text-ink transition-all duration-300 hover:bg-gold"
            >
              Start Exploring
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Now featuring caption, tied to the carousel */}
          <div className="mt-14 flex items-center gap-4 border-t border-charcoal-line/70 pt-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fog">
              Now Featuring
            </span>
            <span className="h-1 w-1 rounded-full bg-gold-dim" />
            <a
              href={tmdbUrl(active.type, active.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-bone transition-colors hover:text-gold-soft"
            >
              {active.title}
            </a>
            <span className="flex items-center gap-1 text-sm text-gold-soft">
              <Star className="h-3.5 w-3.5 fill-gold-soft" />
              {active.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* RIGHT — depth carousel */}
        <div
          className="relative flex h-[420px] items-center justify-center lg:h-[560px] lg:w-[54%]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {heroFeatured.map((m, i) => {
            const offset = circularOffset(i, index);
            const abs = Math.abs(offset);
            if (abs > 2) return null;

            const translateX = offset * 168;
            const scale = 1 - abs * 0.22;
            const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.28;
            const blur = abs === 0 ? 0 : abs === 1 ? 1 : 2.5;
            const zIndex = 30 - abs;

            return (
              <button
                key={m.id}
                onClick={() => setIndex(i)}
                style={{
                  transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px) brightness(${abs === 0 ? 1 : 0.6})`,
                  zIndex,
                }}
                className="absolute left-1/2 top-1/2 h-[300px] w-[200px] shrink-0 overflow-hidden rounded-[10px] border border-white/10 shadow-2xl shadow-black/60 transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] lg:h-[400px] lg:w-[266px]"
                aria-label={m.title}
              >
                <img
                  src={m.poster}
                  alt={m.title}
                  className="h-full w-full object-cover"
                />
                {abs === 0 && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 pt-10 text-left">
                    <p className="font-display text-lg italic text-bone">
                      {m.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-gold-soft">
                      {m.year} · {m.genres[0]}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => scrollToId("trending")}
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-fog transition-colors hover:text-gold-soft"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
