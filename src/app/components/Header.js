export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e6ded6] bg-[#f7f3ee]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        
        {/* Logo */}
        <a href="/" className="leading-tight">
          <div className="text-3xl font-bold tracking-tight text-[#172333] md:text-4xl">
            Henig<br />Financial
          </div>
          <div className="mt-1 text-xs font-semibold tracking-[0.35em] text-[#a5755c] md:text-sm">
            FAMILY<br />FINANCIAL<br />COACHING
          </div>
        </a>

        {/* Desktop Buttons */}
        <nav className="hidden items-center gap-3 md:flex">
          <a href="/articles" className="rounded-3xl border border-[#d8d0c8] px-6 py-4 text-base font-semibold text-[#172333] transition hover:bg-white">
            Articles
          </a>

          <a href="/client" className="rounded-3xl border border-[#d8d0c8] px-6 py-4 text-base font-semibold text-[#172333] transition hover:bg-white">
            Client Login
          </a>

          <a href="/clarity-call" className="rounded-3xl bg-[#172f46] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#102235]">
            Book a Clarity Call
          </a>
        </nav>

        {/* Mobile Button */}
        <a href="/clarity-call" className="rounded-2xl bg-[#172f46] px-4 py-3 text-sm font-semibold leading-tight text-white md:hidden">
          Book<br />Call
        </a>
      </div>

      {/* Mobile Links */}
      <div className="flex border-t border-[#e6ded6] md:hidden">
        <a href="/articles" className="flex-1 border-r border-[#e6ded6] py-3 text-center text-sm font-semibold text-[#172333]">
          Articles
        </a>

        <a href="/client" className="flex-1 py-3 text-center text-sm font-semibold text-[#172333]">
          Client Login
        </a>
      </div>
    </header>
  );
}
