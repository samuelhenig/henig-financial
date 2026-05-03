"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://fzsgilsvgmfvvhktghtq.supabase.co",
  "sb_publishable_YATmYcY-DNGjDXnbwmC0dA_NSx1J-rd"
);

export default function ClientPage() {
  const router = useRouter();
  const [familyName, setFamilyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [answer, setAnswer] = useState("");

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
              We’ll guide you step-by-step to organize income, expenses, assets,
              liabilities, and your full financial picture.
            </p>

            <button
              onClick={() => setIntakeOpen(true)}
              className="mt-6 rounded-2xl bg-[#1F3448] px-5 py-3 text-sm font-medium text-white hover:bg-[#2a4258]"
            >
              Start Clarity Intake
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
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
                  Guided Intake
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Let’s build your financial picture
                </h2>
              </div>

              <div className="text-right text-sm text-[#5F6977]">
                <div>0% done</div>
                <div>About 45–60 min total</div>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#FBF8F3] p-6">
              <div className="max-w-2xl rounded-2xl bg-white p-5 text-sm leading-6 text-[#1D2834] shadow-sm">
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A86846]">
                  Clarity Coach
                </div>
                Hi {familyName} family, welcome. I’m ready whenever you are —
                let’s get started.
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="flex-1 rounded-2xl border border-[#CAD2DB] bg-[#FBF8F3] px-5 py-4 outline-none focus:border-[#A86846]"
              />

              <button className="rounded-2xl bg-[#1F3448] px-6 py-4 text-sm font-medium text-white hover:bg-[#2a4258]">
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
