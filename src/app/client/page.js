"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fzsgilsvgmfvvhktghtq.supabase.co",
  "sb_publishable_YATmYcY-DNGjDXnbwmC0dA_NSx1J-rd"
);

export default function ClientPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setLoading(false);
    }

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF8F3] text-[#1D2834]">
        Loading your dashboard...
      </div>
    );
  }

  const familyName = "Henig";

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
              window.location.href = "/login";
            }}
            className="rounded-2xl border border-[#CAD2DB] px-5 py-3 text-sm hover:bg-[#F4EFE8]"
          >
            Log out
          </button>
        </div>

        <div className="rounded-[36px] border border-[#E8DED2] bg-white p-10 shadow-[0_22px_54px_rgba(29,40,52,0.08)]">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
            WELCOME {familyName.toUpperCase()} FAMILY
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Your Financial Clarity Dashboard
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5F6977]">
            This is your private clarity space. Everything we build here will
            stay organized, structured, and fully tailored to your family.
          </p>
        </div>
      </div>
    </main>
  );
}
