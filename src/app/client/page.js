import PortalSidebar from "../components/PortalSidebar";

export default function ClientPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="flex min-h-screen">

        <PortalSidebar />

        <section className="flex-1 px-10 py-8">

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-8 lg:grid-cols-[1fr_390px]">

              <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-10 shadow-sm">

                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                  Welcome Henig Family
                </div>

                <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Your Financial Clarity Dashboard
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5F6977]">
                  Simplicity brings clarity. This is your private financial command center where we organize your money, priorities, goals, and long-term direction together.
                </p>

              </div>

              <div className="rounded-[2rem] border border-[#E6D8C8] bg-[#F8F4EF] p-7 shadow-sm">

                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                  AI Financial Guide
                </div>

                <div className="rounded-2xl bg-white p-5 text-sm leading-7 text-[#5F6977]">
                  Welcome back. Ask me what to work on next, or tell me what changed in your money this month.
                </div>

                <div className="mt-5">

                  <textarea
                    placeholder="Ask your financial guide..."
                    className="h-28 w-full resize-none rounded-2xl border border-[#E6D8C8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A86846]"
                  />

                  <button className="mt-3 w-full rounded-2xl bg-[#20344C] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
                    Send Message
                  </button>

                </div>

              </div>

            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-7 shadow-sm">

                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                  Your Number
                </div>

                <div className="mt-7 text-4xl font-semibold tracking-tight">
                  —
                </div>

                <div className="mt-4 text-base text-[#5F6977]">
                  Income minus expenses
                </div>

              </div>

              <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-7 shadow-sm">

                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                  Monthly Income
                </div>

                <div className="mt-7 text-4xl font-semibold tracking-tight">
                  —
                </div>

                <div className="mt-4 text-base text-[#5F6977]">
                  All income sources combined
                </div>

              </div>

              <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-7 shadow-sm">

                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                  Monthly Expenses
                </div>

                <div className="mt-7 text-4xl font-semibold tracking-tight">
                  —
                </div>

                <div className="mt-4 text-base text-[#5F6977]">
                  Total monthly outflow
                </div>

              </div>

              <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-7 shadow-sm">

                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                  Net Worth
                </div>

                <div className="mt-7 text-4xl font-semibold tracking-tight">
                  —
                </div>

                <div className="mt-4 text-base text-[#5F6977]">
                  Assets minus liabilities
                </div>

              </div>

            </div>

            <div className="mt-8 rounded-[2rem] border border-[#E6D8C8] bg-white p-10 shadow-sm">

              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                CSIBS Method
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                Your Priority Allocation System
              </h2>

              <div className="mt-8 space-y-7">

                {[
                  ["Charity", "10–20%"],
                  ["Savings", "5–10%"],
                  ["Investments", "5–10%"],
                  ["Bills", "50–60%"],
                  ["Spending", "20–30%"],
                ].map(([name, target]) => (

                  <div key={name}>

                    <div className="mb-2 flex items-center justify-between text-sm">

                      <div>
                        <span className="font-medium">{name}</span>{" "}
                        <span className="text-[#5F6977]">
                          Target: {target}
                        </span>
                      </div>

                      <div>0%</div>

                    </div>

                    <div className="h-3 rounded-full bg-[#EDE5DB]">
                      <div className="h-3 w-0 rounded-full bg-[#7CA982]" />
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
