import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <Header />

      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-md rounded-2xl border border-[#E8DED2] bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-center">
            Client Login
          </h1>

          <p className="mt-3 text-center text-[#5F6977]">
            Access your personal financial dashboard.
          </p>

          <div className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border px-4 py-3"
            />

            <button className="w-full rounded-xl bg-[#1F3448] px-4 py-3 text-white">
              Log in
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
