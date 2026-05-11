# Replace `src/app/client/page.js` with this

```jsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://fzsgilsvgmfvvhktghtq.supabase.co",
  "sb_publishable_YATmYcY-DNGjDXnbwmC0dA_NSx1J-rd"
);

const navItems = [
  "Dashboard",
  "Income",
  "Charity",
  "Savings",
  "Investments",
  "Bills",
  "Spending",
  "Assets",
  "Liabilities",
  "Goals",
];

export default function ClientPage() {
  const router = useRouter();

  const [familyName, setFamilyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

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
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-[280px] border-r border-[#E8DED2] bg-white lg:flex lg:flex-col">
          <div className="border-b border-[#E8DED2] px-8 py-8">
            <div className="text-2xl font-semibold tracking-tight">
              Henig Financial
            </div>

            <div className="mt-1 text-xs uppercase tracking-[0.24em] text-[#A86846]">
              Financial Clarity System
            </div>
          </div>

          <div className="flex-1 px-5 py-6">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition-all ${
                    activeTab === item
                      ? "bg-[#1F3448] text-white shadow-sm"
                      : "text-[#5F6977] hover:bg-[#F6F1EA]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8DED2] p-5">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/login");
              }}
              className="w-full rounded-2xl border border-[#D7CDC1] px-4 py-3 text-sm hover:bg-[#F6F1EA]"
            >
              Log out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-14">

            {/* Mobile Header */}
            <div className="mb-8 lg:hidden">
              <div className="text-2xl font-semibold tracking-tight">
                Henig Financial
              </div>

              <div className="mt-1 text-xs uppercase tracking-[0.24em] text-[#A86846]">
                Financial Clarity System
              </div>
            </div>

            {/* Top AI Section */}
            <div className="rounded-[34px] border border-[#E8DED2] bg-white p-8 shadow-[0_18px_44px_rgba(29,40,52,0.06)]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
                    WELCOME {familyName.toUpperCase()} FAMILY
                  </div>

                  <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                    Your Financial Clarity Dashboard
                  </h1>

                  <p className="mt-4 max-w-3xl text-lg leading-8 text-[#5F6977]">
                    Simplicity brings clarity. This is your private financial
                    command center where we organize your money, priorities,
                    goals, and long-term direction together.
                  </p>
                </div>

                <div className="min-w-[260px] rounded-[28px] bg-[#FBF8F3] p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A86846]">
                    AI Financial Guide
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#5F6977]">
                    Welcome back. Ready to continue building your clarity plan?
                  </p>

                  <button className="mt-5 rounded-2xl bg-[#1F3448] px-5 py-3 text-sm font-medium text-white hover:bg-[#2a4258]">
                    Continue Intake
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-[28px] border border-[#E8DED2] bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A86846]">
                  Your Number
                </div>

                <div className="mt-4 text-4xl font-semibold tracking-tight">
                  —
                </div>

                <div className="mt-2 text-sm text-[#5F6977]">
                  Income minus expenses
                </div>
              </div>

              <div className="rounded-[28px] border border-[#E8DED2] bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A86846]">
                  Monthly Income
                </div>

                <div className="mt-4 text-4xl font-semibold tracking-tight">
                  —
                </div>

                <div className="mt-2 text-sm text-[#5F6977]">
                  All income sources combined
                </div>
              </div>

              <div className="rounded-[28px] border border-[#E8DED2] bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A86846]">
                  Monthly Expenses
                </div>

                <div className="mt-4 text-4xl font-semibold tracking-tight">
                  —
                </div>

                <div className="mt-2 text-sm text-[#5F6977]">
                  Total monthly outflow
                </div>
              </div>

              <div className="rounded-[28px] border border-[#E8DED2] bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A86846]">
                  Net Worth
                </div>

                <div className="mt-4 text-4xl font-semibold tracking-tight">
                  —
                </div>

                <div className="mt-2 text-sm text-[#5F6977]">
                  Assets minus liabilities
                </div>
              </div>
            </div>

            {/* CSIBS Section */}
            <div className="mt-8 rounded-[34px] border border-[#E8DED2] bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
                    CSIBS Method
                  </div>

                  <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                    Your Priority Allocation System
                  </h2>
                </div>
              </div>

              <div className="mt-8 space-y-6">

                {[
                  ["Charity", "10–20%", "0%"],
                  ["Savings", "5–10%", "0%"],
                  ["Investments", "5–10%", "0%"],
                  ["Bills", "50–60%", "0%"],
                  ["Spending", "20–30%", "0%"],
                ].map(([name, range, value]) => (
                  <div key={name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">{name}</span>
                        <span className="ml-2 text-[#5F6977]">
                          Target: {range}
                        </span>
                      </div>

                      <div className="font-medium">{value}</div>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#EFE7DC]">
                      <div className="h-full w-0 rounded-full bg-[#4D7C57]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Tab Area */}
            <div className="mt-8 rounded-[34px] border border-[#E8DED2] bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
                {activeTab}
              </div>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {activeTab} Section
              </h2>

              <p className="mt-4 max-w-2xl text-[#5F6977] leading-7">
                This section will soon contain editable financial data, AI-assisted organization, and spreadsheet-style management for your {activeTab.toLowerCase()} information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

Then:

1. Save
2. Commit changes
3. Refresh `/client`

This is the real layout foundation of the platform.
