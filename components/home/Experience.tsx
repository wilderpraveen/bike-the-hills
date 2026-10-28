"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/site-content";

export default function Experience({ content }: { content: SiteContent["home"]["experience"] }) {
  return (
    <section className="bg-[#f8f8f6] py-14 sm:py-16">
      <div className="container mx-auto grid items-center gap-10 px-6 lg:grid-cols-2 lg:gap-12">

        {/* Left Image */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-[22rem] overflow-hidden rounded-2xl sm:h-[26rem] lg:h-[28rem]"
        >
          <Image
            src={content.image}
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
            {content.eyebrow}
          </p>

          <h2 className="font-playfair text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            {content.title}
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {content.description}
          </p>


          <div className="mt-7 space-y-3">
            {content.highlights.map((item) => (
              <div key={item} className="flex items-center gap-4">
                <CheckCircle2
                  size={22}
                  className="text-[#12372A]"
                />
                <span className="text-base text-gray-700 sm:text-lg">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Button asChild className="mt-8 h-12 w-45 rounded-lg bg-[#12372A] px-8 text-base font-semibold transition-all duration-300 hover:bg-[#1b4d39] hover:-translate-y-1">
            <Link href="/contact">Start Your Journey</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
