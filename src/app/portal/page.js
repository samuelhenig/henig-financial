export default function PortalPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] text-[#1D2834]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-14">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">Henig Financial</div>
            <div className="text-xs uppercase tracking-[0.26em] text-[#A86846]">
              Clarity Portal
            </div>
          </div>

          <a
            href="/"
            className="rounded-2xl border border-[#CAD2DB] px-5 py-3 text-sm font-medium hover:bg-[#F4EFE8]"
          >
            Back to Website
          </a>
        </div>

        <div className="rounded-[36px] border border-[#E8DED2] bg-white p-8 shadow-[0_22px_54px_rgba(29,40,52,0.08)]">
          
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#A86846]">
            Welcome
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Hi, welcome to your portal.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5F6977]">
            This is where your financial clarity system will live.
            Next step is connecting your live financial dashboard and guided intake.
          </p>

        </div>

      </div>
    </main>
  );
}
