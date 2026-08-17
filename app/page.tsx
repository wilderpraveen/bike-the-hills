import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedExpeditions from "@/components/home/FeaturedExpeditions";
import WhyRide from "@/components/home/WhyRide";
import HiddenRoutes from "@/components/home/HiddenRoutes";
import Destinations from "@/components/home/Destinations";
import Experience from "@/components/home/Experience";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedExpeditions />
      <WhyRide />
      <HiddenRoutes />
      <Destinations />
      <Experience />
      <Testimonials />
    </>
  );
}