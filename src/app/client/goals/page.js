"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import PortalSidebar from "../../components/PortalSidebar";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Emergency Fund");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const [loading, setLoading] = useState(true);

  async function loadGoals() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setGoals(data || []);
    setLoading(false);
  }

  async function addGoal(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User not logged in.");
      return;
    }

    if (!title.trim() || !targetAmount) {
      alert("Please fill out goal title and target amount.");
      return;
    }

    const { error } = await supabase.from("goals").insert([
      {
        user_id: user.id,
        title: title.trim(),
        category,
        target_amount: Number(targetAmount),
        current_amount: Number(currentAmount || 0),
        target_date: targetDate || null,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setCategory("Emergency Fund");
    setTargetAmount("");
    setCurrentAmount("");
    setTargetDate("");

    loadGoals();
  }

  async function deleteGoal(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("goals")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadGoals();
  }

  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="flex min-h-screen">
        <PortalSidebar />

        <section className="flex-1 px-6 py-8 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold">Goals</h1>

                <p className="mt-2 text-[#5F6977]">
                  Track financial goals, savings targets, and future milestones.
                </p>
              </div>
            </div>

            <form
              onSubmit={addGoal}
              className="mt-8 grid gap-4 rounded-3xl border border-[#E9DFD3] bg-white p-6 shadow-sm md:grid-cols-5"
            >
              <input
                type="text"
                placeholder="Goal title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              >
                <option>Emergency Fund</option>
                <option>Debt Payoff</option>
                <option>Retirement</option>
                <option>Investing</option>
                <option>Home Purchase</option>
                <option>Education</option>
                <option>Vacation</option>
                <option>Business</option>
                <option>Other</option>
              </select>

              <input
                type="number"
                placeholder="Target amount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              />

              <input
                type="number"
                placeholder="Current saved"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              />

              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              />

              <button
                type="submit"
                className="rounded-2xl bg-[#20344C] px-6 py-3 font-medium text-white transition hover:opacity-90 md:col-span-5"
              >
                Add Goal
              </button>
            </form>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {loading && (
                <div className="rounded-3xl border border-[#E9DFD3] bg-white p-8 text-center text-[#5F6977]">
                  Loading goals...
                </div>
              )}

              {!loading &&
                goals.map((goal) => {
                  const progress =
                    goal.target_amount > 0
                      ? Math.min(
                          (goal.current_amount / goal.target_amount) * 100,
                          100
                        )
                      : 0;

                  return (
                    <div
                      key={goal.id}
                      className="rounded-3xl border border-[#E9DFD3] bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xl font-semibold">
                            {goal.title}
                          </div>

                          <div className="mt-1 text-sm text-[#5F6977]">
                            {goal.category}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteGoal(goal.id)}
                          className="text-sm font-medium text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="mt-6">
                        <div className="mb-2 flex justify-between text-sm">
                          <span>
                            ${Number(goal.current_amount || 0).toLocaleString()}
                          </span>

                          <span>
                            ${Number(goal.target_amount || 0).toLocaleString()}
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-[#EEE7DD]">
                          <div
                            className="h-full rounded-full bg-[#20344C]"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>

                        <div className="mt-2 text-sm text-[#5F6977]">
                          {progress.toFixed(0)}% complete
                        </div>

                        {goal.target_date && (
                          <div className="mt-4 text-sm text-[#5F6977]">
                            Target Date: {goal.target_date}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

              {!loading && goals.length === 0 && (
                <div className="rounded-3xl border border-[#E9DFD3] bg-white p-10 text-center text-[#5F6977]">
                  No goals added yet.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
