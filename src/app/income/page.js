"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import PortalSidebar from "../components/PortalSidebar";

export default function IncomePage() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "Salary",
    amount: "",
    frequency: "Monthly",
    notes: "",
  });

  useEffect(() => {
    fetchIncomeSources();
  }, []);

  async function fetchIncomeSources() {
    const { data, error } = await supabase
      .from("income_sources")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSources(data);
    }

    setLoading(false);
  }

  function monthlyAmount(amount, frequency) {
    const number = Number(amount || 0);

    if (frequency === "Weekly") return number * 4.33;
    if (frequency === "Biweekly") return number * 2.165;
    if (frequency === "Yearly") return number / 12;

    return number;
  }

  const totalMonthlyIncome = useMemo(() => {
    return sources.reduce((sum, source) => {
      return sum + monthlyAmount(source.amount, source.frequency);
    }, 0);
  }, [sources]);

  async function addIncomeSource() {
    if (!form.name.trim()) {
      alert("Please enter an income source name.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const payload = {
      name: form.name,
      category: form.category,
      amount: Number(form.amount),
      frequency: form.frequency,
      notes: form.notes,
    };

    const { data, error } = await supabase
      .from("income_sources")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Error saving income source.");
      return;
    }

    setSources((prev) => [data, ...prev]);

    setForm({
      name: "",
      category: "Salary",
      amount: "",
      frequency: "Monthly",
      notes: "",
    });
  }

  async function deleteIncomeSource(id) {
    const { error } = await supabase
      .from("income_sources")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting income source.");
      return;
    }

    setSources((prev) => prev.filter((source) => source.id !== id));
  }

  function money(value) {
    return Number(value || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="flex min-h-screen">
        <PortalSidebar />

        <section className="flex-1 px-10 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 rounded-[2rem] border border-[#E6D8C8] bg-white p-10 shadow-sm">
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                Income
              </div>

              <h1 className="text-4xl font-semibold tracking-tight">
                Income Sources
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#5F6977]">
                Track every source of income flowing into your household.
              </p>
            </div>

            <div className="mb-8 rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                Total Monthly Income
              </div>

              <div className="mt-5 text-4xl font-semibold tracking-tight">
                {money(totalMonthlyIncome)}
              </div>

              <p className="mt-3 text-[#5F6977]">
                All income sources converted into monthly income.
              </p>
            </div>

            <section className="rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Add Income Source</h2>

              <p className="mt-2 text-[#5F6977]">
                Add each paycheck, business income, or other household income source.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Income Source Name
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="Primary Job"
                    className="w-full rounded-2xl border border-[#D8DDE3] bg-white px-4 py-3 outline-none focus:border-[#A86846]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Category
                  </label>

                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-[#D8DDE3] bg-white px-4 py-3 outline-none focus:border-[#A86846]"
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
                    value={form.amount}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        amount: e.target.value,
                      })
                    }
                    placeholder="5000"
                    className="w-full rounded-2xl border border-[#D8DDE3] bg-white px-4 py-3 outline-none focus:border-[#A86846]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Frequency
                  </label>

                  <select
                    value={form.frequency}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        frequency: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-[#D8DDE3] bg-white px-4 py-3 outline-none focus:border-[#A86846]"
                  >
                    <option>Weekly</option>
                    <option>Biweekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Notes
                  </label>

                  <input
                    type="text"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Optional notes"
                    className="w-full rounded-2xl border border-[#D8DDE3] bg-white px-4 py-3 outline-none focus:border-[#A86846]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={addIncomeSource}
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
                    {sources.length} sources added
                  </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-[#E6D8C8]">
                  <div className="grid grid-cols-6 border-b border-[#EFE5D8] bg-[#FAF6F1] px-6 py-4 text-sm font-semibold text-[#5F6977]">
                    <div>Source</div>
                    <div>Category</div>
                    <div>Original</div>
                    <div>Monthly</div>
                    <div>Frequency</div>
                    <div>Actions</div>
                  </div>

                  {loading ? (
                    <div className="px-6 py-6 text-sm text-[#5F6977]">
                      Loading...
                    </div>
                  ) : sources.length === 0 ? (
                    <div className="grid grid-cols-6 items-center px-6 py-5 text-sm">
                      <div>No income sources yet</div>
                      <div>-</div>
                      <div>-</div>
                      <div>-</div>
                      <div>-</div>
                      <div className="text-[#A86846]">
                        Add your first source
                      </div>
                    </div>
                  ) : (
                    sources.map((source) => (
                      <div
                        key={source.id}
                        className="grid grid-cols-6 items-center border-t border-[#EFE5D8] px-6 py-5 text-sm"
                      >
                        <div className="font-medium">{source.name}</div>
                        <div>{source.category}</div>
                        <div>{money(source.amount)}</div>
                        <div className="font-semibold">
                          {money(monthlyAmount(source.amount, source.frequency))}
                        </div>
                        <div>{source.frequency}</div>

                        <button
                          type="button"
                          onClick={() => deleteIncomeSource(source.id)}
                          className="text-left text-[#A86846] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
