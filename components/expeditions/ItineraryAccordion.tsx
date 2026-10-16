"use client";

import { useState } from "react";
import { ChevronDown, Bike, Mountain, CarFront } from "lucide-react";
import { coldDesertItinerary } from "@/data/cold-desert-itinerary";

function ModeIcon({ mode }: { mode: string }) {
  if (mode === "Transfer") return <CarFront size={16} aria-hidden="true" />;
  if (mode === "Cycling") return <Bike size={16} aria-hidden="true" />;
  return <Mountain size={16} aria-hidden="true" />;
}

export default function ItineraryAccordion() {
  const [openDay, setOpenDay] = useState<number | null>(1);

  return (
    <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
      {coldDesertItinerary.map((day) => {
        const isOpen = openDay === day.day;
        return (
          <article key={day.day} className="py-1">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`itinerary-day-${day.day}`}
              onClick={() => setOpenDay(isOpen ? null : day.day)}
              className="flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-6"
            >
              <span className="flex size-12 shrink-0 items-center justify-center bg-[#12372A] font-playfair text-xl font-bold text-white sm:size-14">
                {String(day.day).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-playfair text-xl font-bold text-gray-900 sm:text-2xl">{day.title}</span>
                <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1.5"><ModeIcon mode={day.mode} />{day.mode}</span>
                  <span>{day.distance}</span>
                </span>
              </span>
              <ChevronDown className={`shrink-0 text-[#12372A] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} size={21} />
            </button>
            {isOpen && (
              <div id={`itinerary-day-${day.day}`} className="pb-6 pl-16 pr-2 sm:pl-20 sm:pr-8">
                <p className="max-w-3xl leading-7 text-gray-600">{day.description}</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="bg-stone-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Sleeping elevation</p>
                    <p className="mt-1 font-semibold text-gray-900">{day.sleepingElevation}</p>
                  </div>
                  <div className="bg-stone-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Highlights</p>
                    <p className="mt-1 leading-6 text-gray-700">{day.highlights.join(" · ")}</p>
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
