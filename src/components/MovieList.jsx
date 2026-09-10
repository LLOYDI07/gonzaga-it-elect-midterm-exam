import MovieCard from "./MovieCard";

function MovieList({ movies, onSelectMovie }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
        <div className="text-5xl">
          🎬
        </div>

        <h3 className="mt-4 text-xl font-bold">
          No movies found
        </h3>

        <p className="mt-2 text-slate-500">
          Try searching for another movie.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </div>
  );
}

export default MovieList;