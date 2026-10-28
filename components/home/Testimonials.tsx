"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";

export default function Testimonials({ content }: { content: SiteContent["home"]["testimonials"] }) {
  return (
    <section className="relative overflow-hidden bg-[#f8f8f6] py-14 sm:py-16">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Heading */}

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

        {/* Testimonial Cards */}

        <div className="grid gap-8 md:grid-cols-3">
          {content.items.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 0.5,
              }}
              className="group flex min-h-65 flex-col border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#12372A] hover:shadow-xl"
            >
              {/* Quote */}

              <Quote
                size={28}
                strokeWidth={1.7}
                className="mb-7 text-[#C79A3B]"
              />

              <p className="flex-1 text-lg leading-8 text-gray-600">
                “{testimonial.quote}”
              </p>

              {/* Rider Information */}

              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="font-playfair text-xl font-semibold text-gray-900">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-gray-500">
                  {testimonial.country}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
