import Link from "next/link";
import { ArrowUpRight, Bike, Mail, MapPin } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Expeditions", href: "/#expeditions" },
  { label: "Destinations", href: "/#destinations" },
];

const expeditionLinks = [
  {
    label: "Cold Desert Expedition",
    href: "/expeditions/cold-desert-expedition",
  },
];

const linkClass =
  "inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8B878]";

export default function Footer() {
  return (
    <footer className="w-full bg-[#102C23] text-white">
      <div className="mx-auto w-full max-w-screen-2xl px-6 py-16 sm:px-8 sm:py-18 lg:px-12 lg:py-20">
        <div className="grid min-w-0 gap-12 border-b border-white/15 pb-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,0.95fr)_minmax(0,0.95fr)] lg:gap-10 lg:pb-14 xl:gap-14">
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center gap-3 rounded-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#D8B878]/50 bg-white/4 text-[#D8B878]">
                <Bike size={21} aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold tracking-wide sm:text-xl">
                Bike the Hills
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
              Discover the Himalayas by bicycle. Join us for thoughtfully guided
              cycling expeditions through Spiti, Kinnaur and beyond.
            </p>

            <Link
              href="/#expeditions"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#D8B878] transition-colors hover:text-white focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8B878]"
            >
              Ride further. Experience more.
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Explore">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D8B878]">
              Explore
            </h2>
            <ul className="mt-6 space-y-4">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Our expeditions">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D8B878]">
              Our expeditions
            </h2>
            <ul className="mt-6 space-y-4">
              {expeditionLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D8B878]">
              Get in touch
            </h2>
            <address className="mt-6 flex flex-col items-start gap-5 not-italic">
              <div className="flex items-start gap-3 text-sm leading-6 text-white/70">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#D8B878]"
                  aria-hidden="true"
                />
                <span>
                  Kaza, Spiti Valley
                  <br />
                  Himachal Pradesh, India
                </span>
              </div>

              <a href="mailto:wilderpraveen@gmail.com" className={linkClass}>
                <Mail
                  size={17}
                  className="shrink-0 text-[#D8B878]"
                  aria-hidden="true"
                />
                Email us
              </a>

              <a
                href="https://www.instagram.com/bikethehills"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                <FaInstagram
                  size={17}
                  className="shrink-0 text-[#D8B878]"
                  aria-hidden="true"
                />
                Follow our rides
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>© {new Date().getFullYear()} Bike the Hills. All rights reserved.</p>
          <p className="tracking-wide">Made for the mountains.</p>
          <Link
            href="#top"
            className="w-fit transition-colors hover:text-white focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8B878]"
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
