import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <Header />

      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[34px] border border-[#E8DED2] bg-white shadow-[0_22px_54px_rgba(29,40,52,0.08)] md:grid-cols-[0.9fr_1.1fr]">
          
          <div className="bg-[#152432] p-8 text-white md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D7AA87]">
              Client Portal
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight">
              Your financial clarity, in one place.
            </h1>

            <p className="mt-5 leading-7 text-white/72">
              Access your private dashboard, documents, notes, and next steps
              from your work with Henig Financial.
            </p>

            <div className="mt-8 space-y-4 text-white/82">
              <div>• Private client access</div>
              <div>• Organized financial guidance</div>
              <div>• Clear next steps between sessions</div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <h2 className="text-2xl font-semibold">Log in to your portal</h2>

            <p className="mt-3 leading-7 text-[#5F6977]">
              Enter your email and password to continue.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#CAD2DB] bg-[#FBF8F3] px-4 py-4 outline-none focus:border-[#A86846]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-[#CAD2DB] bg-[#FBF8F3] px-4 py-4 outline-none focus:border-[#A86846]"
                />
              </div>

              <button
                type="button"
                className="w-full rounded-2xl bg-[#1F3448] px-5 py-4 font-medium text-white hover:bg-[#2c465d]"
              >
                Log in
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-[#FBF8F3] p-5 text-sm leading-6 text-[#5F6977]">
              Need access? Client portal accounts are created for active Henig
              Financial clients.
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
