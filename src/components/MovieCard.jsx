function MovieCard({ movie }) {
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Poster";

    return (
        <article className="movie-card">
            <img
                src={imageUrl}
                alt={movie.title}
            />

            <h3>{movie.title}</h3>

            <p>
                ⭐ {movie.vote_average.toFixed(1)}
            </p>

            <p>
                {movie.overview}
            </p>
        </article>
    );
}

export default MovieCard;