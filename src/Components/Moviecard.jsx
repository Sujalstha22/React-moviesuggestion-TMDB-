const Moviecard = ({ movie }) => {
  function onFavoriteClick() {
    alert("Favourite button clicked");
  }

  return (
    <div className="w-75 h-110 bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition duration-200 hover:scale-105 hover:opacity-60">
      {/* Poster */}
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-80 object-fill border-b-2 border-yellow-400"
        />
        <button
          onClick={onFavoriteClick}
          className="absolute top-3 right-3 bg-white-100  rounded-full p-2 hover:bg-red-500 hover:text-white transition"
        >
          🤍
        </button>
      </div>

      {/* Info */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default Moviecard;
