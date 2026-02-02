import Header from "@/components/Header";
import BannerSection from "@/components/BannerSection";
import AboutSection from "@/components/AboutSection";
import StatisticsSection from "@/components/StatisticsSection";

export default function Home() {
  return (
    <main className="relative min-h-100vh bg-(--color-primary)">
      <header className="relative w-full space-y-6">
        <Header />
        <BannerSection />
      </header>
      
      <AboutSection />
      <StatisticsSection />
      {/* Placeholder for next sections */}
      <section id="story" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-freestyle text-4xl md:text-5xl text-secondary mb-4">
            The Story Begins
          </h2>
          <p className="font-sans text-lg text-(--color-muted) max-w-2xl mx-auto px-4">
            A Crisis in the Fields
          </p>
        </div>
      </section>
    </main>
  );
}
