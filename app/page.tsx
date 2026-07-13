import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedExpeditions from "@/components/home/FeaturedExpeditions";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedExpeditions />
    </>
  );
}