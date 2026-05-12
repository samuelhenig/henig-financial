"use client";

import { useEffect, useRef, useState } from "react";
import PortalSidebar from "../components/PortalSidebar";
import { supabase } from "../../lib/supabase";

export default function ClientPage() {
  const [messages, setMessages] = useState([]);
  const [chatText, setChatText] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [sending, setSending] = useState(false);
  const chatBoxRef = useRef(null);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }

  async function loadMessages() {
    setLoadingMessages(true);

    const user = await getUser();

    if (!user) {
      setLoadingMessages(false);
      return;
    }

    const { data, error } = await supabase
      .from("ai_messages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      alert(error.message);
      setLoadingMessages(false);
      return;
    }

    setMessages(data || []);
    setLoadingMessages(false);

    setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }, 50);
  }

  async function loadFinancialContext(userId) {
    const [incomeRes, expensesRes, assetsRes, liabilitiesRes, goalsRes] =
      await Promise.all([
        supabase.from("income").select("*").eq("user_id", userId),
        supabase.from("expenses").select("*").eq("user_id", userId),
        supabase.from("assets").select("*").eq("user_id", userId),
        supabase.from("liabilities").select("*").eq("user_id", userId),
        supabase.from("goals").select("*").eq("user_id", userId),
      ]);

    return {
      income: incomeRes.data || [],
      expenses: expensesRes.data || [],
      assets: assetsRes.data || [],
      liabilities: liabilitiesRes.data || [],
      goals: goalsRes.data || [],
    };
  }

  async function saveMessage(userId, role, message) {
    const { error } = await supabase.from("ai_messages").insert([
      {
        user_id: userId,
        role,
        message,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();

    const cleanMessage = chatText.trim();

    if (!cleanMessage || sending) return;

    const user = await getUser();

    if (!user) {
      alert("User not logged in.");
      return;
    }

    setSending(true);
    setChatText("");

    try {
      await saveMessage(user.id, "user", cleanMessage);
      await loadMessages();

      const context = await loadFinancialContext(user.id);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: cleanMessage,
          context,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "AI response failed.");
      }

      const aiReply =
        data?.reply ||
        "I’m sorry, I wasn’t able to respond right now.";

      await saveMessage(user.id, "assistant", aiReply);
      await loadMessages();
    } catch (error) {
      alert(error.message);
    }

    setSending(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="flex min-h-screen">
        <PortalSidebar />

        <section className="flex-1 px-10 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
              <div className="rounded-[2rem] border border-[#E6D8C8] bg-white p-10 shadow-sm">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                  Welcome Henig Family
                </div>

                <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  Your Financial Clarity Dashboard
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5F6977]">
                  Simplicity brings clarity. This is your private financial
                  command center where we organize your money, priorities,
                  goals, and long-term direction together.
                </p>
              </div>

              <div className="flex h-[500px] flex-col rounded-[2rem] border border-[#E6D8C8] bg-[#F8F4EF] p-6 shadow-sm">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                  AI Financial Guide
                </div>

                <div
                  ref={chatBoxRef}
                  className="min-h-0 flex-1 overflow-y-auto rounded-2xl bg-white p-4"
                >
                  {loadingMessages && (
                    <div className="text-sm text-[#5F6977]">
                      Loading chat...
                    </div>
                  )}

                  {!loadingMessages && messages.length === 0 && (
                    <div className="rounded-2xl bg-[#FBF8F3] p-4 text-sm leading-7 text-[#5F6977]">
                      Welcome back. Ask me what to work on next, or tell me what
                      changed in your money this month.
                    </div>
                  )}

                  <div className="space-y-3">
                    {messages.map((item) => (
                      <div
                        key={item.id}
                        className={`flex ${
                          item.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                            item.role === "user"
                              ? "bg-[#20344C] text-white"
                              : "bg-[#FBF8F3] text-[#5F6977]"
                          }`}
                        >
                          {item.message}
                        </div>
                      </div>
                    ))}

                    {sending && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-2xl bg-[#FBF8F3] px-4 py-3 text-sm leading-6 text-[#5F6977]">
                          Thinking...
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <form onSubmit={sendMessage} className="mt-4 shrink-0">
                  <textarea
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    placeholder="Ask your financial guide..."
                    className="h-20 w-full resize-none rounded-2xl border border-[#E6D8C8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A86846]"
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-3 w-full rounded-2xl bg-[#20344C] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Your Number", "—", "Income minus expenses"],
                ["Monthly Income", "—", "All income sources combined"],
                ["Monthly Expenses", "—", "Total monthly outflow"],
                ["Net Worth", "—", "Assets minus liabilities"],
              ].map(([title, value, subtitle]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-[#E6D8C8] bg-white p-7 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                    {title}
                  </div>

                  <div className="mt-7 text-4xl font-semibold tracking-tight">
                    {value}
                  </div>

                  <div className="mt-4 text-base text-[#5F6977]">
                    {subtitle}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-[#E6D8C8] bg-white p-10 shadow-sm">
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#A86846]">
                CSIBS Method
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                Your Priority Allocation System
              </h2>

              <div className="mt-8 space-y-7">
                {[
                  ["Charity", "10–20%"],
                  ["Savings", "5–10%"],
                  ["Investments", "5–10%"],
                  ["Bills", "50–60%"],
                  ["Spending", "20–30%"],
                ].map(([name, target]) => (
                  <div key={name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">{name}</span>{" "}
                        <span className="text-[#5F6977]">
                          Target: {target}
                        </span>
                      </div>

                      <div>0%</div>
                    </div>

                    <div className="h-3 rounded-full bg-[#EDE5DB]">
                      <div className="h-3 w-0 rounded-full bg-[#7CA982]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
