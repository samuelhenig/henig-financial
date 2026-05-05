export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e6ded6] bg-[#f7f3ee]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        
        {/* Logo */}
        <a href="/" className="leading-tight">
          <div className="text-2xl font-bold tracking-tight text-[#172333] md:text-4xl">
            Henig<br />Financial
          </div>
          <div className="mt-1 text-[10px] font-semibold tracking-[0.32em] text-[#a5755c] md:text-sm">
            FAMILY<br />FINANCIAL<br />COACHING
          </div>
        </a>

        {/* Desktop Buttons */}
        <nav className="hidden items-center gap-4 md:flex">
          <a
            href="/articles"
            className="rounded-3xl border border-[#d8d0c8] px-8 py-5 text-lg font-semibold text-[#172333] transition hover:bg-white"
          >
            Articles
          </a>

          <a
            href="/client"
            className="rounded-3xl border border-[#d8d0c8] px-8 py-5 text-lg font-semibold text-[#172333] transition hover:bg-white"
          >
            Client Login
          </a>

          <a
            href="/clarity-call"
            className="rounded-3xl bg-[#172f46] px-8 py-5 text-lg font-semibold text-white transition hover:bg-[#102235]"
          >
            Book a Clarity Call
          </a>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/clarity-call"
            className="rounded-2xl bg-[#172f46] px-4 py-3 text-sm font-semibold text-white"
          >
            Book Call
          </a>

          <details className="relative">
            <summary className="list-none rounded-2xl border border-[#d8d0c8] px-4 py-3 text-sm font-semibold text-[#172333]">
              Menu
            </summary>

            <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-2xl border border-[#e6ded6] bg-[#f7f3ee] shadow-lg">
              <a
                href="/articles"
                className="block border-b border-[#e6ded6] px-5 py-4 text-sm font-semibold text-[#172333]"
              >
                Articles
              </a>

              <a
                href="/client"
                className="block px-5 py-4 text-sm font-semibold text-[#172333]"
              >
                Client Login
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
