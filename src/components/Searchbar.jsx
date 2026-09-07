function SearchBar({ search, setSearch, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="search-bar"
      id="search"
    >
      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;