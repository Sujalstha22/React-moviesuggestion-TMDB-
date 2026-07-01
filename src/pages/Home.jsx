import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import PosterRow from "../components/PosterRow";
import FeaturedClassic from "../components/FeaturedClassic";

import {
  getTrendingToday,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTV,
  getMovieDetails,
  CLASSIC_IDS,
} from "../services/api";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [shows, setShows] = useState([]);
  const [featuredClassic, setFeaturedClassic] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHome() {
      try {
        setLoading(true);

        const randomClassic =
          CLASSIC_IDS[Math.floor(Math.random() * CLASSIC_IDS.length)];

        const [
          trendingData,
          popularData,
          topRatedData,
          showsData,
          classicMovie,
        ] = await Promise.all([
          getTrendingToday(),
          getPopularMovies(),
          getTopRatedMovies(),
          getPopularTV(),
          getMovieDetails(randomClassic),
        ]);

        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setShows(showsData);
        setFeaturedClassic(classicMovie);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading movies.");
      } finally {
        setLoading(false);
      }
    }

    loadHome();
  }, []);
  // -------------------------
  // Loading State
  // -------------------------
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink">
        <div className="flex flex-col items-center gap-5">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-charcoal-line border-t-gold-soft" />

          <p className="font-display text-xl italic text-bone">
            Curating tonight's collection...
          </p>
        </div>
      </main>
    );
  }

  // -------------------------
  // Error State
  // -------------------------
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6">
        <div className="max-w-md text-center">
          <h2 className="font-display text-4xl italic text-bone">Oops...</h2>

          <p className="mt-5 leading-8 text-fog">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-8 rounded-xl bg-gold-soft px-6 py-3 font-semibold text-ink transition hover:bg-gold"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink text-bone">
      <Hero />

      <PosterRow
        id="trending"
        eyebrow="Now Trending"
        title="Trending Today"
        items={trending}
        ranked
        size="lg"
      />

      <PosterRow
        id="popular"
        eyebrow="Popular Picks"
        title="Popular Movies"
        items={popular}
      />

      <PosterRow
        id="top-rated"
        eyebrow="Highest Rated"
        title="Critics' Favorites"
        items={topRated}
      />

      {/* ---------------- TV Shows ---------------- */}

      <PosterRow
        id="tv-shows"
        eyebrow="Binge Worthy"
        title="Popular TV Shows"
        items={shows}
      />

      {/* ---------------- Featured Classic ---------------- */}

      <FeaturedClassic movie={featuredClassic} />
      {/* ================= About ================= */}

      <section id="about" className="border-t border-charcoal-line/60 py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
          {/* Left */}

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold-soft">
              About CineVerse
            </p>

            <h2 className="font-display text-5xl italic leading-tight text-bone">
              Built for people who
              <br />
              love cinema.
            </h2>

            <p className="mt-8 max-w-xl text-[15px] leading-8 text-fog">
              CineVerse is a modern movie discovery experience designed to help
              you find your next favorite film or TV series. Instead of
              endlessly scrolling through streaming platforms, explore curated
              collections, trending releases, timeless classics, and critically
              acclaimed masterpieces—all in one beautifully crafted interface.
            </p>

            <p className="mt-6 max-w-xl text-[15px] leading-8 text-fog">
              Every movie, TV show, rating, poster, and description is powered
              by{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold-soft transition hover:text-gold"
              >
                The Movie Database (TMDB)
              </a>
              , one of the world's largest community-driven movie databases.
            </p>

            <a
              href="https://developer.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-10
                inline-flex
                items-center
                rounded-xl
                border
                border-gold-soft/40
                px-6
                py-3

                font-medium
                text-gold-soft

                transition-all

                hover:border-gold
                hover:bg-gold-soft/10
              "
            >
              Explore TMDB API →
            </a>
          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-charcoal-line bg-charcoal-soft/40 p-8 backdrop-blur-md">
              <p className="text-5xl font-display italic text-gold-soft">1M+</p>

              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-fog">
                Movies
              </p>
            </div>

            <div className="rounded-2xl border border-charcoal-line bg-charcoal-soft/40 p-8 backdrop-blur-md">
              <p className="text-5xl font-display italic text-gold-soft">
                250K+
              </p>

              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-fog">
                TV Episodes
              </p>
            </div>

            <div className="rounded-2xl border border-charcoal-line bg-charcoal-soft/40 p-8 backdrop-blur-md">
              <p className="text-5xl font-display italic text-gold-soft">
                Daily
              </p>

              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-fog">
                Trending Updates
              </p>
            </div>

            <div className="rounded-2xl border border-charcoal-line bg-charcoal-soft/40 p-8 backdrop-blur-md">
              <p className="text-5xl font-display italic text-gold-soft">
                Free
              </p>

              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-fog">
                TMDB API
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Footer ================= */}

      <footer className="border-t border-charcoal-line/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 text-center text-sm text-fog lg:flex-row lg:px-10">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-display italic text-bone">CineVerse</span>.
            Crafted for movie lovers.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-gold-soft"
            >
              TMDB
            </a>

            <a
              href="https://developer.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-gold-soft"
            >
              API Docs
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-gold-soft"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
