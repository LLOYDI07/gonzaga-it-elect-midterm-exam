import MovieCard from "./MovieCard";

function MovieList({ movies, onMovieClick }) {
  if (!movies || movies.length === 0) {
    return (
      <p className="no-results">
        No movies found.
      </p>
    );
  }

  return (
    <section className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={onMovieClick}
        />
      ))}
    </section>
  );
}

export default MovieList;