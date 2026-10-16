import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteriorHero from "@/components/shared/InteriorHero";
import ExpeditionCard from "@/components/cards/ExpeditionCard";
import { expeditions } from "@/data/expeditions";

export const metadata: Metadata = {
  title: "Himalayan Cycling Tours | Bike the Hills",
  description:
    "Explore guided cycling expeditions through Spiti and the Himalayas with Bike the Hills.",
};

export default function ToursPage() {
  return (
    <>
      <Navbar />
      <main>
        <InteriorHero
          eyebrow="Ride beyond the ordinary"
          title="Find your next Himalayan ride"
          description="Choose a guided expedition through high mountain deserts, remote villages, and the landscapes of Himachal Pradesh."
          image="/images/routes/spiti.jpg"
        />

        <section className="bg-stone-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#12372A]">
                Guided expeditions
              </p>
              <h2 className="mt-4 font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">
                Choose your next expedition
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                Each journey is built around its own terrain, pace, and
                character. Open an expedition to see its details and enquire
                about planning your ride.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {expeditions.map((expedition) => (
                <ExpeditionCard key={expedition.id} {...expedition} />
              ))}
            </div>

            <p className="mt-10 text-sm leading-6 text-gray-500">
              Dates, availability, and final trip arrangements are confirmed
              with the Bike the Hills team.
            </p>
          </div>
        </section>

        <section className="bg-[#12372A] py-16 text-white sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E4C982]">
                Need help choosing?
              </p>
              <h2 className="mt-3 font-playfair text-3xl font-bold sm:text-4xl">
                Let’s plan a ride that fits you.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center rounded-lg bg-white px-6 py-3.5 font-semibold text-[#12372A] transition-colors hover:bg-stone-100"
            >
              Talk to our team
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
