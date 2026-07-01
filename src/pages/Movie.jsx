import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";
import PosterCard from "../Components/PosterCard";

export default function Movie({ searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink">
        <div className="flex flex-col items-center gap-5">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-charcoal-line border-t-gold-soft" />

          <p className="font-display text-xl italic text-bone">
            Loading movies...
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
          Discover
        </p>

        <h1 className="font-display text-5xl italic text-bone">
          Popular Movies
        </h1>

        <p className="mt-5 max-w-2xl leading-8 text-fog">
          Browse the latest popular films from around the world. Updated
          regularly using live data from TMDB.
        </p>
      </div>

      {/* Movies */}

      {filteredMovies.length ? (
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {filteredMovies.map((movie) => (
            <PosterCard key={movie.id} item={movie} size="md" />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-3xl italic text-bone">
              No movies found
            </h2>

            <p className="mt-4 text-fog">
              Try searching with a different title.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
