"use client";

import { motion } from "framer-motion";
import {
  Mountain,
  Users,
  Compass,
  HeartHandshake,
} from "lucide-react";
import ContourBackground from "../backgrounds/ContourBackground";

const features = [
  {
    icon: Mountain,
    title: "Ride Hidden Himalayas",
    description:
      "Discover remote valleys, forgotten villages, and spectacular roads far from the usual tourist routes.",
  },
  {
    icon: Users,
    title: "Small Group Expedition",
    description:
      "Travel in carefully curated groups where every rider receives personal attention and support.",
  },
  {
    icon: Compass,
    title: "Local Knowledge",
    description:
      "Designed by riders who live in Spiti and know the mountains beyond the guidebooks.",
  },
  {
    icon: HeartHandshake,
    title: "Adventure with Culture",
    description:
      "Ride through monasteries, mountain communities, and authentic Himalayan traditions—not just destinations.",
  },
];

export default function WhyRide() {
  return (
    <section className="relative overflow-hidden bg-[#f8f8f6] py-28">
      <ContourBackground
        opacity={0.07}
        color="#12372A"
        animate
    />
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 flex  flex-col items-center"
        >
          <p className="mb-5 uppercase tracking-[0.35em] text-sm text-[#12372A] text-center">
              Why Bike the Hills
          </p>

          <h2 className="font-playfair text-5xl font-bold leading-tight text-gray-900">
            More Than a Cycling Tour
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 align-center text-center">
            Every expedition is designed around authentic Himalayan experiences,
            hidden landscapes, and meaningful human connections.
          </p>
        </motion.div>

        {/* Cards */}

       <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * .12,
                  duration: .5,
                }}
                className="group/card min-h-75 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#12372A] hover:shadow-xl"
              >
               <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-md bg-transparent text-[#12372A]">
                  <Icon size={26} strokeWidth={1.8} />
               </div>

                <h3 className="mb-4 font-playfair text-[1.45rem] font-semibold leading-tight text-gray-900">
                  {feature.title}
                </h3>

               <p className="leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}