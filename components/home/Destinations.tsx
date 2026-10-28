"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { DestinationContent, SiteContent } from "@/lib/site-content";

export default function Destinations({ content, destinations }: { content: SiteContent["home"]["destinations"]; destinations: DestinationContent[] }) {
  return (
    <section id="destinations" className="relative overflow-hidden bg-white py-14 sm:py-16">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#12372A]">
            {content.eyebrow}
          </p>

          <h2 className="font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">
            {content.title}
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {content.description}
          </p>
        </motion.div>

        {/* Destination Cards */}

        <div className="grid gap-6 md:grid-cols-3">
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 0.5,
              }}
              id={destination.slug}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#12372A] hover:shadow-xl"
            >
              {/* Image */}

              <div className="relative h-60 overflow-hidden sm:h-64">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              {/* Content */}

              <div className="p-6">
                <h3 className="font-playfair text-2xl font-semibold text-gray-900 sm:text-3xl">
                  {destination.name}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {destination.description}
                </p>

                <Link
                  href={`/destinations#${destination.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-[#12372A] transition-colors hover:text-[#C79A3B]"
                >
                  Explore destination <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
