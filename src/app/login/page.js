"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function loginUser() {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      alert("Please enter your full email and password.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    window.location.href = "/client";
  }

  async function resetPassword() {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      alert("Please enter your full email first.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: "https://www.henigfinancial.com/login",
    });

    if (error) {
      alert("Reset failed: " + error.message);
      return;
    }

    alert("Password reset email sent. Check your inbox.");
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-6 py-12 text-[#1D2834]">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-[#A86846] hover:underline"
        >
          ← Back to home
        </Link>

        <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-8 shadow-sm">
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

            <button
              type="button"
              onClick={resetPassword}
              className="w-full text-sm font-medium text-[#A86846] hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
