import { useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
//import WhyAISection from "@/components/sections/WhyAISection";
import HeadHandHeartSection from "@/components/sections/HeadHandHeartSection";
import AudienceSection from "@/components/sections/AudienceSection";
import StoriesSection from "@/components/sections/StoriesSection";
import ImpactMapSection from "@/components/sections/ImpactMapSection";
import PartnerSection from "@/components/sections/PartnerSection";
import ActionHubSection from "@/components/sections/ActionHubSection";
import GallerySection from "@/components/sections/GallerySection";
import QuoteSection from "@/components/sections/QuoteSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Section 1: Hero - The Dawn of AI in Kerala */}
      <HeroSection />
      
      {/* Section 2: Why AI Literacy - Parallax Story Scroll */}
      {/*<WhyAISection />*/}
      
      {/* Section 3: Head, Hand, Heart - Three Pillars */}
      <HeadHandHeartSection />
      
      {/* Section 4: Audience Groups - Kerala Village */}
      <AudienceSection />
      
      {/* Section 5: Daily Life AI Stories - Comics */}
      <StoriesSection />
      
      {/* Section 6: Impact Map - Kerala Neural Network */}
      <ImpactMapSection />
      
      {/* Section 7: Partner With Us - Growing Stones */}
      {/*<PartnerSection />*/}
      
      {/* Section 8: Action Hub - Postcards */}
      <ActionHubSection />
      
      {/* Section 9: Gallery - Memory Board */}
      <GallerySection />
      
      {/* Section 10: Final Quote - Horizon of Possibility */}
      <QuoteSection />
      
      {/* Section 11: Footer - Backwater Nights */}
      <FooterSection />
    </main>
  );
};

export default Index;
