export default function Header() {
  return (
    <header className="border-b border-[#E9DFD3] bg-[#FBF8F3]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 lg:px-14">
        
        {/* Logo */}
        <div>
          <a href="/" className="text-2xl font-semibold tracking-tight">
            Henig Financial
          </a>
          <div className="text-xs uppercase tracking-[0.26em] text-[#A86846]">
            Family Financial Coaching
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/articles"
            className="rounded-2xl border border-[#CAD2DB] px-5 py-3 text-sm font-medium text-[#1D2834] hover:bg-[#F4EFE8]"
          >
            Articles
          </a>

          <a
            href="/login"
            className="rounded-2xl border border-[#CAD2DB] px-5 py-3 text-sm font-medium text-[#1D2834] hover:bg-[#F4EFE8]"
          >
            Client Login
          </a>

          <a
            href="https://calendly.com/shmilyhenig/consult"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-[#1F3448] px-5 py-3 text-sm font-medium text-white hover:bg-[#2a4258]"
          >
            Book a Clarity Call
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://calendly.com/shmilyhenig/consult"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-[#1F3448] px-4 py-2 text-sm font-medium text-white"
          >
            Book Call
          </a>
        </div>
      </div>
    </header>
  );
}
