import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedExpeditions from "@/components/home/FeaturedExpeditions";
import WhyRide from "@/components/home/WhyRide";
import HiddenRoutes from "@/components/home/HiddenRoutes";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedExpeditions />
      <WhyRide />
      <HiddenRoutes />
    </>
  );
}