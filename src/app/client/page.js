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
    question: "Are you currently single or married?",
  },
  {
    key: "spouse_name",
    question: "If married, what is your spouse’s name? Otherwise type N/A.",
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
];

export default function ClientPage() {
  const [messages, setMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [intakeComplete, setIntakeComplete] = useState(false);

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
      {
        id: crypto.randomUUID(),
        role,
        message,
      },
    ]);
  }

  async function loadProfileProgress() {
    const user = await getUser();

    if (!user) return;

    const { data } = await supabase
      .from("client_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!data) {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          message: intakeSteps[0].question,
        },
      ]);

      return;
    }

    let nextStep = 0;

    for (let i = 0; i < intakeSteps.length; i++) {
      const key = intakeSteps[i].key;

      if (
        data[key] === null ||
        data[key] === undefined ||
        data[key] === ""
      ) {
        nextStep = i;
        break;
      }

      nextStep = i + 1;
    }

    if (nextStep >= intakeSteps.length) {
      setIntakeComplete(true);

      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          message:
            "Welcome back. What would you like to update or work on today?",
        },
      ]);

      return;
    }

    setStepIndex(nextStep);

    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        message: intakeSteps[nextStep].question,
      },
    ]);
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
      addLocalMessage("user", cleanMessage);

      if (intakeComplete) {
        addLocalMessage(
          "assistant",
          "Great. Soon this area will help update income, expenses, goals, and more directly through conversation."
        );

        setSaving(false);
        return;
      }

      const currentStep = intakeSteps[stepIndex];

      await saveProfileAnswer(
        user.id,
        currentStep.key,
        cleanMessage
      );

      const nextIndex = stepIndex + 1;

      if (nextIndex >= intakeSteps.length) {
        setIntakeComplete(true);

        addLocalMessage(
          "assistant",
          "Excellent. Your basic profile is now complete. Welcome to your financial dashboard."
        );
      } else {
        setStepIndex(nextIndex);

        addLocalMessage(
          "assistant",
          intakeSteps[nextIndex].question
        );
      }
    } catch (error) {
      alert(error.message);
    }

    setSaving(false);
  }

  useEffect(() => {
    loadProfileProgress();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop =
        chatBoxRef.current.scrollHeight;
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
          </div>
        </section>
      </div>
    </main>
  );
}
