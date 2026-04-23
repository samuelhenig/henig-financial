export default function Page() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <header className="border-b border-[#E9DFD3] bg-[#FBF8F3]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 lg:px-14">
          <div>
            <div className="text-2xl font-semibold tracking-tight">
              Henig Financial
            </div>
            <div className="text-xs uppercase tracking-[0.26em] text-[#A86846]">
              Family Financial Coaching
            </div>
          </div>

          <a
            href="https://calendly.com/shmilyhenig/consult"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-[#1F3448] px-5 py-3 text-sm font-medium text-white hover:bg-[#2a4258]"
          >
            Book a Clarity Call
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-14 lg:py-28">
        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
            Calm financial coaching for real family life
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            Feel back in control with a clear plan built around your family.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5F6977] md:text-xl">
            Henig Financial helps families bring clarity, structure, and calm
            back into their finances through practical coaching and real-life
            guidance.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#445060]">
            No shame. No pressure. Just a clear, steady way forward.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="https://calendly.com/shmilyhenig/consult"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#1F3448] px-6 py-4 text-white hover:bg-[#2c465d]"
            >
              Schedule a Consultation
            </a>

            <a
              href="tel:+19175481646"
              className="rounded-2xl border border-[#CAD2DB] px-6 py-4 text-[#1D2834] hover:bg-[#F4EFE8]"
            >
              Call / Text: (917) 548-1646
            </a>
          </div>
        </div>

        <div className="rounded-[38px] border border-[#E8DED2] bg-[linear-gradient(135deg,#F1E7DB_0%,#E5D4C0_45%,#D1B093_100%)] p-8 shadow-[0_22px_54px_rgba(29,40,52,0.1)] md:p-10">
          <div className="rounded-[30px] bg-white/60 p-7">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A86846]">
              What we help with
            </div>

            <div className="mt-5 space-y-4 text-lg leading-7 text-[#1D2834]">
              <div>• Understanding where your money is going</div>
              <div>• Building a clear monthly plan</div>
              <div>• Reducing stress around finances</div>
              <div>• Creating more calm and control at home</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#152432] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:px-10 lg:px-14">
          <div>
            <div className="text-2xl font-semibold">Henig Financial</div>
            <p className="mt-4 leading-7 text-white/68">
              Clear plan. Calm guidance. Real family life.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D7AA87]">
              Contact
            </div>
            <div className="mt-4 space-y-3 text-white/74">
              <a href="tel:+19175481646" className="block hover:text-white">
                (917) 548-1646
              </a>
              <a
                href="mailto:info@henigfinancial.com"
                className="block hover:text-white"
              >
                info@henigfinancial.com
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D7AA87]">
              Start
            </div>
            <a
              href="https://calendly.com/shmilyhenig/consult"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-2xl bg-white px-5 py-3 text-sm font-medium text-[#152432]"
            >
              Book a Clarity Call
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}