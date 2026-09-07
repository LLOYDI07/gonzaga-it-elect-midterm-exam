function SearchBar({ search, setSearch, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
    >

      <div className="relative flex-1">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500">
          🔍
        </span>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />

      </div>

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0"
      >
        Search
      </button>

    </form>
  );
}

export default SearchBar;