'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import CardFrame from './layout/CardFrame';
import { parseHighlightedText } from './HightlightText';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface AboutSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  body?: string;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_CONTENT = {
  imageSrc: '/obaaSIWA.jpg',
  imageAlt: 'ObaaSIWA - Women farmers in Ghana',
  title: 'About <>ObaaSIWA</>',
  body: `ObaaSIWA is a <>women-centered climate intelligence</> initiative that integrates indigenous ecological knowledge with responsible artificial intelligence to support better agricultural decision-making. Built in Ghana, ObaaSIWA recognizes women farmers not as passive users of technology, but as <>co-designers and community stewards</> of climate data systems. At the heart of the initiative is SIWA, a mobile application that gives farmers access to localized forecasts through the validated indigenous ecological indicators, providing accessible weather insights for their communities.`
};

const ANIMATION_VARIANTS = {
  slideInLeft: {
    hidden: { opacity: 1, x: -100, scale: 0.90 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: easeOut
      }
    }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 0 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.2
      }
    }
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AboutSection: React.FC<AboutSectionProps> = ({
  imageSrc = DEFAULT_CONTENT.imageSrc,
  imageAlt = DEFAULT_CONTENT.imageAlt,
  title = DEFAULT_CONTENT.title,
  body = DEFAULT_CONTENT.body,
  className = ''
}) => {
  return (
    <section 
      id="about"
      className={`w-full py-8 lg:py-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Column Layout | Desktop: Row Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Image Card - Gentle slide-in animation */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.slideInLeft}
          >
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Slight rotation for picture card effect */}
              <div className="transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <CardFrame>
                  <div className="relative aspect-4/5 w-full">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </CardFrame>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.fadeInRight}
          >
            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground">
              {parseHighlightedText(title)}
            </h2>

            {/* Body Text */}
            <div className="space-y-4">
                <p className="font-sans text-base sm:text-lg text-foreground/80 leading-relaxed">
                  {parseHighlightedText(body)}
                </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;