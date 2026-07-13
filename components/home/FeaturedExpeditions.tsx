import Image from "next/image";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";
import ExpeditionCard from "@/components/cards/ExpeditionCard";
import { expeditions } from "@/data/expeditions";

<div className="grid gap-8 lg:grid-cols-3">
  {expeditions.map((trip) => (
    <ExpeditionCard
      key={trip.title}
      title={trip.title}
      image={trip.image}
      duration={trip.duration}
      difficulty={trip.difficulty}
      altitude={trip.altitude}
      description={trip.description}
    />
  ))}
</div>

/* const expeditions = [
  {
    title: "Cold Desert Expedition",
    duration: "10 Days",
    difficulty: "Intermediate",
    altitude: "4,550 m",
    image: "/images/routes/spiti.jpg",
  },
  {
    title: "Hidden Valleys Expedition",
    duration: "8 Days",
    difficulty: "Intermediate",
    altitude: "4,200 m",
    image: "/images/routes/valley.jpg",
  },
  {
    title: "High Himalayan Traverse",
    duration: "12 Days",
    difficulty: "Advanced",
    altitude: "5,100 m",
    image: "/images/routes/himalaya.jpg",
  },
];
 */
export default function FeaturedExpeditions() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Our Expeditions"
          title="Ride Beyond the Ordinary"
          description="Carefully designed Himalayan cycling expeditions created for riders seeking authentic landscapes, living culture, and unforgettable mountain journeys."
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {expeditions.map((trip) => (
            <div
              key={trip.title}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2"
            >
              <div className="relative h-72">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold">{trip.title}</h3>

                <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-500">
                  <span>{trip.duration}</span>
                  <span>•</span>
                  <span>{trip.difficulty}</span>
                  <span>•</span>
                  <span>{trip.altitude}</span>
                </div>

                <Button className="mt-8 w-full">
                  View Expedition
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}