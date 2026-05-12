export default function ExpensesPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] px-6 py-8 text-[#1D2834]">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Expenses</h1>

        <p className="mt-2 text-[#5F6977]">
          Track monthly bills, spending, and recurring expenses here.
        </p>

        <div className="mt-8 rounded-3xl border border-[#E9DFD3] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Expense Tracker</h2>

          <p className="mt-2 text-sm text-[#5F6977]">
            Next we’ll connect this page to Supabase so expenses can be added,
            edited, and deleted.
          </p>
        </div>
      </div>
    </main>
  );
}
