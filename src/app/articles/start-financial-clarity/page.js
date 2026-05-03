import Header from "../../components/Header";

export default function ArticlePage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">

      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <section className="px-6 py-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-3xl">

          {/* Back Links */}
          <div className="mb-8 flex gap-4 text-sm">
            <a href="/" className="text-[#A86846] hover:underline">
              ← Home
            </a>
            <a href="/#articles" className="text-[#A86846] hover:underline">
              Articles
            </a>
          </div>

          {/* Meta */}
          <div className="text-sm text-[#A86846]">
            3 min read • Shmily Henig, Founder
          </div>

          {/* Title */}
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            How to Start Getting Financial Clarity Without Feeling Overwhelmed
          </h1>

          {/* Intro */}
          <p className="mt-6 text-lg leading-8 text-[#5F6977]">
            Most families don’t have a money problem. They have a clarity problem.
          </p>

          {/* Body */}
          <div className="mt-8 space-y-6 text-lg leading-8 text-[#1D2834]">
            <p>
              Money feels stressful when everything is scattered. Bills, spending,
              savings, and goals all live in different places. There’s no clear
              picture — so everything feels heavy.
            </p>

            <p>
              The goal is not to control everything overnight. The goal is to
              simply start seeing clearly.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">
              Step 1: See what’s actually happening
            </h2>

            <p>
              Before fixing anything, you need to understand where your money is
              going. Not roughly. Not in your head. Clearly.
            </p>

            <p>
              This alone starts to reduce stress, because uncertainty disappears.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">
              Step 2: Build a simple structure
            </h2>

            <p>
              Once things are visible, the next step is giving your money
              direction. Categories. Priorities. A plan.
            </p>

            <p>
              Not a perfect plan — just a clear one.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">
              Step 3: Create calm through consistency
            </h2>

            <p>
              Financial clarity is not a one-time fix. It’s something that builds
              over time.
            </p>

            <p>
              Small, consistent actions create a sense of control — and that’s
              what most families are really looking for.
            </p>

            <p className="mt-10">
              If you’re feeling overwhelmed, you’re not behind. You just need a
              clearer path forward.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <a
              href="https://calendly.com/shmilyhenig/consult"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#1F3448] px-6 py-4 text-white hover:bg-[#2c465d]"
            >
              Schedule a Clarity Call
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}
