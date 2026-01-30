'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  // Initialize as true to avoid hydration issues
  const [isVisible, setIsVisible] = useState(false);

  // Use setTimeout to trigger animation after mount
  if (typeof window !== 'undefined' && !isVisible) {
    setTimeout(() => setIsVisible(true), 100);
  }

  const scrollToStory = () => {
    const storySection = document.getElementById('story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Banner Image */}
      <Image
        src="/obaaSIWA.jpg"
        alt="ObaaSIWA - Women farmers and nature"
        fill
        className="object-cover brightness-50"
        priority
      />

      {/* Overlay Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8 sm:mb-10 flex justify-center">
            <Image
              src="/logo-full.png"
              alt="ObaaSIWA Full Logo"
              width={300}
              height={120}
              className={`h-24 sm:h-32 w-auto transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              priority
            />
          </div>

          {/* Main Headline */}
          <h1 
            className={`font-(--font-papyrus) text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 sm:mb-8 transition-all duration-1000 drop-shadow-lg ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            When the Clouds Speak,
            <br />
            <span className="text-amber-100">She Listens</span>
          </h1>

          {/* Subheadline */}
          <p 
            className={`font-(--font-poppins) text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 max-w-4xl mx-auto mb-8 sm:mb-10 leading-relaxed transition-all duration-1000 delay-200 drop-shadow-md ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Meet the women farmers of Ghana who are teaching artificial intelligence to understand the language of nature—and transforming climate resilience for rural Africa in the process.
          </p>

          {/* Hero Narrative */}
          <div 
            className={`bg-(--color-surface) border-l-4 border-primary rounded-lg p-6 sm:p-8 md:p-10 max-w-4xl mx-auto mb-10 sm:mb-12 shadow-lg transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <blockquote className="font-(--font-poppins) text-base sm:text-lg md:text-xl text-foreground italic leading-relaxed">
              &ldquo;For generations, we watched the <span className="text-primary font-semibold not-italic">Kakapenpen tree</span>. When new leaves appeared, we knew the rains were coming. We observed the termites&rsquo; nuptial flight, the color of evening clouds, the behavior of birds returning home. Our mothers taught us, and their mothers before them. But the climate is changing. The signs we trusted are becoming unreliable. Now, we are <span className="text-primary font-semibold not-italic">teaching the machines</span> what we know, and they are helping us understand what has changed.&rdquo;
            </blockquote>
            <cite className="block mt-4 sm:mt-6 text-sm sm:text-base text-foreground not-italic font-medium">
              &mdash; A woman farmer from the Pra River Basin
            </cite>
          </div>

          {/* Call-to-Action Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button 
              onClick={scrollToStory}
              className="group px-8 py-4 bg-primary text-white font-semibold text-base sm:text-lg rounded-full hover:bg-(--color-primary-dark) transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Read Our Story
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button className="group px-8 py-4 bg-(--color-accent) text-white font-semibold text-base sm:text-lg rounded-full hover:bg-(--color-accent-warm) transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center">
              Meet the Women
            </button>
            
            <button className="group px-8 py-4 border-2 border-white text-white font-semibold text-base sm:text-lg rounded-full hover:bg-white hover:text-primary transition-all transform hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center">
              Join the Movement
            </button>
          </div>

          {/* Scroll Indicator */}
          <div 
            className={`mt-16 sm:mt-20 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button 
              onClick={scrollToStory}
              className="group flex flex-col items-center gap-2 text-gray-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to story"
            >
              <span className="text-sm font-medium">Discover More</span>
              <svg 
                className="w-6 h-6 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
