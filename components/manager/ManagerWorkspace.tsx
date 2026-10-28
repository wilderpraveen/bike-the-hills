"use client";

import { useState } from "react";
import { Bike } from "lucide-react";
import ItineraryManager from "@/components/manager/ItineraryManager";
import SiteContentManager from "@/components/manager/SiteContentManager";
import type { ManagedExpedition } from "@/lib/managed-expeditions";
import type { ExpeditionDay } from "@/lib/expedition-itinerary";
import type { SiteContent } from "@/lib/site-content";

export default function ManagerWorkspace({ expeditions, archivedExpeditions, initialItineraries, siteContent }: {
  expeditions: ManagedExpedition[];
  archivedExpeditions: ManagedExpedition[];
  initialItineraries: Record<string, ExpeditionDay[]>;
  siteContent: SiteContent;
}) {
  const [section, setSection] = useState<"tours" | "home" | "destinations">("tours");
  return (
    <main className="min-h-screen bg-[#f4f4ef] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-[#07382f] p-6 text-white sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-full border border-white/30 text-[#e9c36b]"><Bike size={24} /></span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e9c36b]">Bike the Hills · Local mode</p>
              <h1 className="mt-1 font-playfair text-3xl font-bold">Website manager</h1>
            </div>
          </div>
          <span className="rounded-full border border-[#e9c36b]/50 px-4 py-2 text-xs font-semibold text-[#f5dfa5]">Saved to this project</span>
        </header>
        <nav className="mb-6 flex flex-wrap gap-2" aria-label="Manager sections">
          <button type="button" aria-current={section === "tours" ? "page" : undefined} onClick={() => setSection("tours")} className={navClass(section === "tours")}>Expeditions &amp; itineraries</button>
          <button type="button" aria-current={section === "home" ? "page" : undefined} onClick={() => setSection("home")} className={navClass(section === "home")}>Home page</button>
          <button type="button" aria-current={section === "destinations" ? "page" : undefined} onClick={() => setSection("destinations")} className={navClass(section === "destinations")}>Destinations</button>
        </nav>
        <div className={section === "tours" ? "" : "hidden"}>
          <ItineraryManager expeditions={expeditions} archivedExpeditions={archivedExpeditions} initialItineraries={initialItineraries} localMode />
        </div>
        <div className={section === "home" || section === "destinations" ? "" : "hidden"}>
          <SiteContentManager initialContent={siteContent} view={section === "destinations" ? "destinations" : "home"} expeditions={expeditions} />
        </div>
      </div>
    </main>
  );
}

function navClass(active: boolean) {
  return "rounded-xl px-4 py-3 text-sm font-semibold transition " + (active ? "bg-[#12372a] text-white shadow-sm" : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50");
}
