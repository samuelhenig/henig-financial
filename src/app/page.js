"use client";

import { useState } from "react";

export default function Page() {
  const [household, setHousehold] = useState(5);
  const [state, setState] = useState("NJ");
  const [timeView, setTimeView] = useState("annual");

  const dash = "—";

  const categories = [
    "Housing",
    "Food & groceries",
    "Tuition & childcare",
    "Debt & savings",
    "Healthcare",
    "Transportation",
    "Clothing / simchas / misc.",
  ];

  const resources = [
    {
      title: "Monthly Budget Worksheet",
      text: "A simple planning template to help families see where the money is actually going.",
      pdf: "/resources/monthly-budget-worksheet.pdf",
      excel: "/resources/monthly-budget-worksheet.xlsx",
    },
    {
      title: "Tuition Planning Guide",
      text: "A practical guide for thinking ahead around one of the biggest recurring expenses.",
      pdf: "/resources/tuition-planning-guide.pdf",
      excel: "/resources/tuition-planning-guide.xlsx",
    },
    {
      title: "Yom Tov Spending Planner",
      text: "A calmer way to prepare seasonal spending before it spills into everything else.",
      pdf: "/resources/yom-tov-spending-planner.pdf",
      excel: "/resources/yom-tov-spending-planner.xlsx",
    },
    {
      title: "Debt Reset Checklist",
      text: "A grounded first-step guide for families who need a steadier path forward.",
      pdf: "/resources/debt-reset-checklist.pdf",
      excel: "/resources/debt-reset-checklist.xlsx",
    },
  ];

  const faqItems = [
    {
      q: "Do we need to be in crisis before reaching out?",
      a: "Not at all. Many families come because they want structure before the pressure grows further.",
    },
    {
      q: "Will you force us into a strict system?",
      a: "No. The point is to build around your actual numbers, values, and constraints.",
    },
    {
      q: "Is this only for families with debt?",
      a: "No. Some need help with debt, while others want more clarity around cash flow, planning, and monthly structure.",
    },
    {
      q: "Do both spouses need to be involved?",
      a: "Whenever possible, yes. The strongest results usually happen when both spouses understand the plan and feel part of it.",
    },
  ];

  const stories = [
    {
      quote:
        "For the first time, we felt like someone actually understood our family before giving advice.",
      label: "Young family with rising expenses",
      outcome: "More breathing room",
    },
    {
      quote:
        "We stopped reacting to every month and started seeing what was really happening in our finances.",
      label: "Household trying to steady cash flow",
      outcome: "More clarity",
    },
    {
      quote:
        "The biggest shift was not only the numbers. It was the calmer conversations at home.",
      label: "Couple carrying debt stress",
      outcome: "Less tension",
    },
  ];

  const timeLabel =
    timeView === "annual"
      ? "annual"
      : timeView === "monthly"
      ? "monthly"
      : "weekly";

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <header className="sticky top-0 z-50 border-b border-[#E9DFD3] bg-[rgba(251,248,243,0.94)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 lg:px-14">
          <div>
            <div className="text-2xl font-semibold tracking-tight">
              Henig Financial
            </div>
            <div className="text-xs uppercase tracking-[0.26em] text-[#A86846]">
              Family Financial Guidance
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-[#4E5967] md:flex">
            <a href="#why" className="hover:text-[#1D2834]">
              Why Henig Financial
            </a>
            <a href="#benchmarks" className="hover:text-[#1D2834]">
              Benchmarks
            </a>
            <a href="#process" className="hover:text-[#1D2834]">
              Process
            </a>
            <a href="#resources" className="hover:text-[#1D2834]">
              Resources
            </a>
            <a href="#stories" className="hover:text-[#1D2834]">
              Stories
            </a>
            <a href="#faq" className="hover:text-[#1D2834]">
              FAQ
            </a>
          </nav>

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

      <section className="bg-[#FBF8F3]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-14 lg:py-16">
          <div className="max-w-2xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
              Private guidance for real family life
            </div>

            <h1 className="text-5xl font-semibold leading-[1.01] tracking-tight md:text-7xl">
              Financial clarity with the warmth of a guide and the precision of a{" "}
              <span className="text-[#B57652]">real plan.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#5F6977] md:text-xl">
              We help families build calm, structure, and forward movement by
              working from their actual numbers, actual pressure points, and
              actual goals.
            </p>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#445060]">
              No generic systems. No financial shame. Just thoughtful guidance
              shaped around the way your family actually lives.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://calendly.com/shmilyhenig/consult"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-[#1F3448] px-6 py-4 text-white hover:bg-[#2c465d]"
              >
                Schedule a Consultation
              </a>
              <a
                href="#benchmarks"
                className="rounded-2xl border border-[#CAD2DB] px-6 py-4 text-[#1D2834] hover:bg-[#F4EFE8]"
              >
                Explore Family Benchmarks
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <div className="rounded-full border border-[#E8DDD1] bg-white px-4 py-2 text-sm text-[#4E5967]">
                Tailored, not cookie-cutter
              </div>
              <div className="rounded-full border border-[#E8DDD1] bg-white px-4 py-2 text-sm text-[#4E5967]">
                Built from actual numbers
              </div>
              <div className="rounded-full border border-[#E8DDD1] bg-white px-4 py-2 text-sm text-[#4E5967]">
                Practical plans, not pressure
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[38px] border border-[#E8DED2] bg-[linear-gradient(135deg,#F1E7DB_0%,#E5D4C0_45%,#D1B093_100%)] shadow-[0_22px_54px_rgba(29,40,52,0.1)]">
              <div className="grid min-h-[620px] grid-rows-[1fr_auto]">
                <div className="relative px-8 pt-8 md:px-10 md:pt-10">
                  <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/50 bg-white/25 md:h-32 md:w-32" />
                  <div className="absolute left-8 top-20 h-16 w-16 rounded-full border border-white/40 bg-[#F7F0E7]/60 md:h-20 md:w-20" />

                  <div className="mx-auto mt-16 max-w-[520px] rounded-[32px] border border-white/45 bg-[rgba(255,255,255,0.38)] p-6 md:mt-20 md:p-7">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-[24px] bg-[rgba(251,248,243,0.94)] p-5 shadow-sm">
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#38526B]">
                          Signature promise
                        </div>
                        <div className="mt-3 text-2xl font-semibold leading-tight text-[#1D2834]">
                          We put ourselves in your spreadsheet before putting
                          you on ours.
                        </div>
                      </div>

                      <div className="rounded-[24px] bg-[#1F3448] p-5 text-white shadow-sm">
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D7AA87]">
                          What families want most
                        </div>
                        <div className="mt-3 space-y-2 text-white/82">
                          <div>• More breathing room</div>
                          <div>• Less tension around money</div>
                          <div>• A clearer monthly plan</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 border-t border-white/30 bg-[rgba(255,255,255,0.28)] px-6 py-6 md:grid-cols-3 md:px-8">
                  {[
                    [
                      "Awareness first",
                      "Understand where the pressure really lives.",
                    ],
                    [
                      "Benchmarks with dignity",
                      "Context without comparison or shame.",
                    ],
                    [
                      "Guidance that holds",
                      "A plan your family can actually live with.",
                    ],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="rounded-[22px] border border-white/40 bg-white/55 p-4 shadow-sm"
                    >
                      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#A86846]">
                        {title}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-[#4C5866]">
                        {text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5EFE7]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-4 md:px-10 lg:px-14">
          {[
            [
              "Tailored family guidance",
              "We build around your life, not a template.",
            ],
            [
              "Real numbers, real clarity",
              "We work from actual income, expenses, and pressure points.",
            ],
            [
              "Practical plans, not pressure",
              "The goal is progress your family can actually sustain.",
            ],
            ["Respectful and confidential", "Trust comes before strategy."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-[28px] border border-[#E9DED2] bg-[#F7F1E8] p-7 shadow-[0_14px_32px_rgba(29,40,52,0.05)]"
            >
              <div className="mb-5 h-12 w-12 rounded-2xl bg-[#F3E5D9]" />
              <h3 className="text-xl font-semibold text-[#1D2834]">{title}</h3>
              <p className="mt-3 leading-7 text-[#5F6977]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="why" className="bg-[#FBF8F3]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                Why Henig Financial
              </div>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#1D2834] md:text-5xl">
                A more personal and practical way to guide family finances.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="rounded-[34px] border border-[#E7DDD1] bg-white p-8 shadow-[0_16px_34px_rgba(29,40,52,0.05)] md:p-10">
                <p className="text-lg leading-8 text-[#5F6977]">
                  At Henig Financial, financial guidance begins with
                  understanding, not assumptions. Before building any plan, we
                  step into your family’s reality—income, obligations, habits,
                  goals, and pressure points—so the path feels more honest, more
                  tailored, and more likely to last.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {[
                    "We put ourselves in your spreadsheet before putting you on ours.",
                    "We understand real family pressures.",
                    "We build plans people can actually live with.",
                    "We focus on clarity, dignity, and follow-through.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[#F0E6DA] bg-[#FCFAF7] px-4 py-4 text-[#4C5866]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[34px] border border-[#E7DDD1] bg-[#1F3448] p-8 text-white shadow-[0_16px_34px_rgba(29,40,52,0.08)] md:p-10">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#D7AA87]">
                  What changes
                </div>
                <div className="space-y-5">
                  {[
                    [
                      "Before",
                      "Overwhelm, uncertainty, emotional spending, and money tension.",
                    ],
                    [
                      "Middle",
                      "Clarity, tradeoffs, better communication, and practical priorities.",
                    ],
                    [
                      "After",
                      "A steadier plan, more confidence, and a calmer home.",
                    ],
                  ].map(([label, text]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D7AA87]">
                        {label}
                      </div>
                      <div className="mt-2 text-white/80">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benchmarks" className="bg-[#F6F0E8]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
              Signature feature
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#1D2834] md:text-5xl">
              Family Benchmarks
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5F6977]">
              How similar households typically earn and spend across key
              categories.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-[38px] border border-[#E4DACC] bg-white shadow-[0_24px_60px_rgba(29,40,52,0.1)]">
            <div className="border-b border-[#ECE2D6] bg-[#FBF8F3] p-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-[#E8DDD1] bg-white px-4 py-2 text-sm text-[#4E5967]">
                  Household size:
                  <select
                    value={household}
                    onChange={(e) => setHousehold(Number(e.target.value))}
                    className="ml-2 bg-transparent outline-none"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-full border border-[#E8DDD1] bg-white px-4 py-2 text-sm text-[#4E5967]">
                  State:
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="ml-2 bg-transparent outline-none"
                  >
                    <option value="NJ">NJ</option>
                    <option value="NY">NY</option>
                  </select>
                </div>

                <div className="flex overflow-hidden rounded-full border border-[#E8DDD1] bg-white">
                  {["annual", "monthly", "weekly"].map((view) => (
                    <button
                      key={view}
                      onClick={() => setTimeView(view)}
                      className={`px-4 py-2 text-sm ${
                        timeView === view
                          ? "bg-[#1F3448] text-white"
                          : "text-[#4E5967]"
                      }`}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid xl:grid-cols-[1.18fr_0.82fr]">
              <div className="border-r border-[#ECE2D6] p-6 md:p-8 lg:p-10">
                <div className="grid gap-0 overflow-hidden rounded-[28px] border border-[#ECE2D6] md:grid-cols-3">
                  <div className="bg-[#203A53] p-5 text-white">
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] opacity-90">
                      High Income
                    </div>
                    <div className="mt-3 text-[30px] font-semibold tracking-tight leading-none">
                      {dash}
                    </div>
                    <div className="mt-2 text-sm opacity-80">{timeLabel}</div>
                  </div>

                  <div className="bg-[#B97854] p-5 text-white">
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] opacity-90">
                      Median Income
                    </div>
                    <div className="mt-3 text-[30px] font-semibold tracking-tight leading-none">
                      {dash}
                    </div>
                    <div className="mt-2 text-sm opacity-80">{timeLabel}</div>
                  </div>

                  <div className="bg-[#D5B28E] p-5 text-[#2D241E]">
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] opacity-90">
                      Low Income
                    </div>
                    <div className="mt-3 text-[30px] font-semibold tracking-tight leading-none">
                      {dash}
                    </div>
                    <div className="mt-2 text-sm opacity-80">{timeLabel}</div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[26px] border border-[#ECE2D6]">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="bg-[#FCFAF7] text-sm uppercase tracking-[0.14em] text-[#7C6E62]">
                        <th className="px-5 py-4">Category</th>
                        <th className="px-5 py-4">High</th>
                        <th className="px-5 py-4">Median</th>
                        <th className="px-5 py-4">Low</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#495563]">
                      {categories.map((category, idx) => (
                        <tr
                          key={category}
                          className={idx % 2 === 0 ? "bg-white" : "bg-[#FBF7F1]"}
                        >
                          <td className="px-5 py-4 font-medium text-[#1D2834]">
                            {category}
                          </td>
                          <td className="px-5 py-4">{dash}</td>
                          <td className="px-5 py-4">{dash}</td>
                          <td className="px-5 py-4">{dash}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-sm text-[#66707E]">
                  Benchmarks are guides, not rules. They are meant to build
                  awareness, not pressure.
                </div>
              </div>

              <div className="bg-[linear-gradient(180deg,#FCF8F3_0%,#F5EDE3_100%)] p-6 md:p-8 lg:p-10">
                <div className="rounded-[30px] border border-[#E7DACB] bg-white/75 p-6 shadow-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A86846]">
                    Why this matters
                  </div>
                  <div className="mt-3 text-3xl font-semibold leading-tight text-[#1D2834]">
                    Awareness is the first step to change.
                  </div>
                  <p className="mt-4 leading-7 text-[#5F6977]">
                    Most families do not need more pressure. They need honest
                    context. This section helps visitors understand where
                    pressure may be coming from and which categories deserve
                    closer attention.
                  </p>

                  <div className="mt-8 space-y-4">
                    {[
                      [
                        "Housing",
                        "One of the largest anchors in the family budget.",
                      ],
                      [
                        "Tuition & childcare",
                        "For some households this may be zero, and for others it may be one of the biggest line items.",
                      ],
                      [
                        "Seasonal life",
                        "Yom Tov, simchas, camps, and clothing rarely fit neatly into one line item.",
                      ],
                    ].map(([title, text]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-[#EBDDCF] bg-[#FCFAF7] p-4"
                      >
                        <div className="font-semibold text-[#1D2834]">
                          {title}
                        </div>
                        <div className="mt-1 text-sm leading-6 text-[#61707B]">
                          {text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[24px] bg-[#1F3448] p-5 text-white">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D7AA87]">
                      Henig difference
                    </div>
                    <div className="mt-3 text-lg leading-7 text-white/82">
                      We use these benchmarks to start better conversations —
                      then build around your family’s real picture, not the
                      averages.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                Categories
              </div>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#1D2834] md:text-5xl">
                The categories that shape real family financial life.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5F6977]">
                This section makes the website feel useful, thoughtful, and
                grounded in reality rather than generic coaching language.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[
                ["Housing", "Rent, mortgage, taxes, and utilities."],
                ["Food & household", "Groceries, basics, and daily needs."],
                [
                  "Tuition & children",
                  "Day school, childcare, camp, and activities.",
                ],
                ["Seasonal life", "Yom Tov, simchas, hosting, and travel."],
                ["Debt pressure", "Credit cards, loans, and monthly drag."],
                [
                  "Savings & stability",
                  "Emergency fund, reserves, and longer goals.",
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[28px] border border-[#EAE0D4] bg-white p-7 shadow-[0_14px_32px_rgba(29,40,52,0.05)]"
                >
                  <div className="mb-5 h-12 w-12 rounded-2xl bg-[#F3E5D9]" />
                  <h3 className="text-xl font-semibold text-[#1D2834]">
                    {title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#5F6977]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#1F3448]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#D7AA87]">
              Our process
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Awareness. Change. Maintenance.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/76">
              A simple structure that helps families move from fog and reaction
              to clarity and steady progress.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              ["Awareness", "We uncover the full picture and remove the fog."],
              [
                "Change",
                "Together we build a realistic plan around your life.",
              ],
              [
                "Maintenance",
                "We refine, adjust, and support the progress over time.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-white shadow-xl"
              >
                <div className="mb-5 inline-block rounded-2xl bg-[#D7AA87] px-4 py-2 text-[#1D2834]">
                  {title}
                </div>
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mt-4 leading-8 text-white/78">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="bg-[#F6F0E8]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                Resources hub
              </div>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#1D2834] md:text-5xl">
                Useful tools families can actually come back to.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#5F6977]">
                A premium resource layer makes the site feel more valuable than a
                brochure and more helpful before the first conversation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {resources.map((resource) => (
                <div
                  key={resource.title}
                  className="rounded-[26px] border border-[#E6DBCF] bg-white p-6 shadow-[0_12px_28px_rgba(29,40,52,0.05)]"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF2F6] text-[#38526B]">
                    ↓
                  </div>
                  <h3 className="text-xl font-semibold text-[#1D2834]">
                    {resource.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#5F6977]">
                    {resource.text}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={resource.pdf}
                      className="rounded-xl bg-[#1F3448] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a4258]"
                    >
                      Download PDF
                    </a>
                    <a
                      href={resource.excel}
                      className="rounded-xl border border-[#D9CEC2] px-4 py-2 text-sm font-medium text-[#1D2834] hover:bg-[#F6F0E8]"
                    >
                      Download Excel
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="stories" className="bg-[#FBF8F3]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
              Stories & outcomes
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#1D2834] md:text-5xl">
              What changes when the numbers become clearer.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5F6977]">
              Even before full testimonials, the site can show the kind of
              outcomes families are looking for.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {stories.map((story) => (
              <div
                key={story.label}
                className="rounded-[30px] border border-[#E8DED2] bg-white p-7 shadow-[0_14px_30px_rgba(29,40,52,0.06)]"
              >
                <div className="mb-4 text-4xl leading-none text-[#D3A27E]">
                  “
                </div>
                <p className="text-lg leading-8 text-[#45515F]">
                  {story.quote}
                </p>
                <div className="mt-6 border-t border-[#EFE5D8] pt-4">
                  <div className="font-semibold text-[#1D2834]">
                    {story.label}
                  </div>
                  <div className="text-sm text-[#7C8795]">
                    {story.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#FBF8F3]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
              FAQ
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#1D2834] md:text-5xl">
              Questions families often ask before taking the first step.
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.q}
                className="rounded-[24px] border border-[#E7DCCE] bg-white p-6 shadow-sm"
              >
                <div className="text-xl font-semibold text-[#1D2834]">
                  {item.q}
                </div>
                <div className="mt-3 leading-7 text-[#5E6977]">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#1B2D3F]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-14">
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#D7AA87]">
                  Final call to action
                </div>
                <div className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Let’s bring clarity, structure, and peace back into your
                  family finances.
                </div>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">
                  A first conversation can help you understand where things
                  stand, what is creating pressure, and what kind of path may
                  make the most sense from here.
                </p>
              </div>

              <div className="rounded-[30px] bg-[#F7F0E7] p-6 text-[#1D2834] shadow-xl">
                <div className="text-2xl font-semibold">Book a Clarity Call</div>
                <p className="mt-2 leading-7 text-[#5D6876]">
                  A warm and practical first conversation to understand your
                  situation and the support that would help most.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Confidential conversation",
                    "Practical first steps",
                    "Clear next-step guidance",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white px-4 py-3 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <a
                  href="https://calendly.com/shmilyhenig/consult"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 block w-full rounded-2xl bg-[#1F3448] py-4 text-center text-white hover:bg-[#2a4258]"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#152432] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4 md:px-10 lg:px-14">
          <div>
            <div className="text-2xl font-semibold">Henig Financial</div>
            <p className="mt-4 leading-7 text-white/68">
              Tailored financial guidance for families who want clear numbers,
              calmer decisions, and a path they can actually live with.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D7AA87]">
              Explore
            </div>
            <div className="mt-4 space-y-3 text-white/74">
              <a href="#why" className="block hover:text-white">
                Why Henig Financial
              </a>
              <a href="#benchmarks" className="block hover:text-white">
                Family Benchmarks
              </a>
              <a href="#resources" className="block hover:text-white">
                Resources
              </a>
              <a href="#stories" className="block hover:text-white">
                Stories
              </a>
            </div>
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
              <div>United States</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D7AA87]">
              Note
            </div>
            <p className="mt-4 leading-7 text-white/68">
              Benchmarks shown on this website are for awareness and educational
              guidance. Individual plans are always built around each family’s
              real numbers and real goals.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}