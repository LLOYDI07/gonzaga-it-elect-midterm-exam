function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl shadow-lg shadow-blue-600/20">
            🎬
          </div>

          <div>
            <h1 className="text-lg font-bold">
              Movie Finder
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Discover something amazing
            </p>
          </div>

        </div>

        <div className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-400">
          🍿 Movies
        </div>

      </div>

    </header>
  );
}

export default Header;