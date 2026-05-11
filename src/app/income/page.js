export default function IncomePage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
            Income
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">
            Income Sources
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5F6977]">
            Track every source of income flowing into your household.
          </p>
        </div>

        <section className="rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Add Income Source</h2>

          <p className="mt-2 text-[#5F6977]">
            Start by adding one income source.
          </p>
        </section>
      </div>
    </main>
  );
}
