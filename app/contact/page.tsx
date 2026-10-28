import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteriorHero from "@/components/shared/InteriorHero";
import { getExpeditions } from "@/lib/managed-expeditions";

export const metadata: Metadata = {
  title: "Contact Bike the Hills | Plan a Himalayan Cycling Trip",
  description:
    "Contact Bike the Hills to ask about expedition dates, availability, and planning a cycling journey in the Himalayas.",
};

type ContactPageProps = {
  searchParams: Promise<{ expedition?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const requestedSlug = Array.isArray(params.expedition)
    ? params.expedition[0]
    : params.expedition;
  const expeditions = await getExpeditions();
  const requestedExpedition = expeditions.find(
    (expedition) => expedition.slug === requestedSlug,
  );
  const subject = requestedExpedition
    ? `Enquiry about ${requestedExpedition.title}`
    : "Cycling expedition enquiry";
  const body = requestedExpedition
    ? `Hello Bike the Hills,\n\nI’m interested in the ${requestedExpedition.title}. Please share details about dates and availability.\n\nThank you.`
    : "Hello Bike the Hills,\n\nI’m interested in learning more about your cycling expeditions.\n\nThank you.";
  const emailHref = `mailto:hello@ridethehills.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <>
      <Navbar />
      <main>
        <InteriorHero
          eyebrow="Get in touch"
          title="Let’s plan your next ride"
          description="Tell us what kind of Himalayan journey you have in mind. We can help you explore the routes and details for your trip."
          image="/images/routes/valley.jpg"
        />

        <section className="bg-stone-50 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#12372A]">
                Start a conversation
              </p>
              <h2 className="mt-4 font-playfair text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                A good journey starts with a few questions.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Ask about the expeditions, the riding, or what to expect in the
                mountains. Share your preferred dates and cycling experience
                so the team can point you toward a suitable route.
              </p>

              {requestedExpedition && (
                <div className="mt-8 border-l-2 border-[#C79A3B] bg-white px-5 py-4 sm:px-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#12372A]">
                    Your enquiry
                  </p>
                  <p className="mt-2 font-playfair text-2xl font-semibold text-gray-900">
                    {requestedExpedition.title}
                  </p>
                </div>
              )}

              <a
                href={emailHref}
                className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#12372A] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#1b4d39]"
              >
                <Mail size={19} aria-hidden="true" />
                Email the team
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                This opens your email app with a draft you can edit before
                sending.
              </p>
            </div>

            <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <h3 className="font-playfair text-2xl font-semibold text-gray-900">
                Bike the Hills
              </h3>
              <div className="mt-6 flex items-start gap-4 border-t border-stone-200 pt-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#12372A]/10 text-[#12372A]">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Spiti Valley</p>
                  <p className="mt-1 leading-6 text-gray-600">
                    Kaza, Himachal Pradesh, India
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-4 border-t border-stone-200 pt-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#12372A]/10 text-[#12372A]">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <a
                    href="mailto:hello@ridethehills.com"
                    className="mt-1 inline-block text-gray-600 underline decoration-stone-300 underline-offset-4 hover:text-[#12372A]"
                  >
                    hello@ridethehills.com
                  </a>
                </div>
              </div>
              <Link
                href="/tours"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#12372A] hover:text-[#C79A3B]"
              >
                Browse expeditions <span aria-hidden="true">→</span>
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
