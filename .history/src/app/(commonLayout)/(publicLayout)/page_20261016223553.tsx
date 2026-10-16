import AIValuationSection from "../../components/features/home/AIValuationSection";
import CategorySection from "../../components/features/home/CategorySection";
import EnvironmentalImpactSection from "../../components/features/home/EnvironmentalImpactSection";
import EWasteStorySection from "../../components/features/home/EWasteStorySection";
import FAQSection from "../../components/features/home/FAQSection";
import HeroSection from "../../components/features/home/HeroSection";
import LiveMarketSection from "../../components/features/home/LiveMarketSection";
import SecureEWasteDisposalSection from "../../components/features/home/SecureEWasteDisposalSection";

export default function HomePage() {
  return (
    <main>
          <HeroSection />
      <EWasteStorySection />
      <AIValuationSection />
      <CategorySection />
      <LiveMarketSection />
      <FAQSection />
      <EnvironmentalImpactSection />
      <SecureEWasteDisposalSection />
      
    </main>
  );
}