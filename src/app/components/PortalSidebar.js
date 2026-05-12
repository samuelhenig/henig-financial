"use client";

import Link from "next/link";
import { useState } from "react";

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

  return (
    <aside
      className={`hidden min-h-screen flex-col border-r border-[#E9DFD3] bg-white transition-all duration-300 md:flex ${
        collapsed ? "w-14 px-2 py-5" : "w-44 px-4 py-5"
      }`}
    >
      {!collapsed && (
        <div className="mb-8">
          <div className="text-lg font-semibold leading-tight">
            Henig Financial
          </div>

          <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#A86846]">
            Client Portal
          </div>
        </div>
      )}

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

      <div className="mt-auto">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full rounded-xl border border-[#E9DFD3] px-2 py-2 text-sm hover:bg-[#F4EFE8]"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
    </aside>
  );
}
