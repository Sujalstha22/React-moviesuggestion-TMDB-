import PosterCard from "../components/PosterCard";
import { useMovieContext } from "../Contexts/useMovieContect";

export default function Favorites() {
  const { favorites } = useMovieContext();

  return (
    <main className="min-h-screen bg-ink px-6 py-24 lg:px-10">
      {/* Header */}

      <div className="mx-auto mb-16 max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold-soft">
          Your Collection
        </p>

        <h1 className="font-display text-5xl italic text-bone">Favorites</h1>

        <p className="mt-5 max-w-2xl leading-8 text-fog">
          Your personal watchlist of movies and TV shows you've saved. Build
          your own cinematic collection and come back anytime.
        </p>

        {favorites.length > 0 && (
          <p className="mt-6 text-sm uppercase tracking-[0.18em] text-gold-soft">
            {favorites.length} Saved
            {favorites.length > 1 ? " Titles" : " Title"}
          </p>
        )}
      </div>

      {/* Favorites Grid */}

      {favorites.length > 0 ? (
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {favorites.map((movie) => (
            <PosterCard key={movie.id} item={movie} size="md" />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="max-w-lg text-center">
            <div className="mb-8 text-7xl opacity-70">🎬</div>

            <h2 className="font-display text-4xl italic text-bone">
              Your collection is empty
            </h2>

            <p className="mt-6 leading-8 text-fog">
              Start exploring movies and TV shows, then click the bookmark icon
              on any poster to save it here. Your favorite films will always be
              waiting for you.
            </p>

            <a
              href="/movie"
              className="
                mt-10
                inline-flex
                items-center
                rounded-xl
                bg-gold-soft
                px-7
                py-3.5
                font-semibold
                text-ink
                transition-all
                duration-300
                hover:bg-gold
                hover:scale-105
              "
            >
              Discover Movies
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
