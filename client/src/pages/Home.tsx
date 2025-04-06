import { useEffect } from "react";
import { useLocation } from "wouter";
import HeroCarousel from "@/components/home/HeroCarousel";
import QuickLinks from "@/components/home/QuickLinks";
import CulturalShowcase from "@/components/cultural-showcase/CulturalShowcase";
import FeaturedHighlight from "@/components/home/FeaturedHighlight";
import EventCalendar from "@/components/events/EventCalendar";
import Gallery from "@/components/gallery/Gallery";
import Heritage from "@/components/heritage/Heritage";
import Newsletter from "@/components/shared/Newsletter";

// SVG divider component
function SectionDivider() {
  return (
    <div className="section-divider h-16 bg-[#FFF5E6]"></div>
  );
}

export default function Home() {
  const [location] = useLocation();
  
  // Handle hash navigation for smooth scrolling
  useEffect(() => {
    const hashId = location.split('#')[1]?.split('?')[0];
    if (hashId) {
      const element = document.getElementById(hashId);
      if (element) {
        // Add a small delay to ensure UI is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <HeroCarousel />
      <QuickLinks />
      <SectionDivider />
      <CulturalShowcase />
      <FeaturedHighlight />
      <SectionDivider />
      <EventCalendar />
      <SectionDivider />
      <Gallery />
      <SectionDivider />
      <Heritage />
      <Newsletter />
    </>
  );
}
