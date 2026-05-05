import { articles } from "@/app/data/articles";

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <section className="px-6 py-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
              Articles
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Practical financial guidance for real family life
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5F6977]">
              Clear, simple, and practical insights to help you take control of your money without feeling overwhelmed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((item) => (
              <div
                key={item.slug}
                className="rounded-[28px] border border-[#E8DED2] bg-white p-7 shadow-[0_14px_34px_rgba(29,40,52,0.06)]"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#A86846]">
                  <span>{item.readTime}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.author}</span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold leading-snug">
                  {item.title}
                </h2>

                <p className="mt-4 leading-7 text-[#5F6977]">
                  {item.description}
                </p>

                <a
                  href={item.href}
                  className="mt-6 inline-block font-medium text-[#1F3448] hover:underline"
                >
                  Read article →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
