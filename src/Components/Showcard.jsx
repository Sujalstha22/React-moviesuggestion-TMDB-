import { useMovieContext } from "../Contexts/useMovieContect";

const Showcard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  };

  return (
    <div className="w-75 h-110 bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition duration-200 hover:scale-105 hover:opacity-90">
      {/* Poster */}
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-80 object-cover border-b-2 border-yellow-400"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-3 rounded-full duration-300 
            ${
              favorite
                ? "bg-white text-gray-800 hover:bg-yellow-400 "
                : " hover:bg-red-600"
            }`}
        >
          {favorite ? "💖" : "🤍"}
        </button>
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-white">{movie.name}</h3>
        <p className="text-gray-400 text-sm">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default Showcard;
