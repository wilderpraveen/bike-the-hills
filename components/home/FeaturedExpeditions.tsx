import SectionHeading from "@/components/shared/SectionHeading";
import ExpeditionCard from "@/components/cards/ExpeditionCard";
import { expeditions } from "@/data/expeditions";

export default function FeaturedExpeditions() {
  return (
    <section id="expeditions" className="relative overflow-hidden bg-stone-50 py-28">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading
          eyebrow="Our Expeditions"
          title="Ride Beyond the Ordinary"
          description="Carefully designed Himalayan cycling expeditions created for riders seeking authentic landscapes, living culture, and unforgettable mountain journeys."
        />
        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {expeditions.map((trip) => (
            <ExpeditionCard
              key={trip.id}
              slug={trip.slug}
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-stone-50 to-transparent" />
    </section>
  );
}
