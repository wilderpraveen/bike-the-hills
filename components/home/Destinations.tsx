"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";

export default function Destinations() {
  return (
    <section id="destinations" className="relative overflow-hidden bg-white py-24">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#12372A]">
            Explore the Himalayas
          </p>

          <h2 className="font-playfair text-5xl font-bold text-gray-900">
            Places Worth Riding To
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Go beyond the famous viewpoints and discover the villages,
            valleys, and mountain landscapes that make Spiti unforgettable.
          </p>
        </motion.div>

        {/* Destination Cards */}

        <div className="grid gap-8 md:grid-cols-3">
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

              <div className="relative h-72 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              {/* Content */}

              <div className="p-7">
                <h3 className="font-playfair text-3xl font-semibold text-gray-900">
                  {destination.name}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
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
