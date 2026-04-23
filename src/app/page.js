"use client";

import { useState } from "react";

export default function Page() {
  const [period, setPeriod] = useState("monthly");

  // No real data yet → dashes
  const format = () => "—";

  const resources = []; // empty for now

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F2933]">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
          Feel back in control with a clear plan built around your real life.
        </h1>
        <p className="text-lg text-[#52606D] max-w-xl">
          We help families bring clarity and structure to their finances through calm, practical guidance.
        </p>
      </section>

      {/* BENCHMARKS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        {/* TOGGLE */}
        <div className="flex gap-3 mb-6">
          {["annual", "monthly", "weekly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-full border ${
                period === p
                  ? "bg-[#1F2933] text-white"
                  : "bg-white text-[#1F2933]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-4 rounded-2xl overflow-hidden mb-6">
          <div className="bg-[#2F4858] text-white p-6">
            <div className="text-sm uppercase mb-2">High Income</div>
            <div className="text-xl">{format()}</div>
            <div className="text-sm opacity-70">{period}</div>
          </div>
          <div className="bg-[#B36A3C] text-white p-6">
            <div className="text-sm uppercase mb-2">Median Income</div>
            <div className="text-xl">{format()}</div>
            <div className="text-sm opacity-70">{period}</div>
          </div>
          <div className="bg-[#D2B48C] text-white p-6">
            <div className="text-sm uppercase mb-2">Low Income</div>
            <div className="text-xl">{format()}</div>
            <div className="text-sm opacity-70">{period}</div>
          </div>
          <div className="bg-[#E5E1DA] text-[#1F2933] p-6">
            <div className="text-sm uppercase mb-2">Estimated Spend</div>
            <div className="text-xl">{format()}</div>
            <div className="text-sm opacity-70">{period}</div>
          </div>
        </div>

        {/* TABLE */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 p-4 bg-[#F0ECE6] font-semibold">
            <div>Category</div>
            <div>High</div>
            <div>Median</div>
            <div>Low</div>
          </div>

          {[
            "Housing",
            "Food & groceries",
            "Tuition & childcare",
            "Debt & savings",
            "Healthcare",
            "Transportation",
          ].map((item, i) => (
            <div key={i} className="grid grid-cols-4 p-4 border-t">
              <div>{item}</div>
              <div>{format()}</div>
              <div>{format()}</div>
              <div>{format()}</div>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#7B8794] mt-4">
          Not to compare — just to help you better understand where things stand and feel more in control.
        </p>
      </section>

      {/* OUTCOMES (NO FAKE TESTIMONIALS) */}
      <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          What changes when things start to feel more in control
        </h2>
        <p className="text-[#52606D] mb-12">
          Here are some of the shifts families often experience.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-2xl p-6 border">
            <p className="mb-6">
              For many families, this is the first time everything is clearly laid out — and things start to feel back in control.
            </p>
            <div className="font-semibold">Young family with rising expenses</div>
            <div className="text-sm text-[#7B8794]">More breathing room</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <p className="mb-6">
              Instead of reacting month to month, there’s a clearer plan and a stronger sense of control.
            </p>
            <div className="font-semibold">Household trying to steady cash flow</div>
            <div className="text-sm text-[#7B8794]">More clarity</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border">
            <p className="mb-6">
              The numbers become easier to talk about, and the tension around money begins to ease.
            </p>
            <div className="font-semibold">Couple carrying financial stress</div>
            <div className="text-sm text-[#7B8794]">Less tension</div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          Simple tools you can use right away
        </h2>
        <p className="text-[#52606D] mb-10">
          Practical tools to help you get clarity before we even speak.
        </p>

        {resources.length === 0 ? (
          <div className="bg-white border rounded-2xl p-8 text-center text-[#7B8794]">
            Resources coming soon.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border">
                <h3 className="font-semibold mb-2">{r.title}</h3>
                <a href={r.link} className="text-blue-600 underline">
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          Ready to feel back in control?
        </h2>
        <p className="text-[#52606D] mb-6">
          Let’s build a clear plan around your real life.
        </p>
        <button className="bg-[#1F2933] text-white px-6 py-3 rounded-full">
          Book a Clarity Call
        </button>
      </section>

    </div>
  );
}