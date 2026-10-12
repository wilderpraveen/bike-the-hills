"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Mountain, Bike, ArrowRight } from "lucide-react";

interface ExpeditionCardProps {
  slug: string;
  title: string;
  image: string;
  duration: string;
  difficulty: string;
  altitude: string;
  description: string;
  region: string;
  season: string;
}

export default function ExpeditionCard({
  slug,
  title,
  image,
  duration,
  difficulty,
  altitude,
  description,
  region,
  season,
}: ExpeditionCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl transition-shadow duration-500 hover:shadow-2xl"
    >
      <div className="relative h-72 overflow-hidden rounded-t-3xl">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#12372A]/95 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
            {region}
          </span>
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 shadow-lg backdrop-blur-sm">
            {season}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-5 p-8">
        <h3 className="font-playfair text-3xl font-bold leading-tight">{title}</h3>
        <p className="leading-7 text-gray-600">{description}</p>
        <hr className="border-gray-200" />

        <div className="flex flex-wrap gap-5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mountain size={18} />
            <span>{altitude}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bike size={18} />
            <span>{difficulty}</span>
          </div>
        </div>

        <Link
          href={`/expeditions/${slug}`}
          className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-[#12372A] px-5 py-3.5 font-semibold text-white transition-colors hover:bg-[#1b4d39]"
        >
          View Expedition
          <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
