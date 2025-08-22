import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-16">
      {/* Hero Section */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-6 text-center">
        🎬 Movie & Show Suggestion
      </h1>
      <p className="text-gray-300 text-lg md:text-xl text-center max-w-2xl mb-10">
        Discover trending movies and TV shows, save your favorites ❤️, and
        explore endless entertainment suggestions powered by TMDB.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-6 flex-wrap justify-center">
        <Link
          to="/movie"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition"
        >
          Browse Movies 🎥
        </Link>
        <Link
          to="/show"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition"
        >
          Browse Shows 📺
        </Link>
        <Link
          to="/favorites"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition"
        >
          View Favorites ❤️
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm text-center">
        Made with 🍿 using React & TMDB API
      </footer>
    </div>
  );
};

export default Home;
