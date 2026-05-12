import Link from "next/link";

export default function PortalSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-[#E9DFD3] bg-white px-5 py-6 md:block">
      <div className="mb-8">
        <div className="text-xl font-semibold">Henig Financial</div>
        <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[#A86846]">
          Client Portal
        </div>
      </div>

      <nav className="space-y-2">
        <Link href="/client" className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-[#F4EFE8]">
          Dashboard
        </Link>

        <Link href="/client/income" className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-[#F4EFE8]">
          Income
        </Link>

        <Link href="/client/expenses" className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-[#F4EFE8]">
          Expenses
        </Link>

        <Link href="/client/assets" className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-[#F4EFE8]">
          Assets
        </Link>

        <Link href="/client/liabilities" className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-[#F4EFE8]">
          Liabilities
        </Link>

        <Link href="/client/goals" className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-[#F4EFE8]">
          Goals
        </Link>
      </nav>
    </aside>
  );
}
