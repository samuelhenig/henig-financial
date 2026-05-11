"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://fzsgilsvgmfvvhktghtq.supabase.co",
  "sb_publishable_YATmYcY-DNGjDXnbwmC0dA_NSx1J-rd"
);

const steps = [
  {
    key: "welcome",
    speaker: "Clarity Coach",
    question:
      "Welcome back. Let’s begin building your financial clarity system together.",
    placeholder: "Type: ready",
  },
  {
    key: "mortgage",
    speaker: "Clarity Coach",
    question: "What is your approximate monthly mortgage or rent payment?",
    placeholder: "Example: 3200",
  },
];

export default function ClientPage() {
  const router = useRouter();

  const [familyName, setFamilyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  useEffect(() => {
    async function loadPage() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("client_profiles")
        .select("family_name")
        .eq("user_id", userData.user.id)
        .single();

      setFamilyName(profile?.family_name || "");

      await loadExpenses(userData.user.id);

      setLoading(false);
    }

    loadPage();
  }, [router]);

  async function loadExpenses(userId) {
    const { data } = await supabase
      .from("expenses")
      .select("amount, frequency")
      .eq("user_id", userId);

    if (!data) return;

    const total = data.reduce((sum, item) => {
      const amount = Number(item.amount || 0);

      if (item.frequency === "weekly") return sum + amount * 4.33;
      if (item.frequency === "yearly") return sum + amount / 12;

      return sum + amount;
    }, 0);

    setMonthlyExpenses(total);
  }

  function formatMoney(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function startIntake() {
    setIntakeOpen(true);
    setMessages([
      {
        type: "coach",
        speaker: steps[0].speaker,
        text: steps[0].question,
      },
    ]);
    setStepIndex(0);
  }

  async function saveMortgage(amount) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    await supabase.from("expenses").insert({
      user_id: userData.user.id,
      bucket: "Bills",
      category: "Housing",
      subcategory: "Mortgage",
      amount: Number(amount),
      frequency: "monthly",
      notes: "",
    });

    await loadExpenses(userData.user.id);
  }

  async function sendAnswer() {
    if (!answer.trim()) return;

    const currentStep = steps[stepIndex];

    const updatedMessages = [
      ...messages,
      {
        type: "client",
        speaker: "You",
        text: answer,
      },
    ];

    if (currentStep.key === "mortgage") {
      await saveMortgage(answer);
    }

    const nextIndex = stepIndex + 1;

    if (steps[nextIndex]) {
      updatedMessages.push({
        type: "coach",
        speaker: steps[nextIndex].speaker,
        text: steps[nextIndex].question,
      });

      setStepIndex(nextIndex);
    } else {
      updatedMessages.push({
        type: "coach",
        speaker: "Clarity Coach",
        text:
          "Perfect. Your first financial item has now been saved into your clarity system.",
      });
    }

    setMessages(updatedMessages);
    setAnswer("");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF8F3]">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-6 py-10 text-[#1D2834]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">Henig Financial</div>
            <div className="text-xs uppercase tracking-[0.26em] text-[#A86846]">
              Client Dashboard
            </div>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="rounded-2xl border border-[#CAD2DB] px-5 py-3 text-sm hover:bg-[#F4EFE8]"
          >
            Log out
          </button>
        </div>

        <div className="rounded-[36px] border border-[#E8DED2] bg-white p-10 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
            WELCOME {familyName.toUpperCase()} FAMILY
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Your Financial Clarity Dashboard
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5F6977]">
            This is your private clarity space where we’ll organize your full
            financial picture together.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-[#E8DED2] bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
              Clarity Intake
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Guided Questions
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#5F6977]">
              Answer one simple question at a time. The dashboard updates as we
              organize your numbers.
            </p>

            {!intakeOpen && (
              <button
                onClick={startIntake}
                className="mt-6 rounded-2xl bg-[#1F3448] px-5 py-3 text-sm font-medium text-white hover:bg-[#2a4258]"
              >
                Start Intake
              </button>
            )}
          </div>

          <div className="rounded-[28px] border border-[#E8DED2] bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
              Financial Snapshot
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Your Snapshot
            </h2>

            <div className="mt-5 space-y-3 text-sm text-[#5F6977]">
              <div className="flex justify-between border-b border-[#F0E7DE] pb-2">
                <span>Monthly Income</span>
                <span>—</span>
              </div>

              <div className="flex justify-between border-b border-[#F0E7DE] pb-2">
                <span>Monthly Expenses</span>
                <span>{formatMoney(monthlyExpenses)}</span>
              </div>

              <div className="flex justify-between border-b border-[#F0E7DE] pb-2">
                <span>Your Number</span>
                <span>—</span>
              </div>

              <div className="flex justify-between">
                <span>Net Worth</span>
                <span>—</span>
              </div>
            </div>
          </div>
        </div>

        {intakeOpen && (
          <div className="mt-10 rounded-[32px] border border-[#E8DED2] bg-white p-8 shadow-sm">
            <div className="mb-6">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
                Guided Intake
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Let’s build your financial picture
              </h2>
            </div>

            <div className="space-y-4 rounded-[24px] bg-[#FBF8F3] p-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "client" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl p-5 text-sm leading-6 shadow-sm ${
                      message.type === "client"
                        ? "bg-[#1F3448] text-white"
                        : "bg-white text-[#1D2834]"
                    }`}
                  >
                    <div
                      className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                        message.type === "client"
                          ? "text-white/70"
                          : "text-[#A86846]"
                      }`}
                    >
                      {message.speaker}
                    </div>

                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={steps[stepIndex]?.placeholder}
                className="flex-1 rounded-2xl border border-[#CAD2DB] bg-[#FBF8F3] px-5 py-4 outline-none"
              />

              <button
                onClick={sendAnswer}
                className="rounded-2xl bg-[#1F3448] px-6 py-4 text-sm font-medium text-white hover:bg-[#2a4258]"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
