"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

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

  const handleLogin = async (e) => {
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
    } else {
      router.push("/client");
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF8F3] flex items-center justify-center px-4 relative">
      
      {/* Back button */}
      <a
        href="/"
        className="absolute top-6 right-6 text-sm border border-[#CAD2DB] px-4 py-2 rounded-xl text-[#1D2834] hover:bg-[#F4EFE8]"
      >
        Back to Website
      </a>

      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E9DFD3] p-8 shadow-sm">
        
        <div className="text-center mb-6">
          <div className="text-2xl font-semibold text-[#1D2834]">
            Henig Financial
          </div>
          <div className="text-xs tracking-[0.25em] text-[#A86846] mt-1">
            CLIENT PORTAL
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full rounded-xl border border-[#CAD2DB] px-4 py-3 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-xl border border-[#CAD2DB] px-4 py-3 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#1D3448] text-white py-3 text-sm font-medium hover:opacity-90"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-[#6B7C8F] text-center mt-6">
          Access your private Clarity Portal and continue your financial picture.
        </p>
      </div>
    </main>
  );
}
