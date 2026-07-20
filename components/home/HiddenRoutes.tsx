"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ContourBackground from "@/components/backgrounds/ContourBackground";

const highlights = [
  "Hidden villages beyond the tourist trail",
  "Ancient monasteries and living Himalayan culture",
  "Remote mountain passes and forgotten valleys",
  "Designed and guided by a Spiti local",
];

export default function HiddenRoutes() {
  return (
    <section className="relative overflow-hidden bg-white py-28">

      <ContourBackground
        opacity={0.03}
        color="#12372A"
        animate
      />

      <div className="relative z-10 container mx-auto px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >
            <p className="mb-4 uppercase tracking-[0.35em] text-sm text-[#12372A]">
              Hidden Himalayan Routes
            </p>

            <h2 className="font-playfair text-5xl font-bold leading-tight">
              Not Every Himalayan Road
              <br />
              Is Worth Riding.
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              Some roads connect places. The best roads connect people, landscapes, and stories.

              <br />
              <br />

              Others lead you through forgotten villages,
              ancient monasteries, high mountain deserts,
              and stories that few cyclists ever experience.

            </p>

            <div className="mt-10 space-y-4">

              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={22}
                    className="text-[#12372A]"
                  />

                  <span className="text-gray-700">
                    {item}
                  </span>
                </div>
              ))}

            </div>

            <Button className="mt-14 rounded-md bg-[#12372A] hover:bg-[#1b4d39]">
              Discover the Routes
              <ArrowRight className="ml-2" size={18} />
            </Button>

          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
            className="relative"
          >

            <div className="overflow-hidden rounded-3xl shadow-2xl aspect-4/5">

              <Image
                src="/images/routes/hidden-route.jpg"
                alt="Cycling through hidden Himalayan roads"
                width={900}
                height={1100}
                className="h-full w-full object-cover"
              />

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}