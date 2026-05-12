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
      message: "Welcome back. What would you like to update today?",
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

  function formatMoney(value) {
    return `$${Number(value || 0).toLocaleString()}`;
  }

  function getPercent(amount) {
    if (!monthlyIncome) return 0;
    return Math.round((amount / monthlyIncome) * 100);
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
    if (e) e.preventDefault();

    const cleanMessage = chatText.trim();
    if (!cleanMessage) return;

    setChatText("");
    addMessage("user", cleanMessage);

    addMessage(
      "assistant",
      "Saved for now. Soon this guide will update your income, expenses, assets, debts, and goals directly from this chat."
    );
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const cashFlow = monthlyIncome - monthlyExpenses;
  const netWorth = totalAssets - totalDebt;

  const csibs = [
    ["Charity", "10–20%", getPercent(0)],
    ["Savings", "5–10%", getPercent(0)],
    ["Investments", "5–10%", getPercent(0)],
    ["Bills", "50–60%", getPercent(monthlyExpenses)],
    ["Spending", "20–30%", getPercent(0)],
  ];

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
                  Simplicity brings clarity. This is your private financial
                  command center where we organize your money, priorities,
                  goals, and long-term direction together.
                </p>
              </div>

              <div className="flex h-[520px] flex-col rounded-[2rem] border border-[#E6D8C8] bg-[#F8F4EF] p-6 shadow-sm">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                  Financial Guide
                </div>

                <div
                  ref={chatBoxRef}
                  className="min-h-0 flex-1 overflow-y-auto rounded-2xl bg-white p-4"
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

                <form onSubmit={sendMessage} className="mt-4 shrink-0">
                  <textarea
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(e);
                      }
                    }}
                    placeholder="Type your answer..."
                    className="h-20 w-full resize-none rounded-2xl border border-[#E6D8C8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A86846]"
                  />

                  <button
                    type="submit"
                    className="mt-3 w-full rounded-2xl bg-[#20344C] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Your Number", formatMoney(cashFlow), "Income minus expenses"],
                [
                  "Monthly Income",
                  formatMoney(monthlyIncome),
                  "All income sources combined",
                ],
                [
                  "Monthly Expenses",
                  formatMoney(monthlyExpenses),
                  "Total monthly outflow",
                ],
                ["Net Worth", formatMoney(netWorth), "Assets minus liabilities"],
              ].map(([title, value, subtitle]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-[#E6D8C8] bg-white p-7 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                    {title}
                  </div>

                  <div className="mt-7 text-4xl font-semibold tracking-tight">
                    {value}
                  </div>

                  <div className="mt-4 text-base text-[#5F6977]">
                    {subtitle}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-[#E6D8C8] bg-white p-10 shadow-sm">
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                CSIBS Method
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                Your Priority Allocation System
              </h2>

              <div className="mt-8 space-y-7">
                {csibs.map(([name, target, percent]) => (
                  <div key={name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">{name}</span>{" "}
                        <span className="text-[#5F6977]">
                          Target: {target}
                        </span>
                      </div>

                      <div>{percent}%</div>
                    </div>

                    <div className="h-3 rounded-full bg-[#EDE5DB]">
                      <div
                        className="h-3 rounded-full bg-[#7CA982]"
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      />
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
