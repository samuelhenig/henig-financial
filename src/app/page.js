export default function Page() {
  const articles = [
    {
      title: "Why Budgeting Feels So Hard for Normal Families",
      description:
        "A practical look at why most budgets fail and how to build a plan that actually fits real family life.",
      readTime: "5 min read",
      href: "/articles/why-budgeting-feels-hard",
    },
    {
      title: "The Difference Between Knowing Your Numbers and Feeling in Control",
      description:
        "Knowing what comes in and goes out is only step one. Real calm comes from having a clear system.",
      readTime: "4 min read",
      href: "/articles/knowing-your-numbers",
    },
    {
      title: "How to Start Getting Financial Clarity Without Feeling Overwhelmed",
      description:
        "A simple first step for families who want more control but do not know where to begin.",
      readTime: "3 min read",
      href: "/articles/start-financial-clarity",
    },
  ];

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

          <div className="flex items-center gap-3">
            <a
              href="#articles"
              className="hidden rounded-2xl border border-[#CAD2DB] px-5 py-3 text-sm font-medium text-[#1D2834] hover:bg-[#F4EFE8] md:inline-block"
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
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-14 lg:py-28">
        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
            Calm financial coaching for real family life
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
            Take back control with a clear plan built around your family.
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

      <section
        id="articles"
        className="border-t border-[#E9DFD3] bg-white/45 px-6 py-20 md:px-10 lg:px-14"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
              Articles & Financial Guidance
            </div>

            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Clear money guidance you can read at your own pace.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#5F6977]">
              Practical articles for families who want more clarity, less
              stress, and a better way to handle money at home.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.title}
                className="rounded-[28px] border border-[#E8DED2] bg-[#FBF8F3] p-7 shadow-[0_14px_34px_rgba(29,40,52,0.06)]"
              >
                <div className="text-sm font-medium text-[#A86846]">
                  {article.readTime}
                </div>

                <h3 className="mt-4 text-2xl font-semibold leading-snug">
                  {article.title}
                </h3>

                <p className="mt-4 leading-7 text-[#5F6977]">
                  {article.description}
                </p>

                <a
                  href={article.href}
                  className="mt-6 inline-block font-medium text-[#1F3448] hover:underline"
                >
                  Read article →
                </a>
              </article>
            ))}
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
