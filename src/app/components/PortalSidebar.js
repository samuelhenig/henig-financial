"use client";

import Link from "next/link";
import { useState } from "react";

export default function PortalSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { label: "Dashboard", href: "/client", short: "D" },
    { label: "Income", href: "/client/income", short: "I" },
    { label: "Expenses", href: "/client/expenses", short: "E" },
    { label: "Assets", href: "/client/assets", short: "A" },
    { label: "Liabilities", href: "/client/liabilities", short: "L" },
    { label: "Goals", href: "/client/goals", short: "G" },
  ];

  return (
    <aside
      className={`hidden min-h-screen border-r border-[#E9DFD3] bg-white px-4 py-5 transition-all duration-300 md:block ${
        collapsed ? "w-20" : "w-52"
      }`}
    >
      <div className="mb-8 flex items-start justify-between gap-2">
        {!collapsed && (
          <div>
            <div className="text-lg font-semibold leading-tight">
              Henig Financial
            </div>

            <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#A86846]">
              Client Portal
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-xl border border-[#E9DFD3] px-2 py-1 text-xs hover:bg-[#F4EFE8]"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-2xl px-3 py-2.5 text-sm font-medium transition hover:bg-[#F4EFE8] ${
              collapsed ? "text-center" : ""
            }`}
            title={link.label}
          >
            {collapsed ? link.short : link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
