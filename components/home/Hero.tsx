"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 uppercase tracking-[0.4em] text-sm md:text-base"
        >
          Premium Cycling Adventures
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-playfair text-5xl font-bold leading-tight md:text-7xl"
        >
          Ride the Himalayas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-gray-200"
        >
          Explore the breathtaking landscapes of Spiti Valley with local guides,
          premium mountain bikes, and unforgettable adventures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <Button href="#" variant="primary">
            Explore Tours
          </Button>

          <Button href="#" variant="secondary">
            Watch Film
          </Button>
        </motion.div>
      </div>
    </section>
  );
}