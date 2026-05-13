"use client";

import { useEffect, useRef, useState } from "react";
import PortalSidebar from "../components/PortalSidebar";
import { supabase } from "../../lib/supabase";

export default function ClientPage() {
  const [chatText, setChatText] = useState("");

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      message:
        "Welcome back. What would you like to update or work on today?",
    },
  ]);

  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  const chatBoxRef = useRef(null);

  async function loadDashboardData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const [incomeRes, expensesRes, assetsRes, liabilitiesRes] =
      await Promise.all([
        supabase.from("income").select("*").eq("user_id", user.id),
        supabase.from("expenses").select("*").eq("user_id", user.id),
        supabase.from("assets").select("*").eq("user_id", user.id),
        supabase.from("liabilities").select("*").eq("user_id", user.id),
      ]);

    const incomeTotal = (incomeRes.data || []).reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const expenseTotal = (expensesRes.data || []).reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const assetTotal = (assetsRes.data || []).reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const debtTotal = (liabilitiesRes.data || []).reduce(
      (sum, item) => sum + Number(item.balance || 0),
      0
    );

    setMonthlyIncome(incomeTotal);
    setMonthlyExpenses(expenseTotal);
    setTotalAssets(assetTotal);
    setTotalDebt(debtTotal);
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  function formatMoney(value) {
    return `$${Number(value || 0).toLocaleString()}`;
  }

  function addMessage(role, message) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role,
        message,
      },
    ]);
  }

  async function sendMessage(e) {
    e.preventDefault();

    const cleanMessage = chatText.trim();

    if (!cleanMessage) return;

    setChatText("");

    addMessage("user", cleanMessage);

    addMessage(
      "assistant",
      "Saved for now. Soon this assistant will update your finances directly from chat."
    );
  }

  const cashFlow = monthlyIncome - monthlyExpenses;
  const netWorth = totalAssets - totalDebt;

  const savingsPercent = monthlyIncome
    ? Math.round((cashFlow / monthlyIncome) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="flex min-h-screen">
        <PortalSidebar />

        <section className="flex-1 px-6 py-6 md:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

              {/* LEFT SIDE */}
              <div className="space-y-6">

                {/* HERO */}
                <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm md:p-10">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                    Welcome Henig Family
                  </div>

                  <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                    Your Financial Clarity Dashboard
                  </h1>

                  <p className="mt-5 max-w-3xl text-base leading-7 text-[#5F6977] md:text-lg">
                    Simplicity brings clarity. This is your private financial
                    command center where we organize your money, priorities,
                    goals, and long-term direction together.
                  </p>
                </div>

                {/* SUMMARY CARDS */}
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                  <DashboardCard
                    title="Monthly Income"
                    value={formatMoney(monthlyIncome)}
                    subtitle="Combined monthly income"
                  />

                  <DashboardCard
                    title="Monthly Expenses"
                    value={formatMoney(monthlyExpenses)}
                    subtitle="Current monthly spending"
                  />

                  <DashboardCard
                    title="Cash Flow"
                    value={formatMoney(cashFlow)}
                    subtitle="Income minus expenses"
                  />

                  <DashboardCard
                    title="Net Worth"
                    value={formatMoney(netWorth)}
                    subtitle="Assets minus liabilities"
                  />

                </div>

                {/* GOALS */}
                <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                    Goals
                  </div>

                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    Financial Targets
                  </h2>

                  <div className="mt-7 grid gap-5 md:grid-cols-3">

                    <GoalCard
                      title="Emergency Fund"
                      amount="$15,000 Goal"
                      progress="42%"
                    />

                    <GoalCard
                      title="Debt Reduction"
                      amount="$8,000 Remaining"
                      progress="63%"
                    />

                    <GoalCard
                      title="Investments"
                      amount="Long-Term Growth"
                      progress="27%"
                    />

                  </div>
                </div>

                {/* SAVINGS + INVESTMENTS */}
                <div className="grid gap-5 md:grid-cols-2">

                  <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                      Savings
                    </div>

                    <div className="mt-3 text-2xl font-semibold">
                      {savingsPercent}%
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[#5F6977]">
                      Current leftover cash flow available for savings,
                      investing, or debt reduction.
                    </p>
                  </div>

                  <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                      Investments
                    </div>

                    <div className="mt-3 text-2xl font-semibold">
                      Long-Term Planning
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[#5F6977]">
                      Retirement, brokerage, and future wealth planning will
                      appear here.
                    </p>
                  </div>

                </div>

                {/* RECENT ACTIVITY */}
                <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                    Activity
                  </div>

                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    Recent Financial Activity
                  </h2>

                  <div className="mt-6 space-y-4">

                    <ActivityItem
                      title="Monthly income updated"
                      time="Today"
                    />

                    <ActivityItem
                      title="Expense categories reviewed"
                      time="Yesterday"
                    />

                    <ActivityItem
                      title="Savings plan created"
                      time="Last week"
                    />

                  </div>
                </div>

              </div>

              {/* RIGHT SIDE AI */}
              <div className="flex h-[760px] flex-col rounded-[2rem] border border-[#E6D8C8] bg-[#F7F3EE] p-5 shadow-sm">

                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                    AI Financial Coach
                  </div>

                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    Financial Guide
                  </h2>
                </div>

                <div
                  ref={chatBoxRef}
                  className="mt-5 min-h-0 flex-1 overflow-y-auto rounded-2xl bg-white p-4"
                >
                  <div className="space-y-3">

                    {messages.map((item) => (
                      <div
                        key={item.id}
                        className={`flex ${
                          item.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                            item.role === "user"
                              ? "bg-[#20344C] text-white"
                              : "bg-[#FBF8F3] text-[#5F6977]"
                          }`}
                        >
                          {item.message}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                <form onSubmit={sendMessage} className="mt-4">

                  <textarea
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    placeholder="Ask a question or update something..."
                    className="h-24 w-full resize-none rounded-2xl border border-[#E6D8C8] bg-white px-4 py-3 text-sm outline-none focus:border-[#A86846]"
                  />

                  <button
                    type="submit"
                    className="mt-3 w-full rounded-2xl bg-[#20344C] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Send Message
                  </button>

                </form>

              </div>

            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardCard({ title, value, subtitle }) {
  return (
    <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-7 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A86846]">
        {title}
      </div>

      <div className="mt-5 text-3xl font-semibold tracking-tight">
        {value}
      </div>

      <div className="mt-3 text-sm leading-6 text-[#5F6977]">
        {subtitle}
      </div>
    </div>
  );
}

function GoalCard({ title, amount, progress }) {
  return (
    <div className="rounded-[1.7rem] border border-[#EEE3D6] bg-[#FBF8F3] p-6">
      <div className="text-lg font-semibold">
        {title}
      </div>

      <div className="mt-2 text-sm text-[#5F6977]">
        {amount}
      </div>

      <div className="mt-5 h-3 rounded-full bg-[#E6D8C8]">
        <div
          className="h-3 rounded-full bg-[#7CA982]"
          style={{ width: progress }}
        />
      </div>

      <div className="mt-2 text-sm text-[#5F6977]">
        {progress} complete
      </div>
    </div>
  );
}

function ActivityItem({ title, time }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#EEE3D6] bg-[#FBF8F3] px-5 py-4">
      <div className="text-sm font-medium">
        {title}
      </div>

      <div className="text-xs text-[#5F6977]">
        {time}
      </div>
    </div>
  );
}
