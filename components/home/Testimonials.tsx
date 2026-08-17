"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Cycling through Spiti with Bike the Hills was one of the most memorable adventures of my life. The landscapes were incredible, but the local knowledge made the journey truly special.",
    name: "James Wilson",
    country: "United Kingdom",
  },
  {
    quote:
      "The experience felt completely different from a typical cycling tour. We rode through remote villages, met local people and discovered parts of Spiti we would never have found ourselves.",
    name: "Sophie Martin",
    country: "France",
  },
  {
    quote:
      "The downhill ride from Komic was absolutely incredible. The bikes were well maintained, the route was spectacular and the team made the whole adventure feel safe and exciting.",
    name: "Daniel Carter",
    country: "Australia",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#f8f8f6] py-24">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#12372A]">
            Rider Stories
          </p>

          <h2 className="font-playfair text-5xl font-bold text-gray-900">
            Stories From The Road
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every journey leaves a story. Hear from riders who have explored
            the Himalayas with Bike the Hills.
          </p>
        </motion.div>

        {/* Testimonial Cards */}

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 0.5,
              }}
              className="group flex min-h-75 flex-col border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#12372A] hover:shadow-xl"
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