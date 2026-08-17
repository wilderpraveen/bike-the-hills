"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const destinations = [
  {
    name: "Langza",
    description:
      "Ride into one of Spiti's most iconic high-altitude villages, surrounded by fossils, open valleys, and spectacular mountain landscapes.",
    image: "/images/langza1.jpg",
  },
  {
    name: "Komic",
    description:
      "Climb into the high desert to Komic, a remote Himalayan village and the starting point for our signature downhill experience.",
    image: "/images/komic.jpg",
  },
  {
    name: "Pin Valley",
    description:
      "Discover a quieter side of Spiti through remote villages, dramatic valleys, and landscapes far beyond the usual tourist trail.",
    image: "/images/pin-valley.jpg",
  },
];

export default function Destinations() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
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
              key={destination.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 0.5,
              }}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#12372A] hover:shadow-xl"
            >
              {/* Image */}

              <div className="relative h-72 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  //className="object-contain transition-transform duration-700 group-hover:scale-105"
                  className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"
                />
              </div>

              {/* Content */}

              <div className="p-7">
                <h3 className="font-playfair text-3xl font-semibold text-gray-900">
                  {destination.name}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {destination.description}
                </p>

                <button className="mt-6 font-semibold text-[#12372A] transition-colors hover:text-[#C79A3B]">
                  Explore destination →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}