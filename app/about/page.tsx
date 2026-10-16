import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Compass, HeartHandshake, Mountain, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteriorHero from "@/components/shared/InteriorHero";

export const metadata: Metadata = {
  title: "About Bike the Hills | Local Himalayan Cycling",
  description:
    "Meet the approach behind Bike the Hills and our locally guided cycling journeys in Spiti and the Himalayas.",
};

const values = [
  {
    icon: Compass,
    title: "Local knowledge",
    description:
      "Ride with people who know the roads, villages, and changing conditions of Spiti firsthand.",
  },
  {
    icon: Mountain,
    title: "Made for the mountains",
    description:
      "Plan for high altitude, long climbs, and the flexibility mountain travel requires.",
  },
  {
    icon: Users,
    title: "A personal pace",
    description:
      "Keep the journey focused on the riders, with thoughtful support along the way.",
  },
  {
    icon: HeartHandshake,
    title: "Ride with respect",
    description:
      "Make time for local culture and the communities that make these places special.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <InteriorHero
          eyebrow="The people behind the ride"
          title="A closer way to experience the Himalayas"
          description="Bike the Hills brings together local knowledge, thoughtful planning, and the joy of discovering the mountains by bicycle."
          image="/images/experience.jpg"
        />

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src="/images/routes/hidden-route.jpg"
                alt="A quiet mountain road through the Himalayas"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#12372A]">
                Our approach
              </p>
              <h2 className="mt-4 font-playfair text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                The best journeys leave room to discover.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                <p>
                  A cycling trip through the Himalayas is about more than the
                  distance on the map. It is the changing landscape, the
                  villages along the road, and the people you meet as you go.
                </p>
                <p>
                  We design rides around the character of each region and the
                  realities of travelling at altitude. The team provides
                  experienced local guidance and practical support, while
                  keeping safety and flexibility at the centre of the journey.
                </p>
              </div>
              <Link
                href="/tours"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#12372A] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#1b4d39]"
              >
                Explore our expeditions
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-stone-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#12372A]">
                What guides us
              </p>
              <h2 className="mt-4 font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">
                Ride with purpose
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-xl border border-stone-200 bg-white p-6 sm:p-7"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-[#12372A]/10 text-[#12372A]">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-playfair text-2xl font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-600">{description}</p>
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
