import React from "react";

const Favorites = () => {
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
