import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ExpeditionNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[65vh] flex-col items-center justify-center bg-stone-50 px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C79A3B]">Route not found</p>
        <h1 className="mt-4 font-playfair text-4xl font-bold text-[#12372A] sm:text-5xl">This expedition is no longer available.</h1>
        <p className="mt-4 max-w-xl leading-7 text-gray-600">It may have been removed or the address may have changed. Browse the current expeditions to find your next ride.</p>
        <Link href="/tours" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#12372A] px-5 py-3 font-semibold text-white transition hover:bg-[#1b4d39]"><ArrowLeft size={17} /> Browse expeditions</Link>
      </main>
      <Footer />
    </>
  );
}
