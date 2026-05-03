export default function Footer() {
  return (
    <footer className="bg-[#152432] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:px-10 lg:px-14">
        <div>
          <div className="text-2xl font-semibold">Henig Financial</div>
          <p className="mt-4 leading-7 text-white/68">
            Clear plan. Calm guidance. Real family life.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D7AA87]">
            Contact
          </div>
          <div className="mt-4 space-y-3 text-white/74">
            <a href="tel:+19175481646" className="block hover:text-white">
              (917) 548-1646
            </a>
            <a
              href="mailto:info@henigfinancial.com"
              className="block hover:text-white"
            >
              info@henigfinancial.com
            </a>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D7AA87]">
            Start
          </div>
          <a
            href="https://calendly.com/shmilyhenig/consult"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-2xl bg-white px-5 py-3 text-sm font-medium text-[#152432]"
          >
            Book a Clarity Call
          </a>
        </div>
      </div>
    </footer>
  );
}
