import React from "react";

import Moviecard from "../Components/Moviecard";
import { useMovieContext } from "../Contexts/useMovieContect.js";

const Favorites = () => {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="min-h-screen bg-gray-900 px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 text-center mb-6">
          Your Favorites
        </h2>
        <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((movie) => (
            <Moviecard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
        No Favorites Yet
      </h2>
      <p className="text-gray-300 text-lg">
        Start adding movies to your Favorites ❤️
      </p>
    </div>
  );
};

export default Favorites;
