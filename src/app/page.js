"use client";

import { useState } from "react";

export default function Page() {
  const [householdSize, setHouseholdSize] = useState(5);
  const [state, setState] = useState("NJ");

  const data = {
    highIncome: 0,
    medianIncome: 0,
    lowIncome: 0,
    workingBudget: 0,
    categories: [
      { name: "Housing", high: 0, median: 0, low: 0 },
      { name: "Food & groceries", high: 0, median: 0, low: 0 },
      { name: "Tuition & childcare", high: 0, median: 0, low: 0 },
      { name: "Debt & savings", high: 0, median: 0, low: 0 },
      { name: "Healthcare", high: 0, median: 0, low: 0 },
      { name: "Transportation", high: 0, median: 0, low: 0 },
    ],
  };

  const format = (num) => {
    if (!num || num === 0) return "—";
    return `$${num.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834] p-6">
      <div className="max-w-6xl mx-auto">

        {/* Controls */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <input
            type="number"
            min="1"
            max="20"
            value={householdSize}
            onChange={(e) => setHouseholdSize(e.target.value)}
            className="border rounded-full px-4 py-2"
          />

          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border rounded-full px-4 py-2"
          >
            <option value="NJ">NJ</option>
            <option value="NY">NY</option>
          </select>
        </div>

        {/* Income Boxes */}
        <div className="grid grid-cols-4 rounded-2xl overflow-hidden mb-8">
          <div className="bg-[#243C53] text-white p-6">
            <div className="text-xs tracking-wide mb-2">HIGH INCOME</div>
            <div className="text-2xl font-bold">{format(data.highIncome)}</div>
            <div className="text-sm opacity-70">annual</div>
          </div>

          <div className="bg-[#B5744C] text-white p-6">
            <div className="text-xs tracking-wide mb-2">MEDIAN INCOME</div>
            <div className="text-2xl font-bold">{format(data.medianIncome)}</div>
            <div className="text-sm opacity-70">annual</div>
          </div>

          <div className="bg-[#D6B28C] p-6">
            <div className="text-xs tracking-wide mb-2">LOW INCOME</div>
            <div className="text-2xl font-bold">{format(data.lowIncome)}</div>
            <div className="text-sm opacity-70">annual</div>
          </div>

          <div className="bg-[#EEE6DD] p-6">
            <div className="text-xs tracking-wide mb-2">ESTIMATED SPEND</div>
            <div className="text-2xl font-bold">{format(data.workingBudget)}</div>
            <div className="text-sm opacity-70">monthly (median)</div>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 bg-[#F3ECE4] p-4 font-semibold">
            <div>Category</div>
            <div>High</div>
            <div>Median</div>
            <div>Low</div>
          </div>

          {data.categories.map((item, i) => (
            <div key={i} className="grid grid-cols-4 p-4 border-t">
              <div>{item.name}</div>
              <div>{format(item.high)}</div>
              <div className="text-[#B5744C] font-semibold">
                {format(item.median)}
              </div>
              <div>{format(item.low)}</div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}