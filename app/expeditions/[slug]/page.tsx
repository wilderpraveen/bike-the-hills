"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Mountain, Bike, MapPinned, BedDouble, Users } from "lucide-react";
import { expeditions } from "@/data/expeditions";
import Navbar from "@/components/layout/Navbar";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExpeditionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const expedition = expeditions.find((trip) => trip.slug === slug);

  if (!expedition) {
    return (
      <main className="min-h-screen bg-stone-50 px-6 py-32 text-center">
        <h1 className="font-playfair text-4xl font-bold text-[#12372A]">Expedition not found</h1>
        <Link href="/#expeditions" className="mt-6 inline-flex items-center gap-2 text-[#12372A] underline underline-offset-4">
          <ArrowLeft size={18} /> Browse expeditions
        </Link>
      </main>
    );
  }

  const isColdDesert = expedition.slug === "cold-desert-expedition";

  const highlights = isColdDesert
    ? [
        { icon: MapPinned, title: "Arrival transfer", detail: "Chandigarh arrival transfer included" },
        { icon: MapPinned, title: "Final transfer", detail: "Transfer from Chandratal to Manali included" },
        { icon: BedDouble, title: "Accommodation", detail: "A mix of hotels, homestays and camps" },
        { icon: Users, title: "Group format", detail: "Custom group sizes available" },
      ]
    : [
        { icon: CalendarDays, title: "Duration", detail: expedition.duration },
        { icon: Mountain, title: "Region", detail: expedition.region },
        { icon: Bike, title: "Difficulty", detail: expedition.difficulty },
        { icon: Users, title: "Group format", detail: "Ask us about a tailored expedition" },
      ];

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="relative isolate flex min-h-[72vh] items-end overflow-hidden px-6 pb-16 pt-32 sm:pb-20">
        <Image
          src={expedition.image}
          alt={expedition.title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />

        <div className="mx-auto w-full max-w-7xl text-white">
          <Link href="/#expeditions" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white">
            <ArrowLeft size={17} /> All expeditions
          </Link>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/80">
            {expedition.region}
          </p>
          <h1 className="max-w-4xl font-playfair text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            {expedition.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
            {expedition.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm">
              <CalendarDays size={17} /> {expedition.duration}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm">
              <Bike size={17} /> {expedition.difficulty}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm backdrop-blur-sm">
              <Mountain size={17} /> Up to {expedition.altitude}
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#12372A]">
              The journey
            </p>
            <h2 className="font-playfair text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Discover the Himalayas beyond the usual route
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Ride through high mountain landscapes, remote settlements and places shaped by local culture. Each Bike the Hills expedition is designed around the character of its region and the experience of travelling by bicycle.
            </p>

            <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <h3 className="font-playfair text-2xl font-bold text-gray-900">Expedition overview</h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Operating season</p>
                  <p className="mt-1 font-semibold text-gray-900">{expedition.season}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Difficulty</p>
                  <p className="mt-1 font-semibold text-gray-900">{expedition.difficulty}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="mt-1 font-semibold text-gray-900">{expedition.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Highest altitude listed</p>
                  <p className="mt-1 font-semibold text-gray-900">{expedition.altitude}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#12372A]">
              Trip details
            </p>
            <h3 className="mt-3 font-playfair text-3xl font-bold text-gray-900">
              What to expect
            </h3>
            <div className="mt-7 space-y-6">
              {highlights.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#12372A]/10 text-[#12372A]">
                    <Icon size={21} />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="mt-1 leading-6 text-gray-600">{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-stone-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#12372A]" />
                <p className="text-sm leading-6 text-gray-600">
                  The detailed day-by-day itinerary and final trip arrangements can be confirmed with the Bike the Hills team.
                </p>
              </div>
            </div>
            <Link
              href="/#expeditions"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#12372A] px-6 py-4 font-semibold text-white transition hover:bg-[#1b4d39]"
            >
              Explore all expeditions <ArrowLeft size={17} className="rotate-180" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
