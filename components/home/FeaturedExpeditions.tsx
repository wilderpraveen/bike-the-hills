import SectionHeading from "@/components/shared/SectionHeading";
import ExpeditionCard from "@/components/cards/ExpeditionCard";
import { getExpeditions } from "@/lib/managed-expeditions";
import type { SiteContent } from "@/lib/site-content";

export default async function FeaturedExpeditions({ content }: { content: SiteContent["home"]["featured"] }) {
  const allExpeditions = await getExpeditions();
  const expeditions = content.expeditionSlugs
    .map((slug) => allExpeditions.find((trip) => trip.slug === slug))
    .filter((trip) => trip !== undefined);
  return (
    <section id="expeditions" className="relative overflow-hidden bg-stone-50 py-14 sm:py-16">
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8">
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
