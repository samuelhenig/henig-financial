"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (
      window.location.hash.includes("access_token") &&
      window.location.hash.includes("type=recovery")
    ) {
      setResetMode(true);
    }
  }, []);

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function loginUser(e) {
    e.preventDefault();

    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    });

    setLoading(false);

    if (error) {
      setMessage("Login failed: " + error.message);
      return;
    }

    if (!data?.session) {
      setMessage("Login failed: no session was created.");
      return;
    }

    window.location.href = "/client";
  }

  async function resetPassword() {
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setMessage("Please enter your email first.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: "https://www.henigfinancial.com/login",
    });

    setLoading(false);

    if (error) {
      setMessage("Reset failed: " + error.message);
      return;
    }

    setMessage("Password reset email sent. Check your inbox.");
  }

  async function updatePassword(e) {
    e.preventDefault();

    setMessage("");

    if (!newPassword || newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      setMessage("Password update failed: " + error.message);
      return;
    }

    setMessage("Password updated. You can now log in.");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
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
            {resetMode ? "Reset Password" : "Client Login"}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">
            {resetMode ? "Create new password" : "Welcome back"}
          </h1>

          <p className="mt-4 text-[#5F6977]">
            {resetMode
              ? "Enter your new password below."
              : "Log in to access your private financial clarity portal."}
          </p>

          {message && (
            <div className="mt-5 rounded-2xl border border-[#E6D8C8] bg-[#FBF8F3] p-4 text-sm">
              {message}
            </div>
          )}

          {resetMode ? (
            <form onSubmit={updatePassword} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
                  placeholder="New password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#20344C] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          ) : (
            <form onSubmit={loginUser} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
                  placeholder="you@example.com"
                  autoComplete="email"
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
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#20344C] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              <button
                type="button"
                onClick={resetPassword}
                disabled={loading}
                className="w-full text-sm font-medium text-[#A86846] hover:underline disabled:opacity-60"
              >
                Forgot password?
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
