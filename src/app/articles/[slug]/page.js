import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { articles } from "../../data/articles";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | Henig Financial",
    };
  }

  return {
    title: `${article.title} | Henig Financial`,
    description: article.description,
    alternates: {
      canonical: `https://www.henigfinancial.com/articles/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | Henig Financial`,
      description: article.description,
      url: `https://www.henigfinancial.com/articles/${article.slug}`,
      siteName: "Henig Financial",
      type: "article",
      publishedTime: article.publishedDate,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <Header />

      <section className="px-6 py-14 md:px-10 lg:px-14">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[34px] border border-[#E8DED2] bg-white px-6 py-10 shadow-[0_18px_48px_rgba(29,40,52,0.06)] md:px-12 md:py-14">
            <div className="mb-8 flex gap-4 text-sm">
              <a href="/" className="text-[#A86846] hover:underline">
                ← Home
              </a>
              <a href="/articles" className="text-[#A86846] hover:underline">
                Articles
              </a>
            </div>

            <div className="text-sm text-[#A86846]">
              {article.readTime} • {article.date} • {article.author}
            </div>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              {article.title}
            </h1>

            <p className="mt-6 text-xl leading-9 text-[#5F6977]">
              {article.intro}
            </p>

            <div className="mt-10 space-y-7 text-lg leading-9 text-[#1D2834]">
              {article.content.map((block, index) => {
                if (index === 2) {
                  return (
                    <div key={index}>
                      {block.type === "heading" ? (
                        <h2 className="mt-12 text-2xl font-semibold">
                          {block.text}
                        </h2>
                      ) : (
                        <p>{block.text}</p>
                      )}

                      <div className="mt-8 rounded-3xl border border-[#E8DED2] bg-[#FBF8F3] p-7 text-center shadow-sm">
                        <p className="text-lg font-semibold">
                          Feeling overwhelmed with your finances?
                        </p>
                        <p className="mt-2 text-[#5F6977]">
                          You don’t need to figure this out alone.
                        </p>

                        <a
                          href="https://calendly.com/shmilyhenig/consult"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-block rounded-2xl bg-[#1F3448] px-6 py-3 text-white hover:bg-[#2c465d]"
                        >
                          Book a free clarity call
                        </a>
                      </div>
                    </div>
                  );
                }

                if (block.type === "heading") {
                  return (
                    <h2 key={index} className="mt-12 text-2xl font-semibold">
                      {block.text}
                    </h2>
                  );
                }

                return <p key={index}>{block.text}</p>;
              })}
            </div>

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

            {relatedArticles.length > 0 && (
              <div className="mt-16 border-t border-[#E8DED2] pt-10">
                <h2 className="text-2xl font-semibold">Related articles</h2>

                <div className="mt-6 space-y-4">
                  {relatedArticles.map((related) => (
                    <a
                      key={related.slug}
                      href={related.href}
                      className="block rounded-2xl border border-[#E8DED2] bg-[#FBF8F3] p-5 hover:bg-[#F4EFE8]"
                    >
                      <div className="text-sm text-[#A86846]">
                        {related.readTime} • {related.date}
                      </div>

                      <div className="mt-2 text-lg font-semibold text-[#1D2834]">
                        {related.title}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-[#5F6977]">
                        {related.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
