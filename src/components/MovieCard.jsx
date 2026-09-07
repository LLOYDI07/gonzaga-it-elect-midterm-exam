function MovieCard({ movie, onMovieClick }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "Unknown";

  return (
    <article
      className="movie-card"
      onClick={() => onMovieClick(movie)}
    >
      <img
        src={imageUrl}
        alt={movie.title}
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span>
            ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
          </span>

          <span>{releaseYear}</span>
        </div>

        <p>
          {movie.overview
            ? movie.overview
            : "No overview available."}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;