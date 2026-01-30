import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <HeroSection />
        
        {/* Placeholder for next sections */}
        <section id="story" className="min-h-screen flex items-center justify-center bg-(--color-surface)">
          <div className="text-center">
            <h2 className="font-(--font-papyrus) text-4xl md:text-5xl text-secondary mb-4">
              The Story Begins
            </h2>
            <p className="font-(--font-poppins) text-lg text-(--color-muted) max-w-2xl mx-auto px-4">
              A Crisis in the Fields
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
