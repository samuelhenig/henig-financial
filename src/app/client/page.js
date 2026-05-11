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
    question:
      "What is your approximate monthly mortgage or rent payment?",
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

    // SAVE MORTGAGE TO DATABASE
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
            <div className="text-2xl font-semibold">
              Henig Financial
            </div>

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

        <div className="mt-10 rounded-[32px] border border-[#E8DED2] bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
                Guided Intake
              </div>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Let’s build your financial picture
              </h2>
            </div>

            {!intakeOpen && (
              <button
                onClick={startIntake}
                className="rounded-2xl bg-[#1F3448] px-5 py-3 text-sm font-medium text-white hover:bg-[#2a4258]"
              >
                Start Intake
              </button>
            )}
          </div>

          {intakeOpen && (
            <>
              <div className="space-y-4 rounded-[24px] bg-[#FBF8F3] p-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "client"
                        ? "justify-end"
                        : "justify-start"
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}
