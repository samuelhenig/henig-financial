"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// ✅ IMPORTANT: Replace with your REAL key
const supabase = createClient(
  "https://fzsgilsvgmfvvhktghtq.supabase.co",
  "sb_publishable_YATmYcY-DNGjDXnbwmC0dA_NSx1J-rd"
);

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/client");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FBF8F3] px-6 text-[#1D2834]">
      {/* Back button */}
      <Link
        href="/"
        className="absolute right-6 top-6 rounded-2xl border border-[#CAD2DB] px-5 py-3 text-sm font-medium text-[#1D2834] hover:bg-[#F4EFE8]"
      >
        Back to Website
      </Link>

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#F1E7DB_0%,transparent_42%)]" />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-[34px] border border-[#E8DED2] bg-white/90 p-8 shadow-[0_28px_70px_rgba(29,40,52,0.12)] backdrop-blur">
        <div className="text-center">
          <div className="text-3xl font-semibold tracking-tight">
            Henig Financial
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
            Client Portal
          </div>
        </div>

        <form onSubmit={handleLogin} className="mt-9 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-[#CAD2DB] bg-[#FBF8F3] px-5 py-4 outline-none focus:border-[#A86846]"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-[#CAD2DB] bg-[#FBF8F3] px-5 py-4 outline-none focus:border-[#A86846]"
          />

          {error && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#1F3448] px-5 py-4 font-medium text-white hover:bg-[#2a4258] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm leading-6 text-[#5F6977]">
          Access your private Clarity Portal and continue your financial picture.
        </p>
      </div>
    </main>
  );
}
