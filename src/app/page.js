"use client";

import { useState } from "react";

export default function Page() {
  const [household, setHousehold] = useState(5);
  const [state, setState] = useState("NJ");

  const categories = [
    "Housing",
    "Food & groceries",
    "Tuition & childcare",
    "Debt & savings",
    "Healthcare",
    "Transportation",
  ];

  return (
    <main className="min-h-screen bg-[#F7F4EF] p-6 text-[#1E2A32]">
      
      {/* Top Controls */}
      <div className="flex gap-3 mb-6">
        <input
          type="number"
          min="1"
          max="20"
          value={household}
          onChange={(e) => setHousehold(e.target.value)}
          className="border rounded-full px-4 py-2 w-20 text-center"
        />

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border rounded-full px-4 py-2"
        >
          <option>NY</option>
          <option>NJ</option>
        </select>
      </div>

      {/* Income Cards */}
      <div className="grid grid-cols-4 rounded-2xl overflow-hidden mb-6">
        <div className="bg-[#2F4A5F] text-white p-6">
          <div className="text-sm tracking-wide">HIGH INCOME</div>
          <div className="text-3xl font-semibold mt-2">—</div>
          <div className="text-sm opacity-70 mt-1">annual</div>
        </div>

        <div className="bg-[#B5764D] text-white p-6">
          <div className="text-sm tracking-wide">MEDIAN INCOME</div>
          <div className="text-3xl font-semibold mt-2">—</div>
          <div className="text-sm opacity-70 mt-1">annual</div>
        </div>

        <div className="bg-[#D1A97E] text-[#1E2A32] p-6">
          <div className="text-sm tracking-wide">LOW INCOME</div>
          <div className="text-3xl font-semibold mt-2">—</div>
          <div className="text-sm opacity-70 mt-1">annual</div>
        </div>

        <div className="bg-[#EDE7DF] p-6">
          <div className="text-sm tracking-wide">ESTIMATED SPEND</div>
          <div className="text-3xl font-semibold mt-2">—</div>
          <div className="text-sm opacity-70 mt-1">
            monthly (based on median)
          </div>
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

        {categories.map((cat, i) => (
          <div
            key={i}
            className="grid grid-cols-4 p-4 border-t"
          >
            <div>{cat}</div>
            <div>—</div>
            <div className="text-[#B5764D] font-semibold">—</div>
            <div>—</div>
          </div>
        ))}
      </div>
    </main>
  );
}