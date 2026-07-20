"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/Hero/spiti-hero.jpg"
        alt="Cycling in Spiti Valley"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4 uppercase tracking-[0.35em] text-sm"
        >
          Bike the Hills • Spiti Valley
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-playfair text-5xl font-bold leading-tight md:text-7xl"
        >
          Every Ride
          <br />
          Tells a Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-gray-200"
        >
          Discover ancient monasteries, hidden villages,
          and unforgettable cycling adventures across the
          breathtaking landscapes of Spiti Valley.
        </motion.p>

        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
  className="mt-10 flex flex-wrap justify-center gap-4"
>
<Button
  size="lg"
  className="bg-[#12372A] px-8 py-6 text-base text-white rounded-md hover:bg-[#1b4d39]"
>
  Explore Tours
</Button>

<Button
  size="lg"
  variant="outline"
  className="border-2 border-white bg-white/10 px-8 py-6 text-base text-white rounded-md backdrop-blur-sm hover:bg-white hover:text-[#12372A]"
>
  Our Story
</Button>
</motion.div>
      </div>
    </section>
  );
}