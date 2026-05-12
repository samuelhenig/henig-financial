"use client";

import { useEffect, useRef, useState } from "react";
import PortalSidebar from "../components/PortalSidebar";
import { supabase } from "../../lib/supabase";

export default function ClientPage() {
  const [messages, setMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const [flow, setFlow] = useState(null);
  const [sending, setSending] = useState(false);
  const chatBoxRef = useRef(null);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }

  function addLocalMessage(role, message) {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role, message },
    ]);
  }

  function startFlow(type) {
    setFlow(type);

    const questions = {
      income: "What income should we add? Example: Salary 6500",
      expense: "What expense should we add? Example: Mortgage 2400",
      asset: "What asset should we add? Example: Savings 15000",
      debt: "What debt should we add? Example: Chase card 4200",
      goal: "What goal should we add? Example: Emergency fund 25000",
    };

    addLocalMessage("assistant", questions[type]);
  }

  function parseNameAmount(text) {
    const amountMatch = text.match(/[\d,]+(\.\d{1,2})?/);
    const amount = amountMatch
      ? Number(amountMatch[0].replace(/,/g, ""))
      : 0;

    const name = text
      .replace(amountMatch?.[0] || "", "")
      .replace(/\$/g, "")
      .trim();

    return {
      name: name || "Untitled",
      amount,
    };
  }

  async function saveGuidedAnswer(text) {
    const user = await getUser();

    if (!user) {
      alert("User not logged in.");
      return;
    }

    const parsed = parseNameAmount(text);

    if (!parsed.amount) {
      addLocalMessage(
        "assistant",
        "Please include an amount. Example: Mortgage 2400"
      );
      return;
    }

    if (flow === "income") {
      await supabase.from("income").insert([
        {
          user_id: user.id,
          source: parsed.name,
          amount: parsed.amount,
          frequency: "Monthly",
        },
      ]);

      addLocalMessage(
        "assistant",
        `Added income: ${parsed.name} - $${parsed.amount.toLocaleString()} monthly.`
      );
    }

    if (flow === "expense") {
      await supabase.from("expenses").insert([
        {
          user_id: user.id,
          name: parsed.name,
          category: "Other",
          amount: parsed.amount,
          frequency: "Monthly",
        },
      ]);

      addLocalMessage(
        "assistant",
        `Added expense: ${parsed.name} - $${parsed.amount.toLocaleString()} monthly.`
      );
    }

    if (flow === "asset") {
      await supabase.from("assets").insert([
        {
          user_id: user.id,
          name: parsed.name,
          category: "Other",
          amount: parsed.amount,
        },
      ]);

      addLocalMessage(
        "assistant",
        `Added asset: ${parsed.name} - $${parsed.amount.toLocaleString()}.`
      );
    }

    if (flow === "debt") {
      await supabase.from("liabilities").insert([
        {
          user_id: user.id,
          name: parsed.name,
          category: "Other",
          balance: parsed.amount,
          monthly_payment: 0,
          interest_rate: 0,
        },
      ]);

      addLocalMessage(
        "assistant",
        `Added debt: ${parsed.name} - $${parsed.amount.toLocaleString()}.`
      );
    }

    if (flow === "goal") {
      await supabase.from("goals").insert([
        {
          user_id: user.id,
          title: parsed.name,
          category: "Other",
          target_amount: parsed.amount,
          current_amount: 0,
        },
      ]);

      addLocalMessage(
        "assistant",
        `Added goal: ${parsed.name} - target $${parsed.amount.toLocaleString()}.`
      );
    }

    setFlow(null);

    addLocalMessage(
      "assistant",
      "What would you like to add next? Choose one of the buttons below."
    );
  }

  async function sendMessage(e) {
    if (e) e.preventDefault();

    const cleanMessage = chatText.trim();
    if (!cleanMessage || sending) return;

    setSending(true);
    setChatText("");

    addLocalMessage("user", cleanMessage);

    if (!flow) {
      addLocalMessage(
        "assistant",
        "Please choose what you want to add first: income, expense, asset, debt, or goal."
      );
      setSending(false);
      return;
    }

    await saveGuidedAnswer(cleanMessage);

    setSending(false);
  }

  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        message:
          "Welcome back. What would you like to update today? Choose one below.",
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

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
                  Financial Intake Guide
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

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => startFlow("income")}
                    className="rounded-2xl border border-[#E6D8C8] bg-white px-3 py-2 text-sm font-medium hover:bg-[#F4EFE8]"
                  >
                    Add Income
                  </button>

                  <button
                    type="button"
                    onClick={() => startFlow("expense")}
                    className="rounded-2xl border border-[#E6D8C8] bg-white px-3 py-2 text-sm font-medium hover:bg-[#F4EFE8]"
                  >
                    Add Expense
                  </button>

                  <button
                    type="button"
                    onClick={() => startFlow("asset")}
                    className="rounded-2xl border border-[#E6D8C8] bg-white px-3 py-2 text-sm font-medium hover:bg-[#F4EFE8]"
                  >
                    Add Asset
                  </button>

                  <button
                    type="button"
                    onClick={() => startFlow("debt")}
                    className="rounded-2xl border border-[#E6D8C8] bg-white px-3 py-2 text-sm font-medium hover:bg-[#F4EFE8]"
                  >
                    Add Debt
                  </button>

                  <button
                    type="button"
                    onClick={() => startFlow("goal")}
                    className="col-span-2 rounded-2xl border border-[#E6D8C8] bg-white px-3 py-2 text-sm font-medium hover:bg-[#F4EFE8]"
                  >
                    Add Goal
                  </button>
                </div>

                <form onSubmit={sendMessage} className="mt-3 shrink-0">
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
                    className="h-16 w-full resize-none rounded-2xl border border-[#E6D8C8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A86846]"
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-2 w-full rounded-2xl bg-[#20344C] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {sending ? "Saving..." : "Send"}
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Your Number", "—", "Income minus expenses"],
                ["Monthly Income", "—", "All income sources combined"],
                ["Monthly Expenses", "—", "Total monthly outflow"],
                ["Net Worth", "—", "Assets minus liabilities"],
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
