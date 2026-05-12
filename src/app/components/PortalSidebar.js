"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortalSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/client",
    },
    {
      label: "Income",
      href: "/income",
    },
    {
      label: "Expenses",
      href: "/expenses",
    },
    {
      label: "Assets",
      href: "/assets",
    },
    {
      label: "Liabilities",
      href: "/liabilities",
    },
  ];

  return (
    <aside className="w-[320px] border-r border-[#E6D8C8] bg-white">
      <div className="border-b border-[#E6D8C8] px-8 py-10">
        <div className="text-2xl font-semibold tracking-tight">
          Henig Financial
        </div>

        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#A86846]">
          Financial Clarity System
        </div>
      </div>

      <nav className="px-6 py-8">
        <div className="space-y-3">

          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "block rounded-2xl bg-[#20344C] px-4 py-3 text-sm font-medium text-white"
                    : "block rounded-2xl px-4 py-3 text-sm font-medium text-[#5F6977] transition hover:bg-[#F4EFE8]"
                }
              >
                {item.label}
              </Link>
            );
          })}

        </div>
      </nav>
    </aside>
  );
}
