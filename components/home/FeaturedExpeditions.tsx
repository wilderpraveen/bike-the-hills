import Image from "next/image";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";
import ExpeditionCard from "@/components/cards/ExpeditionCard";
import ContourBackground from "@/components/backgrounds/ContourBackground";
import { expeditions } from "@/data/expeditions";

export default function FeaturedExpeditions() {
  return (
    <section className="relative overflow-hidden bg-stone-50 py-28">
      <ContourBackground
        opacity={0.05}
        color="#12372A"
        animate={false}
      />
      <div className="relative z-10 container mx-auto px-6">
        <SectionHeading
          eyebrow="Our Expeditions"
          title="Ride Beyond the Ordinary"
          description="Carefully designed Himalayan cycling expeditions created for riders seeking authentic landscapes, living culture, and unforgettable mountain journeys."
        />
        <div className="mt-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {expeditions.map((trip) => (
            <ExpeditionCard
              key={trip.id}
              title={trip.title}
              image={trip.image}
              duration={trip.duration}
              difficulty={trip.difficulty}
              altitude={trip.altitude}
              description={trip.description}
              region={trip.region}
              season={trip.season}
            />
          ))}
        </div>
      </div>
</div>
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-50 to-transparent" />
    </section>
  );
}