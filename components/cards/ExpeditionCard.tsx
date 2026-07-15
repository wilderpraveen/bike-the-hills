"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {  CalendarDays,  Mountain,  Bike,  ArrowRight,} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpeditionCardProps {
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
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image Section */}
      <div className="relative h-72 overflow-hidden rounded-t-3xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Gradient */}
       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Region & Season */}
        <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between">
          <span className="rounded-full bg-[#12372A]/95 backdrop-blur-sm px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
            {region}
          </span>

          <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-900 shadow-lg">
            {season}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-5 p-8">
        <h3 className="font-playfair text-3xl font-bold leading-tight">
          {title}
        </h3>

        <p className="leading-7 text-gray-600">
          {description}
        </p>

        <hr className="border-gray-200" />

        {/* Expedition Details */}
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

        {/* Button */}
        <Button className="group mt-2 w-full rounded-xl bg-[#12372A] hover:bg-[#1b4d39]">
          View Expedition
          <ArrowRight
            size={18}
            className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Button>
      </div>
    </motion.article>
  );
}