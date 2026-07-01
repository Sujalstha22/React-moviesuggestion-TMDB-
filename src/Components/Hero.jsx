import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { scrollToId, tmdbUrl } from "../lib/scroll";
import { getTrendingToday } from "../services/api";

const COUNT = 6;

function circularOffset(i, current, total) {
  let d = i - current;

  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;

  return d;
}

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const timer = useRef(null);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const data = await getTrendingToday();

        const filtered = data
          .filter((m) => m.poster_path && m.backdrop_path)
          .slice(0, COUNT);

        setMovies(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    loadHero();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!movies.length || paused) return;

    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(timer.current);
  }, [movies, paused]);

  if (!movies.length) return null;

  const active = movies[index];

  return (
    <section
      id="home"
      className="relative h-screen min-h-[760px] overflow-hidden bg-black"
    >
      {/* ================= BACKGROUND ================= */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.28}px)`,
        }}
      >
        {movies.map((movie, i) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-[1800ms]
            ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt=""
              className="h-full w-full scale-105 object-cover object-top"
            />
          </div>
        ))}

        {/* ================= LIGHTER CINEMATIC OVERLAY ================= */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/55" />

        {/* left focus readability layer */}
        <div className="absolute inset-y-0 left-0 w-full max-w-2xl bg-gradient-to-r from-black/45 to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center gap-12 px-6 lg:flex-row lg:items-center lg:px-10">
        {/* ================= LEFT ================= */}
        <div className="lg:w-[46%]">
          <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-white/60">
            <span className="h-px w-8 bg-white/40" />
            Cinema Curated Daily
          </p>

          <h1 className="font-serif text-5xl italic leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] lg:text-7xl">
            Discover
            <br />
            your next
            <br />
            masterpiece.
          </h1>

          <p className="mt-8 max-w-md font-sans leading-8 text-white/75 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
            Explore trending movies, award-winning classics and the world's
            biggest TV shows — powered live by TMDB.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => scrollToId("trending")}
              className="flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-black transition hover:bg-white/90"
            >
              Start Exploring
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-white/10 pt-6">
            <span className="text-xs uppercase tracking-[0.25em] text-white/60">
              Now Featuring
            </span>

            <span className="h-1 w-1 rounded-full bg-white/40" />

            <a
              href={tmdbUrl(
                active.media_type === "tv" ? "tv" : "movie",
                active.id,
              )}
              target="_blank"
              rel="noreferrer"
              className="text-white transition hover:text-white/80"
            >
              {active.title || active.name}
            </a>

            <span className="flex items-center gap-1 text-white">
              <Star className="h-4 w-4 text-white" />
              {active.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div
          className="relative flex h-[560px] flex-1 items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {movies.map((movie, i) => {
            const offset = circularOffset(i, index, movies.length);
            const abs = Math.abs(offset);

            if (abs > 2) return null;

            const translate = offset * 170;
            const scale = 1 - abs * 0.2;
            const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.25;

            return (
              <button
                key={movie.id}
                onClick={() => setIndex(i)}
                className="absolute overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-700"
                style={{
                  transform: `translate(calc(-50% + ${translate}px),-50%) scale(${scale})`,
                  left: "50%",
                  top: "50%",
                  width: "260px",
                  height: "390px",
                  opacity,
                  zIndex: 10 - abs,
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="h-full w-full object-cover"
                />

                {abs === 0 && (
                  <>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-serif text-xl italic text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                        {movie.title || movie.name}
                      </h3>

                      <p className="mt-1 text-xs uppercase tracking-widest text-white/70">
                        {(
                          movie.release_date ||
                          movie.first_air_date ||
                          ""
                        ).slice(0, 4)}
                      </p>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <button
        onClick={() => scrollToId("trending")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 transition hover:text-white"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="animate-bounce" />
        </div>
      </button>
    </section>
  );
}
