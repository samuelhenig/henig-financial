"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser() {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/client";
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-6 py-20 text-[#1D2834]">
      <div className="mx-auto max-w-md rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
          Client Login
        </div>

        <h1 className="text-4xl font-semibold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-4 text-[#5F6977]">
          Log in to access your private financial clarity portal.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              placeholder="Password"
            />
          </div>

          <button
            type="button"
            onClick={loginUser}
            className="w-full rounded-2xl bg-[#20344C] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Log In
          </button>
        </div>
      </div>
    </main>
  );
}
