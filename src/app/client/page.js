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
    key: "ready",
    speaker: "Clarity Coach",
    question:
      "Hi {familyName} family, welcome. I’m ready whenever you are — let’s get started.",
    placeholder: "Type: I’m ready",
  },
  {
    key: "names",
    speaker: "Clarity Coach",
    question: "Great. Before we start, what are both of your first names?",
    placeholder: "Example: Shmily and Rachelly",
  },
  {
    key: "kids",
    speaker: "Clarity Coach",
    question:
      "Perfect. Just so I have a clear picture, how many kids do you have, and what are their ages?",
    placeholder: "Example: 4 kids — ages 14, 8, 3, and baby",
  },
  {
    key: "statements",
    speaker: "Clarity Coach",
    question:
      "Quick tip before we get into numbers: if you have your last 2–3 months of bank or credit card statements nearby, it can help make this more accurate. If not, no pressure — estimates are totally fine and we can refine later. Ready to move into income?",
    placeholder: "Type: ready",
  },
  {
    key: "income_person_one",
    speaker: "First income earner",
    question:
      "Let’s start with income. What are the different ways money comes in for you? For example: salary, business income, commissions, side work, rental income, or anything else.",
    placeholder: "List income sources here...",
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

  useEffect(() => {
    async function loadProfile() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("client_profiles")
        .select("family_name")
        .eq("user_id", userData.user.id)
        .single();

      setFamilyName(data?.family_name || "");
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  function formatQuestion(text) {
    return text.replace("{familyName}", familyName || "your");
  }

  function startIntake() {
    setIntakeOpen(true);
    setStepIndex(0);
    setMessages([
      {
        type: "coach",
        speaker: steps[0].speaker,
        text: formatQuestion(steps[0].question),
      },
    ]);
  }

  function sendAnswer() {
    if (!answer.trim()) return;

    const currentStep = steps[stepIndex];
    const userMessage = {
      type: "client",
      speaker: "You",
      text: answer.trim(),
    };

    const nextIndex = stepIndex + 1;
    const nextStep = steps[nextIndex];

    const newMessages = [...messages, userMessage];

    if (nextStep) {
      newMessages.push({
        type: "coach",
        speaker: nextStep.speaker,
        text: formatQuestion(nextStep.question),
      });

      setStepIndex(nextIndex);
    } else {
      newMessages.push({
        type: "coach",
        speaker: "Clarity Coach",
        text:
          "Great. That completes the first setup section. Next we’ll go one income source at a time so nothing gets missed or duplicated.",
      });
    }

    setMessages(newMessages);
    setAnswer("");
  }

  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);
  const currentStep = steps[stepIndex];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF8F3] text-[#1D2834]">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-14">
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

        <div className="rounded-[36px] border border-[#E8DED2] bg-white p-10 shadow-[0_22px_54px_rgba(29,40,52,0.08)]">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
            WELCOME {familyName ? familyName.toUpperCase() : ""} FAMILY
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Your Financial Clarity Dashboard
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5F6977]">
            This is your private space. Here we will build your full financial
            picture, track your progress, and guide each step of your clarity plan.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-[#E8DED2] bg-white p-8 shadow-[0_14px_34px_rgba(29,40,52,0.06)]">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
              Clarity Intake
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Start Your Clarity Plan
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#5F6977]">
              We’ll guide you one question at a time so your numbers become clear,
              organized, and much easier to work with.
            </p>

            <button
              onClick={startIntake}
              className="mt-6 rounded-2xl bg-[#1F3448] px-5 py-3 text-sm font-medium text-white hover:bg-[#2a4258]"
            >
              {intakeOpen ? "Restart Intake" : "Start Clarity Intake"}
            </button>
          </div>

          <div className="rounded-[28px] border border-[#E8DED2] bg-white p-8 shadow-[0_14px_34px_rgba(29,40,52,0.06)]">
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
                <span>—</span>
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
          <div className="mt-10 rounded-[32px] border border-[#E8DED2] bg-white p-8 shadow-[0_18px_44px_rgba(29,40,52,0.08)]">
            <div className="mb-6 flex items-center justify-between gap-6">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
                  Guided Intake
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Let’s build your financial picture
                </h2>
              </div>

              <div className="text-right text-sm text-[#5F6977]">
                <div>{progress}% done</div>
                <div>About 45–60 min total</div>
              </div>
            </div>

            <div className="mb-5 h-2 overflow-hidden rounded-full bg-[#F0E7DE]">
              <div
                className="h-full rounded-full bg-[#1F3448]"
                style={{ width: `${progress}%` }}
              />
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendAnswer();
                }}
                placeholder={currentStep?.placeholder || "Type your answer here..."}
                className="flex-1 rounded-2xl border border-[#CAD2DB] bg-[#FBF8F3] px-5 py-4 outline-none focus:border-[#A86846]"
              />

              <button
                onClick={sendAnswer}
                className="rounded-2xl bg-[#1F3448] px-6 py-4 text-sm font-medium text-white hover:bg-[#2a4258]"
              >
                Send
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#5F6977]">
              Everything here is private and confidential. Rough numbers are
              completely fine. You can pause anytime and come back later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
