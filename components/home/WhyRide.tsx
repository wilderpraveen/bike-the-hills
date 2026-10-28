"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Mountain,
  Users,
  HeartHandshake,
} from "lucide-react";
import type { SiteContent } from "@/lib/site-content";

const icons = [Compass, Mountain, Users, HeartHandshake];

export default function WhyRide({ content }: { content: SiteContent["home"]["whyRide"] }) {
  return (
    <section className="relative overflow-hidden bg-white pt-14 pb-4 sm:pt-16 sm:pb-6">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#12372A]">
            {content.eyebrow}
          </p>

          <h2 className="font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">
            {content.title}
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {content.description}
          </p>
        </motion.div>

        {/* Reasons */}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((reason, index) => {
            const Icon = icons[index % icons.length];

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
                className="group min-h-60 border border-gray-200 bg-[#f8f8f6] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#12372A] hover:bg-white hover:shadow-xl"
              >
                {/* Icon */}

                <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[#12372A]/20 bg-white text-[#12372A] transition-colors duration-300 group-hover:bg-[#12372A] group-hover:text-white">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                {/* Content */}

                <h3 className="font-playfair text-2xl font-semibold text-gray-900">
                  {reason.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
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
