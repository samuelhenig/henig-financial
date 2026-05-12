"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  async function loadExpenses() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setExpenses(data || []);
  }

  async function addExpense(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User not logged in.");
      return;
    }

    if (!name || !category || !amount) {
      alert("Please fill out all fields.");
      return;
    }

    const { error } = await supabase.from("expenses").insert([
      {
        user_id: user.id,
        name,
        category,
        amount: Number(amount),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setCategory("");
    setAmount("");

    loadExpenses();
  }

  async function deleteExpense(id) {
    await supabase.from("expenses").delete().eq("id", id);

    loadExpenses();
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-6 py-8 text-[#1D2834]">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Expenses</h1>

        <p className="mt-2 text-[#5F6977]">
          Track monthly bills and spending.
        </p>

        <form
          onSubmit={addExpense}
          className="mt-8 grid gap-4 rounded-3xl border border-[#E9DFD3] bg-white p-6 shadow-sm md:grid-cols-4"
        >
          <input
            type="text"
            placeholder="Expense name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-2xl border border-[#D8DDE3] px-4 py-3"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-2xl border border-[#D8DDE3] px-4 py-3"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="rounded-2xl border border-[#D8DDE3] px-4 py-3"
          />

          <button
            type="submit"
            className="rounded-2xl bg-[#20344C] px-6 py-3 text-white"
          >
            Add Expense
          </button>
        </form>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[#E9DFD3] bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-[#F4EFE8]">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-t border-[#EEE7DD]"
                >
                  <td className="px-6 py-4">{expense.name}</td>

                  <td className="px-6 py-4">
                    {expense.category}
                  </td>

                  <td className="px-6 py-4">
                    ${Number(expense.amount).toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {expenses.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-[#5F6977]"
                  >
                    No expenses added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
