function MovieCard({ movie }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-blue-500/10">

      {/* Poster */}
      <div className="relative overflow-hidden">

        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-[2/3] items-center justify-center bg-slate-800 text-slate-500">
            No Image
          </div>
        )}

        {/* Rating */}
        <div className="absolute right-2 top-2 rounded-lg bg-black/80 px-2 py-1 text-xs font-bold text-yellow-400 backdrop-blur">
          ⭐ {movie.vote_average?.toFixed(1)}
        </div>

        {/* Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900 to-transparent opacity-80">
        </div>

      </div>

      {/* Information */}
      <div className="p-4">

        <h3 className="truncate font-bold text-white">
          {movie.title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "Unknown year"}
        </p>

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-400">
          {movie.overview || "No description available."}
        </p>

      </div>

    </article>
  );
}

export default MovieCard;