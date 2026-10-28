"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/site-content";

export default function HiddenRoutes({ content }: { content: SiteContent["home"]["hiddenRoutes"] }) {
  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-14 sm:pt-8 sm:pb-16">

      <div className="relative z-10 container mx-auto px-6">

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >
            <p className="mb-4 uppercase tracking-[0.35em] text-sm text-[#12372A]">
              {content.eyebrow}
            </p>

            <h2 className="whitespace-pre-line font-playfair text-4xl font-bold leading-tight sm:text-5xl">
              {content.title}
            </h2>

            <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              {content.description}
            </p>
            <p className="mt-3 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              {content.story}
            </p>

            <div className="mt-7 space-y-3">

              {content.highlights.map((item) => (
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

            <Button asChild className="mt-9 rounded-md bg-[#12372A] hover:bg-[#1b4d39]">
              <Link href="/destinations">
                Discover the Routes
                <ArrowRight className="ml-2" size={18} />
              </Link>
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

            <div className="aspect-4/3 overflow-hidden rounded-3xl shadow-2xl">

              <Image
                src={content.image}
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
