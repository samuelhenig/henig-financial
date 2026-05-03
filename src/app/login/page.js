export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[32px] border border-[#E8DED2] bg-white p-8 shadow-[0_22px_54px_rgba(29,40,52,0.08)]">
          
          <div className="text-center">
            <div className="text-2xl font-semibold">Henig Financial</div>
            <div className="mt-2 text-xs uppercase tracking-[0.26em] text-[#A86846]">
              Client Portal
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl border border-[#CAD2DB] bg-[#FBF8F3] px-5 py-4 outline-none focus:border-[#A86846]"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-[#CAD2DB] bg-[#FBF8F3] px-5 py-4 outline-none focus:border-[#A86846]"
            />

            <a
              href="/client"
              className="block w-full rounded-2xl bg-[#1F3448] px-5 py-4 text-center font-medium text-white hover:bg-[#2a4258]"
            >
              Login
            </a>
          </div>

          <p className="mt-6 text-center text-sm leading-6 text-[#5F6977]">
            Access your private Clarity Portal and continue your financial picture.
          </p>

        </div>
      </div>
    </main>
  );
}
