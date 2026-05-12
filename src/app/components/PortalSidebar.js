"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PortalSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { label: "Dashboard", href: "/client" },
    { label: "Income", href: "/client/income" },
    { label: "Expenses", href: "/client/expenses" },
    { label: "Assets", href: "/client/assets" },
    { label: "Liabilities", href: "/client/liabilities" },
    { label: "Goals", href: "/client/goals" },
  ];

  async function logout() {
    await supabase.auth.signOut();

    window.location.href = "/login";
  }

  return (
    <aside
      className={`hidden min-h-screen flex-col border-r border-[#E9DFD3] bg-white transition-all duration-300 md:flex ${
        collapsed ? "w-16 px-2 py-5" : "w-52 px-4 py-5"
      }`}
    >
      <div className="mb-8 flex items-start justify-between gap-2">
        {!collapsed && (
          <div>
            <div className="text-xl font-semibold leading-tight">
              Henig Financial
            </div>

            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#A86846]">
              Client Portal
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-xl border border-[#E9DFD3] px-2 py-1 text-sm hover:bg-[#F4EFE8]"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="space-y-1">
        {!collapsed &&
          links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-2xl px-3 py-2.5 text-sm font-medium transition hover:bg-[#F4EFE8]"
            >
              {link.label}
            </Link>
          ))}
      </nav>

      {!collapsed && (
        <div className="mt-8">
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-2xl border border-[#E9DFD3] px-3 py-2.5 text-left text-sm font-medium text-[#A86846] transition hover:bg-[#F4EFE8]"
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
