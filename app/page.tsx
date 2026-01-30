import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BannerSection from "@/components/layout/BannerSection";

export default function Home() {
  return (
    <main className="relative min-h-100vh bg-(--color-primary)">
      <header className="relative w-full space-y-6">
        <Header />
        {/* <HeroSection /> */}
      <BannerSection />
      </header>
        
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
