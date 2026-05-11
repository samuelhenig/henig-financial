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

          <h2 className="text-2xl font-semibold">
            Add Income Source
          </h2>

          <p className="mt-2 text-[#5F6977]">
            Start by adding one income source.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Income Source Name
              </label>

              <input
                type="text"
                placeholder="Primary Job"
                className="w-full rounded-2xl border border-[#D8DDE3] bg-white px-4 py-3 outline-none transition focus:border-[#A86846]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                className="w-full rounded-2xl border border-[#D8DDE3] bg-white px-4 py-3 outline-none transition focus:border-[#A86846]"
              >
                <option>Salary</option>
                <option>Business</option>
                <option>Self-Employed</option>
                <option>Side Hustle</option>
                <option>Rental</option>
                <option>Government</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Amount
              </label>

              <input
                type="number"
                placeholder="5000"
                className="w-full rounded-2xl border border-[#D8DDE3] bg-white px-4 py-3 outline-none transition focus:border-[#A86846]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Frequency
              </label>

              <select
                className="w-full rounded-2xl border border-[#D8DDE3] bg-white px-4 py-3 outline-none transition focus:border-[#A86846]"
              >
                <option>Weekly</option>
                <option>Biweekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>

          </div>

          <button
            className="mt-8 rounded-2xl bg-[#1D2834] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Add Income Source
          </button>

          <div className="mt-12">

            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-semibold">
                Your Income Sources
              </h3>

              <div className="text-sm text-[#5F6977]">
                0 sources added
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#E6D8C8]">

              <div className="grid grid-cols-5 border-b border-[#EFE5D8] bg-[#FAF6F1] px-6 py-4 text-sm font-semibold text-[#5F6977]">
                <div>Source</div>
                <div>Category</div>
                <div>Monthly Amount</div>
                <div>Frequency</div>
                <div>Actions</div>
              </div>

              <div className="grid grid-cols-5 items-center px-6 py-5 text-sm">

                <div className="font-medium text-[#1D2834]">
                  No income sources yet
                </div>

                <div>-</div>
                <div>-</div>
                <div>-</div>

                <div className="text-[#A86846]">
                  Add your first source
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
