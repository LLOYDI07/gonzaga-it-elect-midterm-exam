import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";

import { searchMovies } from "./api";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    try {
      setLoading(true);

      const data = await searchMovies(search);

      setMovies(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main>
        <h2>Find your next favorite movie</h2>

        <SearchBar
          search={search}
          setSearch={setSearch}
          onSubmit={handleSearch}
        />

        {loading && <p>Loading...</p>}

        {!loading && <MovieList movies={movies} />}
      </main>
    </>
  );
}

export default App;