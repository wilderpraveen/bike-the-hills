import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteriorHero from "@/components/shared/InteriorHero";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Spiti Valley Destinations | Bike the Hills",
  description:
    "Discover the villages, valleys, and high desert landscapes featured in Bike the Hills cycling journeys.",
};

export default function DestinationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <InteriorHero
          eyebrow="Explore the Himalayas"
          title="Places worth riding to"
          description="Go beyond the famous viewpoints and discover the villages and mountain landscapes that make Spiti unforgettable."
          image="/images/langza1.jpg"
        />

        <section className="bg-stone-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#12372A]">
                Slow down and look around
              </p>
              <h2 className="mt-4 font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">
                A few places along the way
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                Each stop offers its own view of life in the high desert. These
                are some of the places our journeys are made to experience.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {destinations.map((destination, index) => (
                <article
                  key={destination.slug}
                  id={destination.slug}
                  className="scroll-mt-28 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={`Landscape around ${destination.name}, Spiti`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-[#12372A]">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="font-playfair text-3xl font-semibold text-gray-900">
                      {destination.name}
                    </h3>
                    <p className="mt-4 leading-7 text-gray-600">
                      {destination.description}
                    </p>
                    <Link
                      href="/tours"
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-[#12372A] transition-colors hover:text-[#C79A3B]"
                    >
                      Find a ride here <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
