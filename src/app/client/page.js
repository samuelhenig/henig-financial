"use client";

import { useEffect, useRef, useState } from "react";
import PortalSidebar from "../components/PortalSidebar";
import { supabase } from "../../lib/supabase";

const intakeSteps = [
  {
    key: "full_name",
    question: "Welcome. Let’s start simple. What is your full name?",
  },
  {
    key: "marital_status",
    question: "Are you married, single, divorced, or widowed?",
  },
  {
    key: "spouse_name",
    question: "If you are married, what is your spouse’s name? If not, type N/A.",
  },
  {
    key: "number_of_kids",
    question: "How many kids do you have?",
  },
  {
    key: "kids_ages",
    question: "What are their ages? If none, type N/A.",
  },
  {
    key: "main_financial_stress",
    question: "What is your biggest financial stress right now?",
  },
  {
    key: "main_goal",
    question: "What is the main financial goal you want to work toward?",
  },
  {
    key: "income",
    question: "Now let’s add income. What monthly income should we add? Example: Salary 6500",
  },
  {
    key: "expenses",
    question: "Now let’s add an expense. Example: Mortgage 2400",
  },
  {
    key: "assets",
    question: "Now let’s add an asset. Example: Savings 15000",
  },
  {
    key: "liabilities",
    question: "Now let’s add a debt or liability. Example: Chase card 4200",
  },
  {
    key: "goals",
    question: "Now let’s add a goal. Example: Emergency fund 25000",
  },
];

export default function ClientPage() {
  const [messages, setMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [saving, setSaving] = useState(false);
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

  async function saveProfileAnswer(userId, key, value) {
    const cleanValue = value.trim();

    const payload = {
      user_id: userId,
      updated_at: new Date().toISOString(),
    };

    if (key === "number_of_kids") {
      payload[key] = Number(cleanValue.replace(/\D/g, "") || 0);
    } else {
      payload[key] = cleanValue;
    }

    const { error } = await supabase.from("client_profiles").upsert(payload, {
      onConflict: "user_id",
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async function saveFinancialAnswer(userId, key, value) {
    const parsed = parseNameAmount(value);

    if (!parsed.amount) {
      addLocalMessage(
        "assistant",
        "Please include an amount. Example: Salary 6500"
      );
      return false;
    }

    if (key === "income") {
      const { error } = await supabase.from("income").insert([
        {
          user_id: userId,
          source: parsed.name,
          amount: parsed.amount,
          frequency: "Monthly",
        },
      ]);

      if (error) throw new Error(error.message);

      addLocalMessage(
        "assistant",
        `Added income: ${parsed.name} - $${parsed.amount.toLocaleString()} monthly.`
      );
    }

    if (key === "expenses") {
      const { error } = await supabase.from("expenses").insert([
        {
          user_id: userId,
          name: parsed.name,
          category: "Other",
          amount: parsed.amount,
          frequency: "Monthly",
        },
      ]);

      if (error) throw new Error(error.message);

      addLocalMessage(
        "assistant",
        `Added expense: ${parsed.name} - $${parsed.amount.toLocaleString()} monthly.`
      );
    }

    if (key === "assets") {
      const { error } = await supabase.from("assets").insert([
        {
          user_id: userId,
          name: parsed.name,
          category: "Other",
          amount: parsed.amount,
        },
      ]);

      if (error) throw new Error(error.message);

      addLocalMessage(
        "assistant",
        `Added asset: ${parsed.name} - $${parsed.amount.toLocaleString()}.`
      );
    }

    if (key === "liabilities") {
      const { error } = await supabase.from("liabilities").insert([
        {
          user_id: userId,
          name: parsed.name,
          category: "Other",
          balance: parsed.amount,
          monthly_payment: 0,
          interest_rate: 0,
        },
      ]);

      if (error) throw new Error(error.message);

      addLocalMessage(
        "assistant",
        `Added debt: ${parsed.name} - $${parsed.amount.toLocaleString()}.`
      );
    }

    if (key === "goals") {
      const { error } = await supabase.from("goals").insert([
        {
          user_id: userId,
          title: parsed.name,
          category: "Other",
          target_amount: parsed.amount,
          current_amount: 0,
        },
      ]);

      if (error) throw new Error(error.message);

      addLocalMessage(
        "assistant",
        `Added goal: ${parsed.name} - target $${parsed.amount.toLocaleString()}.`
      );
    }

    return true;
  }

  async function sendMessage(e) {
    if (e) e.preventDefault();

    const cleanMessage = chatText.trim();

    if (!cleanMessage || saving) return;

    const user = await getUser();

    if (!user) {
      alert("User not logged in.");
      return;
    }

    setSaving(true);
    setChatText("");

    try {
      const currentStep = intakeSteps[stepIndex];

      addLocalMessage("user", cleanMessage);

      if (
        [
          "full_name",
          "marital_status",
          "spouse_name",
          "number_of_kids",
          "kids_ages",
          "main_financial_stress",
          "main_goal",
        ].includes(currentStep.key)
      ) {
        await saveProfileAnswer(user.id, currentStep.key, cleanMessage);
      } else {
        const saved = await saveFinancialAnswer(
          user.id,
          currentStep.key,
          cleanMessage
        );

        if (!saved) {
          setSaving(false);
          return;
        }
      }

      const nextIndex = stepIndex + 1;

      if (nextIndex < intakeSteps.length) {
        setStepIndex(nextIndex);
        addLocalMessage("assistant", intakeSteps[nextIndex].question);
      } else {
        addLocalMessage(
          "assistant",
          "Great. Your basic financial intake is saved. You can continue updating income, expenses, assets, debts, and goals from the sidebar anytime."
        );
      }
    } catch (error) {
      alert(error.message);
    }

    setSaving(false);
  }

  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        message: intakeSteps[0].question,
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

                    {saving && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-2xl bg-[#FBF8F3] px-4 py-3 text-sm leading-6 text-[#5F6977]">
                          Saving...
                        </div>
                      </div>
                    )}
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
                    disabled={saving}
                    className="mt-3 w-full rounded-2xl bg-[#20344C] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Send"}
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
