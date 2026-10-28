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
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#12372A]/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-lg backdrop-blur-sm">
            {region}
          </span>
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-gray-900 shadow-lg backdrop-blur-sm">
            {season}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-5 sm:p-6">
        <h3 className="font-playfair text-2xl font-bold leading-tight">{title}</h3>
        <p className="text-sm leading-6 text-gray-600">{description}</p>
        <hr className="border-gray-200" />

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mountain size={16} />
            <span>{altitude}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bike size={16} />
            <span>{difficulty}</span>
          </div>
        </div>

        <Link
          href={`/expeditions/${slug}`}
          className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-[#12372A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1b4d39]"
        >
          View Expedition
          <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
