import Header from "@/components/Header";
import BannerSection from "@/components/BannerSection";
import AboutSection from "@/components/AboutSection";
import StatisticsSection from "@/components/StatisticsSection";
import WhyItMattersSection from "@/components/WhyItMattersSection";
import ImpactSection from "@/components/ImpactSection";
import EmpowermentSection from "@/components/EmpowermentSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-100vh bg-(--color-primary)">
      <header className="relative w-full space-y-6">
        <Header />
        <BannerSection />
      </header>
      
      <AboutSection />
      <StatisticsSection />
      <WhyItMattersSection />
      <ImpactSection />
      <EmpowermentSection />
      <CallToActionSection />
      <Footer />
    </main>
  );
}
