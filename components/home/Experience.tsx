"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "Local guides born and raised in Spiti",
  "Premium mountain bikes maintained daily",
  "Small groups for a personal experience",
  "Authentic villages, monasteries and culture",
];

export default function Experience() {
  return (
    <section className="bg-[#f8f8f6] py-24">
      <div className="container mx-auto grid items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left Image */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-145 overflow-hidden rounded-2xl"
        >
          <Image
            src="/images/experience.jpg"
            alt="Bike the Hills Experience"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Right Content */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#12372A]">
            The Bike the Hills Experience
          </p>

          <h2 className="font-playfair text-5xl font-bold text-gray-900 leading-tight">
            More Than Just a Cycling Tour
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-600">
            Every expedition is thoughtfully designed to immerse you in the
            landscapes, culture, and spirit of the Himalayas. Ride with locals,
            discover hidden places, and experience Spiti beyond the ordinary.
          </p>


          <div className="mt-10 space-y-5">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-4">
                <CheckCircle2
                  size={22}
                  className="text-[#12372A]"
                />
                <span className="text-lg text-gray-700">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Button className="mt-10 h-12 w-45 rounded-lg bg-[#12372A] px-8 text-base font-semibold transition-all duration-300 hover:bg-[#1b4d39] hover:-translate-y-1">
            Start Your Journey
          </Button>
        </motion.div>

      </div>
    </section>
  );
}