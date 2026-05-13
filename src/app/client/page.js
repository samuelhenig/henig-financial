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
        "Welcome back. Let’s start simple. Tell me one income source, like: salary 7500",
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
        supabase.from("income_sources").select("*"),
        supabase.from("expenses").select("*").eq("user_id", user.id),
        supabase.from("assets").select("*").eq("user_id", user.id),
        supabase.from("liabilities").select("*").eq("user_id", user.id),
      ]);

    const incomeTotal = (incomeRes.data || []).reduce((sum, item) => {
      return sum + monthlyAmount(item.amount, item.frequency);
    }, 0);

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

  function monthlyAmount(amount, frequency) {
    const number = Number(amount || 0);
    const cleanFrequency = String(frequency || "Monthly").toLowerCase();

    if (cleanFrequency === "weekly") return number * 4.33;
    if (cleanFrequency === "biweekly") return number * 2.165;
    if (cleanFrequency === "yearly") return number / 12;

    return number;
  }

  function formatMoney(value) {
    return `$${Number(value || 0).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}`;
  }

  function getPercent(amount) {
    if (!monthlyIncome) return 0;
    return Math.round((amount / monthlyIncome) * 100);
  }

  function getBarStatus(percent, min, max) {
    if (percent >= min && percent <= max) {
      return {
        color: "bg-[#7CA982]",
        label: "On Track",
      };
    }

    if (
      (percent >= min - 5 && percent < min) ||
      (percent > max && percent <= max + 10)
    ) {
      return {
        color: "bg-[#D6B85A]",
        label: "Close",
      };
    }

    return {
      color: "bg-[#C96B5C]",
      label: "Needs Attention",
    };
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

  function parseIncomeMessage(message) {
    const lower = message.toLowerCase();

    const amountMatch = lower.match(/\$?\s*([0-9,]+)(\.\d{1,2})?/);
    if (!amountMatch) return null;

    const amount = Number(amountMatch[0].replace(/[$,\s]/g, ""));
    if (!amount || amount <= 0) return null;

    const incomeWords = [
      "income",
      "salary",
      "paycheck",
      "job",
      "wages",
      "commission",
      "bonus",
      "business",
      "side",
      "rental",
    ];

    const hasIncomeWord = incomeWords.some((word) => lower.includes(word));
    if (!hasIncomeWord) return null;

    let name = "Income";
    let category = "Other";

    if (lower.includes("salary")) {
      name = "Salary";
      category = "Salary";
    } else if (lower.includes("paycheck")) {
      name = "Paycheck";
      category = "Salary";
    } else if (lower.includes("job")) {
      name = "Job";
      category = "Salary";
    } else if (lower.includes("commission")) {
      name = "Commission";
      category = "Salary";
    } else if (lower.includes("bonus")) {
      name = "Bonus";
      category = "Salary";
    } else if (lower.includes("business")) {
      name = "Business Income";
      category = "Business";
    } else if (lower.includes("side")) {
      name = "Side Hustle";
      category = "Side Hustle";
    } else if (lower.includes("rental")) {
      name = "Rental Income";
      category = "Rental";
    }

    let frequency = "Monthly";

    if (lower.includes("weekly")) frequency = "Weekly";
    if (lower.includes("biweekly") || lower.includes("every 2 weeks")) {
      frequency = "Biweekly";
    }
    if (lower.includes("yearly") || lower.includes("annual")) {
      frequency = "Yearly";
    }

    return {
      name,
      category,
      amount,
      frequency,
      notes: message,
    };
  }

  async function sendMessage(e) {
    if (e) e.preventDefault();

    const cleanMessage = chatText.trim();
    if (!cleanMessage) return;

    setChatText("");
    addMessage("user", cleanMessage);

    const incomeData = parseIncomeMessage(cleanMessage);

    if (!incomeData) {
      addMessage(
        "assistant",
        "I want to make sure I save this correctly. For now, try it like this: salary 7500, business 3000, or rental 1200."
      );
      return;
    }

    const { error } = await supabase.from("income_sources").insert([
      {
        name: incomeData.name,
        category: incomeData.category,
        amount: incomeData.amount,
        frequency: incomeData.frequency,
        notes: incomeData.notes,
      },
    ]);

    if (error) {
      console.error(error);
      addMessage("assistant", "Something went wrong saving this income.");
      return;
    }

    await loadDashboardData();

    addMessage(
      "assistant",
      `Great. I saved ${formatMoney(incomeData.amount)} as ${incomeData.name}.`
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
    {
      name: "Charity",
      target: "10–20%",
      percent: getPercent(0),
      min: 10,
      max: 20,
    },
    {
      name: "Savings",
      target: "5–10%",
      percent: getPercent(0),
      min: 5,
      max: 10,
    },
    {
      name: "Investments",
      target: "5–10%",
      percent: getPercent(0),
      min: 5,
      max: 10,
    },
    {
      name: "Bills",
      target: "50–60%",
      percent: getPercent(monthlyExpenses),
      min: 50,
      max: 60,
    },
    {
      name: "Spending",
      target: "20–30%",
      percent: getPercent(0),
      min: 20,
      max: 30,
    },
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
                    placeholder="Example: salary 7500"
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
                {csibs.map((item) => {
                  const status = getBarStatus(
                    item.percent,
                    item.min,
                    item.max
                  );

                  return (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium">{item.name}</span>{" "}
                          <span className="text-[#5F6977]">
                            Target: {item.target}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#5F6977]">
                            {status.label}
                          </span>

                          <span>{item.percent}%</span>
                        </div>
                      </div>

                      <div className="h-3 rounded-full bg-[#EDE5DB]">
                        <div
                          className={`h-3 rounded-full ${status.color}`}
                          style={{
                            width: `${Math.min(item.percent, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
