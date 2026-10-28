import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedExpeditions from "@/components/home/FeaturedExpeditions";
import WhyRide from "@/components/home/WhyRide";
import HiddenRoutes from "@/components/home/HiddenRoutes";
import Destinations from "@/components/home/Destinations";
import Experience from "@/components/home/Experience";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";
import { getSiteContent } from "@/lib/site-content";

export default async function HomePage() {
  const content = await getSiteContent();
  return (
    <>
      <Navbar />
      <Hero content={content.home.hero} />
      <FeaturedExpeditions content={content.home.featured} />
      <WhyRide content={content.home.whyRide} />
      <HiddenRoutes content={content.home.hiddenRoutes} />
      <Destinations content={content.home.destinations} destinations={content.destinations} />
      <Experience content={content.home.experience} />
      <Testimonials content={content.home.testimonials} />
      <Footer />
    </>
  );
}
