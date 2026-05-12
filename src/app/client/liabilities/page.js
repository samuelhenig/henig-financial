"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import PortalSidebar from "../../components/PortalSidebar";

export default function LiabilitiesPage() {
  const [liabilities, setLiabilities] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Credit Card");
  const [balance, setBalance] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadLiabilities() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("liabilities")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setLiabilities(data || []);
    setLoading(false);
  }

  async function addLiability(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User not logged in.");
      return;
    }

    if (!name.trim() || !category || !balance) {
      alert("Please fill out debt name, category, and balance.");
      return;
    }

    const { error } = await supabase.from("liabilities").insert([
      {
        user_id: user.id,
        name: name.trim(),
        category,
        balance: Number(balance),
        monthly_payment: Number(monthlyPayment || 0),
        interest_rate: Number(interestRate || 0),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setCategory("Credit Card");
    setBalance("");
    setMonthlyPayment("");
    setInterestRate("");

    loadLiabilities();
  }

  async function deleteLiability(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this debt?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("liabilities")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadLiabilities();
  }

  useEffect(() => {
    loadLiabilities();
  }, []);

  const totalDebt = liabilities.reduce((sum, item) => {
    return sum + Number(item.balance || 0);
  }, 0);

  const totalMonthlyPayments = liabilities.reduce((sum, item) => {
    return sum + Number(item.monthly_payment || 0);
  }, 0);

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="flex min-h-screen">
        <PortalSidebar />

        <section className="flex-1 px-6 py-8 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold">Liabilities</h1>

                <p className="mt-2 text-[#5F6977]">
                  Track debts, loans, balances, payments, and interest rates.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#E9DFD3] bg-white px-6 py-4 shadow-sm">
                  <div className="text-sm text-[#5F6977]">Total Debt</div>
                  <div className="mt-1 text-2xl font-semibold">
                    ${totalDebt.toLocaleString()}
                  </div>
                </div>

                <div className="rounded-3xl border border-[#E9DFD3] bg-white px-6 py-4 shadow-sm">
                  <div className="text-sm text-[#5F6977]">
                    Monthly Payments
                  </div>
                  <div className="mt-1 text-2xl font-semibold">
                    ${totalMonthlyPayments.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={addLiability}
              className="mt-8 grid gap-4 rounded-3xl border border-[#E9DFD3] bg-white p-6 shadow-sm md:grid-cols-6"
            >
              <input
                type="text"
                placeholder="Debt name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846] md:col-span-2"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              >
                <option>Credit Card</option>
                <option>Personal Loan</option>
                <option>Student Loan</option>
                <option>Auto Loan</option>
                <option>Mortgage</option>
                <option>Medical Debt</option>
                <option>Business Debt</option>
                <option>Other</option>
              </select>

              <input
                type="number"
                placeholder="Balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              />

              <input
                type="number"
                placeholder="Monthly payment"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              />

              <input
                type="number"
                placeholder="Interest %"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              />

              <button
                type="submit"
                className="rounded-2xl bg-[#20344C] px-6 py-3 font-medium text-white transition hover:opacity-90 md:col-span-6"
              >
                Add Liability
              </button>
            </form>

            <div className="mt-8 overflow-hidden rounded-3xl border border-[#E9DFD3] bg-white shadow-sm">
              <table className="w-full">
                <thead className="bg-[#F4EFE8]">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Balance</th>
                    <th className="px-6 py-4 text-left">Payment</th>
                    <th className="px-6 py-4 text-left">Interest</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-[#5F6977]"
                      >
                        Loading liabilities...
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    liabilities.map((item) => (
                      <tr key={item.id} className="border-t border-[#EEE7DD]">
                        <td className="px-6 py-4">{item.name || "-"}</td>
                        <td className="px-6 py-4">{item.category || "-"}</td>
                        <td className="px-6 py-4">
                          ${Number(item.balance || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          ${Number(item.monthly_payment || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          {Number(item.interest_rate || 0).toFixed(2)}%
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => deleteLiability(item.id)}
                            className="font-medium text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                  {!loading && liabilities.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-[#5F6977]"
                      >
                        No liabilities added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
