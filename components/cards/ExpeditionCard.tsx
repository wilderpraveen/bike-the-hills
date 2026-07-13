"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Mountain, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpeditionCardProps {
  title: string;
  image: string;
  duration: string;
  difficulty: string;
  altitude: string;
  description: string;
}

export default function ExpeditionCard({
  title,
  image,
  duration,
  difficulty,
  altitude,
  description,
}: ExpeditionCardProps) {
  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-lg"
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="space-y-5 p-8">
        <h3 className="font-playfair text-3xl font-bold">
          {title}
        </h3>

        <p className="leading-7 text-gray-600">
          {description}
        </p>

        <div className="space-y-2 text-sm text-gray-600">
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

        <Button className="w-full">
          View Expedition →
        </Button>
      </div>
    </motion.article>
  );
}