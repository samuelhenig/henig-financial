import Header from "../../components/Header";
import { articles } from "../../data/articles";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <Header />

      <section className="px-6 py-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-3xl">
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

          <p className="mt-6 text-lg leading-8 text-[#5F6977]">
            {article.intro}
          </p>

          <div className="mt-8 space-y-6 text-lg leading-8 text-[#1D2834]">
            {article.content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2 key={index} className="mt-10 text-2xl font-semibold">
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
        </div>
      </section>
    </main>
  );
}
