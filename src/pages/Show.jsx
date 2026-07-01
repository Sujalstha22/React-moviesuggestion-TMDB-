import { useEffect, useState } from "react";
import { getTVDetails } from "../services/api";
import PosterCard from "../Components/PosterCard";

export default function Show() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadShows() {
      try {
        setLoading(true);

        const data = await getTVDetails();
        setShows(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load TV shows.");
      } finally {
        setLoading(false);
      }
    }

    loadShows();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink">
        <div className="flex flex-col items-center gap-5">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-charcoal-line border-t-gold-soft" />

          <p className="font-display text-xl italic text-bone">
            Loading TV shows...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6">
        <div className="max-w-md text-center">
          <h2 className="font-display text-4xl italic text-bone">
            Something went wrong
          </h2>

          <p className="mt-5 text-fog">{error}</p>

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
    <main className="min-h-screen bg-ink px-6 py-24 lg:px-10">
      {/* Header */}
      <div className="mx-auto mb-16 max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold-soft">
          Binge Worthy
        </p>

        <h1 className="font-display text-5xl italic text-bone">
          Popular TV Shows
        </h1>

        <p className="mt-5 max-w-2xl leading-8 text-fog">
          Explore today's most popular TV series from around the world. Discover
          award-winning dramas, thrilling mysteries, unforgettable comedies, and
          the latest trending shows—all powered by live TMDB data.
        </p>
      </div>

      {/* Shows Grid */}
      {shows.length ? (
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {shows.map((show) => (
            <PosterCard key={show.id} item={show} size="md" />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-3xl italic text-bone">
              No TV shows found
            </h2>

            <p className="mt-4 text-fog">Please try again later.</p>
          </div>
        </div>
      )}
    </main>
  );
}
