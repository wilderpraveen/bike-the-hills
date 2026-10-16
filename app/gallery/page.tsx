import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteriorHero from "@/components/shared/InteriorHero";

export const metadata: Metadata = {
  title: "Himalayan Cycling Gallery | Bike the Hills",
  description:
    "A visual look at the roads, villages, and landscapes of Bike the Hills expeditions.",
};

const photos = [
  {
    src: "/images/Hero/spiti-hero.jpg",
    alt: "Wide Himalayan landscape in Spiti",
    caption: "The open landscapes of Spiti",
  },
  {
    src: "/images/langza1.jpg",
    alt: "Mountain landscape near Langza",
    caption: "The high village of Langza",
  },
  {
    src: "/images/komic.jpg",
    alt: "High desert scenery near Komic",
    caption: "The road toward Komic",
  },
  {
    src: "/images/pin-valley.jpg",
    alt: "Mountain valley in the Pin region",
    caption: "A quieter side of Spiti",
  },
  {
    src: "/images/routes/hidden-route.jpg",
    alt: "Remote road through the Himalayas",
    caption: "Beyond the usual route",
  },
  {
    src: "/images/routes/himalaya.jpg",
    alt: "High Himalayan mountain terrain",
    caption: "The high mountain traverse",
  },
  {
    src: "/images/experience.jpg",
    alt: "A view from a Bike the Hills cycling journey",
    caption: "A journey shaped by the landscape",
  },
  {
    src: "/images/routes/valley.jpg",
    alt: "Himalayan valley along an expedition route",
    caption: "The hidden valleys route",
  },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <InteriorHero
          eyebrow="Scenes from the road"
          title="The Himalayas, one turn at a time"
          description="A glimpse of the landscapes, villages, and mountain roads that make every ride its own story."
          image="/images/routes/hidden-route.jpg"
        />

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#12372A]">
                  The ride in pictures
                </p>
                <h2 className="mt-4 font-playfair text-4xl font-bold text-gray-900 sm:text-5xl">
                  Landscapes to remember
                </h2>
              </div>
              <p className="max-w-md leading-7 text-gray-600">
                From remote valleys to high desert villages, these are a few
                glimpses of the places explored on our Himalayan journeys.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, index) => (
                <figure
                  key={photo.src}
                  className={`group relative isolate overflow-hidden rounded-xl bg-stone-100 ${
                    index === 0 || index === 5 ? "sm:row-span-2" : ""
                  }`}
                >
                  <div className={`relative h-72 sm:h-full sm:min-h-72 ${index === 0 || index === 5 ? "sm:min-h-[37rem]" : ""}`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm font-medium text-white sm:p-6">
                      {photo.caption}
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
