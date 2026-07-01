import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const classics = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  },
  {
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
  {
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  },
  {
    title: "Inception",
    year: 2010,
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
  {
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
];

const Home = () => {
  const [currentMovie, setCurrentMovie] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % classics.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0B0F19] text-white overflow-x-hidden">
      {/* ================= HERO ================= */}

      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-blue-500/10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center px-8 py-20 relative z-10">
          {/* LEFT */}

          <div>
            <p className="uppercase tracking-[6px] text-yellow-400 font-semibold mb-4">
              Welcome to CineVerse
            </p>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              Discover
              <span className="text-yellow-400"> Movies </span>
              Worth Watching.
            </h1>

            <p className="text-gray-300 mt-8 text-lg leading-8 max-w-xl">
              Explore blockbuster hits, timeless classics, award-winning
              masterpieces and trending TV shows from around the world. Search
              thousands of titles and discover your next favorite movie powered
              by TMDB.
            </p>

            <div className="flex gap-5 mt-10">
              <Link
                to="/movie"
                className="px-8 py-4 bg-yellow-400 rounded-xl text-black font-bold hover:bg-yellow-300 transition duration-300 shadow-xl"
              >
                Explore Collection →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16">
              <div>
                <h2 className="text-4xl font-bold text-yellow-400">10K+</h2>
                <p className="text-gray-400 mt-2">Movies</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-yellow-400">5K+</h2>
                <p className="text-gray-400 mt-2">TV Shows</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-yellow-400">Daily</h2>
                <p className="text-gray-400 mt-2">Updated</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">
            <div className="absolute w-80 h-80 rounded-full bg-yellow-500/20 blur-[120px]" />

            <div className="relative">
              <div className="bg-[#151C2D] rounded-3xl overflow-hidden shadow-2xl w-[320px] transition-all duration-700">
                <img
                  src={classics[currentMovie].poster}
                  alt={classics[currentMovie].title}
                  className="w-full h-[480px] object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold">
                    {classics[currentMovie].title}
                  </h2>

                  <div className="flex justify-between mt-4 text-gray-300">
                    <span>{classics[currentMovie].year}</span>

                    <span className="text-yellow-400">
                      ⭐ {classics[currentMovie].rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Posters */}

              <img
                src={classics[(currentMovie + 1) % classics.length].poster}
                alt=""
                className="hidden lg:block absolute -left-24 top-10 w-32 rounded-2xl opacity-70 rotate-[-12deg] shadow-xl"
              />

              <img
                src={classics[(currentMovie + 2) % classics.length].poster}
                alt=""
                className="hidden lg:block absolute -right-24 bottom-10 w-32 rounded-2xl opacity-70 rotate-[10deg] shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ================= ABOUT ================= */}

      <section className="py-24 px-8 bg-[#111827]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[4px] text-yellow-400 font-semibold">
              About CineVerse
            </p>

            <h2 className="text-5xl font-bold mt-4">
              Your Ultimate Movie Discovery Platform
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto mt-6 text-lg leading-8">
              CineVerse is built for movie lovers who enjoy discovering
              unforgettable films and trending TV shows. Whether you're looking
              for the latest blockbuster or a timeless classic, CineVerse helps
              you explore entertainment from around the world through a clean
              and intuitive experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#182234] p-8 rounded-3xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-6">🎬</div>

              <h3 className="text-2xl font-bold">Popular Movies</h3>

              <p className="text-gray-400 mt-4 leading-7">
                Browse thousands of trending and highly rated movies updated
                daily from The Movie Database.
              </p>
            </div>

            <div className="bg-[#182234] p-8 rounded-3xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-6">📺</div>

              <h3 className="text-2xl font-bold">TV Shows</h3>

              <p className="text-gray-400 mt-4 leading-7">
                Explore the most popular television series from every genre and
                discover your next binge-worthy show.
              </p>
            </div>

            <div className="bg-[#182234] p-8 rounded-3xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-6">❤️</div>

              <h3 className="text-2xl font-bold">Favorites</h3>

              <p className="text-gray-400 mt-4 leading-7">
                Save your favorite movies and TV shows so you can revisit them
                anytime with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TMDB ================= */}

      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#1A2438] to-[#111827] rounded-3xl p-12 border border-gray-800">
          <p className="uppercase tracking-[4px] text-yellow-400 font-semibold">
            Powered By
          </p>

          <h2 className="text-4xl font-bold mt-4">The Movie Database (TMDB)</h2>

          <p className="text-gray-400 mt-8 leading-8 text-lg">
            This website uses the official TMDB API to fetch real-time
            information about movies and TV shows including posters, ratings,
            release dates, genres, descriptions, and trending content. The API
            powers movie search, popular movies, television series, and
            recommendation features throughout the platform.
          </p>

          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition"
          >
            Visit TMDB →
          </a>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}

      <section className="py-24 px-8 text-center bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10">
        <h2 className="text-5xl font-bold">Ready for Your Next Movie Night?</h2>

        <p className="text-gray-400 mt-8 text-xl max-w-3xl mx-auto leading-8">
          Browse thousands of movies and TV shows, discover hidden gems, and
          build your own collection of favorites.
        </p>

        <Link
          to="/movie"
          className="inline-block mt-12 px-10 py-5 bg-yellow-400 text-black rounded-xl font-bold text-lg hover:bg-yellow-300 transition duration-300"
        >
          Explore Collection →
        </Link>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-gray-800 py-10 text-center">
        <h3 className="text-2xl font-bold text-yellow-400">CineVerse</h3>

        <p className="text-gray-500 mt-4">Discover. Watch. Repeat.</p>

        <p className="text-gray-600 mt-8 text-sm">
          © {new Date().getFullYear()} CineVerse. Built with React & TMDB API.
        </p>
      </footer>
    </div>
  );
};

export default Home;
