"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Mountain,
  Users,
  HeartHandshake,
} from "lucide-react";

const reasons = [
  {
    icon: Compass,
    title: "Local Knowledge",
    description:
      "Ride with people who know Spiti beyond the usual tourist routes, with local insight into its roads, villages, and landscapes.",
  },
  {
    icon: Mountain,
    title: "Built for the Himalayas",
    description:
      "Our rides are designed around high-altitude terrain, changing conditions, and the realities of cycling in the mountains.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Keep the experience personal with carefully managed groups where every rider gets the attention and support they need.",
  },
  {
    icon: HeartHandshake,
    title: "More Than a Ride",
    description:
      "Meet local communities, discover Himalayan culture, and experience places that stay with you long after the ride ends.",
  },
];

export default function WhyRide() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-12">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#12372A]">
            Why Ride With Us
          </p>

          <h2 className="font-playfair text-5xl font-bold text-gray-900">
            The Himalayas, Differently
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe the best cycling experiences are not just about the
            kilometres you ride, but the places you discover and the people
            you meet along the way.
          </p>
        </motion.div>

        {/* Reasons */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                className="group min-h-65 border border-gray-200 bg-[#f8f8f6] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#12372A] hover:bg-white hover:shadow-xl"
              >
                {/* Icon */}

                <div className="mb-7 flex h-11 w-11 items-center justify-center border border-[#12372A]/20 bg-white text-[#12372A] transition-colors duration-300 group-hover:bg-[#12372A] group-hover:text-white">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                {/* Content */}

                <h3 className="font-playfair text-2xl font-semibold text-gray-900">
                  {reason.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {reason.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
