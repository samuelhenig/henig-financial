"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import PortalSidebar from "../../components/PortalSidebar";

export default function AssetsPage() {
  const [assets, setAssets] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Bank Account");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadAssets() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("assets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setAssets(data || []);
    setLoading(false);
  }

  async function addAsset(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User not logged in.");
      return;
    }

    if (!name.trim() || !category || !amount) {
      alert("Please fill out asset name, category, and amount.");
      return;
    }

    const { error } = await supabase.from("assets").insert([
      {
        user_id: user.id,
        name: name.trim(),
        category,
        amount: Number(amount),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setCategory("Bank Account");
    setAmount("");

    loadAssets();
  }

  async function deleteAsset(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("assets").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadAssets();
  }

  useEffect(() => {
    loadAssets();
  }, []);

  const totalAssets = assets.reduce((sum, asset) => {
    return sum + Number(asset.amount || 0);
  }, 0);

  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="flex min-h-screen">
        <PortalSidebar />

        <section className="flex-1 px-6 py-8 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold">Assets</h1>

                <p className="mt-2 text-[#5F6977]">
                  Track cash, savings, investments, property, and other assets.
                </p>
              </div>

              <div className="rounded-3xl border border-[#E9DFD3] bg-white px-6 py-4 shadow-sm">
                <div className="text-sm text-[#5F6977]">Total Assets</div>
                <div className="mt-1 text-2xl font-semibold">
                  ${totalAssets.toLocaleString()}
                </div>
              </div>
            </div>

            <form
              onSubmit={addAsset}
              className="mt-8 grid gap-4 rounded-3xl border border-[#E9DFD3] bg-white p-6 shadow-sm md:grid-cols-[1.2fr_1fr_1fr_auto]"
            >
              <input
                type="text"
                placeholder="Asset name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              >
                <option>Bank Account</option>
                <option>Savings</option>
                <option>Emergency Fund</option>
                <option>Investments</option>
                <option>Retirement</option>
                <option>Home</option>
                <option>Vehicle</option>
                <option>Business</option>
                <option>Other</option>
              </select>

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-2xl border border-[#D8DDE3] px-4 py-3 outline-none focus:border-[#A86846]"
              />

              <button
                type="submit"
                className="rounded-2xl bg-[#20344C] px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                Add Asset
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
                  {loading && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-10 text-center text-[#5F6977]"
                      >
                        Loading assets...
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    assets.map((asset) => (
                      <tr
                        key={asset.id}
                        className="border-t border-[#EEE7DD]"
                      >
                        <td className="px-6 py-4">{asset.name || "-"}</td>

                        <td className="px-6 py-4">
                          {asset.category || "-"}
                        </td>

                        <td className="px-6 py-4">
                          ${Number(asset.amount || 0).toFixed(2)}
                        </td>

                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => deleteAsset(asset.id)}
                            className="font-medium text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                  {!loading && assets.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-10 text-center text-[#5F6977]"
                      >
                        No assets added yet.
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
