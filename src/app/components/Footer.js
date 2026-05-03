export default function Footer() {
  return (
    <footer className="bg-[#152432] text-white mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-14">
        <div className="text-xl font-semibold">Henig Financial</div>

        <p className="mt-3 text-white/70">
          Clear plan. Calm guidance. Real family life.
        </p>

        <div className="mt-6 space-y-2 text-white/80">
          <div>(917) 548-1646</div>
          <div>info@henigfinancial.com</div>
        </div>

        <a
          href="https://calendly.com/shmilyhenig/consult"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-xl bg-white px-5 py-3 text-[#152432]"
        >
          Book a Clarity Call
        </a>
      </div>
    </footer>
  );
}
