'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import CardFrame from './layout/CardFrame';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface EmpowermentSectionProps {
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SIWA_FEATURES = [
  'Record indigenous ecological indicators in real time',
  'Compare observations with rainfall data',
  'Participate in refining how forecasts are generated',
  'Share feedback on what works in the field'
];

const STEWARDSHIP_ACTIONS = [
  'Lead data collection',
  'Influence how indicators are interpreted',
  'Guide feature design and usability',
  'Serve as community champions and trainers'
];

const ANIMATION_VARIANTS = {
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.2
      }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut
      }
    }
  },
  listContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  listItem: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface FeatureListProps {
  items: string[];
  title: string;
}

const FeatureList: React.FC<FeatureListProps> = ({ items, title }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-serif text-xl md:text-2xl text-foreground">
        {title}
      </h4>
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={ANIMATION_VARIANTS.listContainer}
        className="space-y-3"
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            variants={ANIMATION_VARIANTS.listItem}
            className="flex items-start space-x-3"
          >
            <CheckCircle2 className="size-5 md:size-6 text-(--color-accent) shrink-0 mt-0.5" />
            <span className="font-sans text-base md:text-lg text-foreground/80">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const EmpowermentSection: React.FC<EmpowermentSectionProps> = ({ className = '' }) => {
  return (
    <section
      id="empowerment"
      className={cn('w-full py-16 lg:py-24', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-center mb-12 md:mb-16 space-y-4"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            Empowering Women Through SIWA
          </h2>
          <p className="font-sans text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            SIWA is more than a weather app. It is a <span className="highlight">shared climate intelligence system</span>, shaped by the women who use it.
          </p>
        </motion.div>

        {/* First Row: SIWA Features with Image */}
        <div className="mb-16 lg:mb-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* SIWA App Image */}
            <motion.div
              className="w-full lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.slideInLeft}
            >
              <CardFrame className="overflow-hidden">
                <div className="relative aspect-3/4 w-full">
                  <Image
                    src="/obaaSIWA.jpg"
                    alt="Women farmers using SIWA app"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </CardFrame>
            </motion.div>

            {/* Features Content */}
            <motion.div
              className="w-full lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.slideInRight}
            >
              <div className="space-y-6">
                <h3 className="font-serif text-3xl md:text-4xl text-foreground">
                  Through SIWA, women farmers:
                </h3>
                <FeatureList items={SIWA_FEATURES} title="" />
                
                {/* SIWA Link */}
                <a
                  href="https://siwa.dipperlab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-(--color-accent-warm) hover:text-(--color-accent-warm-dark) font-sans text-lg transition-colors duration-200 group"
                >
                  <span>Visit SIWA Platform</span>
                  <ExternalLink className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Second Row: From Users to Stewards */}
        <div>
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
            
            {/* Image */}
            <motion.div
              className="w-full lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.slideInRight}
            >
              <CardFrame className="overflow-hidden">
                <div className="relative aspect-3/4 w-full">
                  <Image
                    src="/obaaSIWA.jpg"
                    alt="Women as community stewards"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </CardFrame>
            </motion.div>

            {/* Stewardship Content */}
            <motion.div
              className="w-full lg:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={ANIMATION_VARIANTS.slideInLeft}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                    From Users to Stewards
                  </h3>
                  <p className="font-sans text-base md:text-lg text-foreground/70">
                    ObaaSIWA intentionally shifts power by enabling women to:
                  </p>
                </div>
                <FeatureList items={STEWARDSHIP_ACTIONS} title="" />
                <p className="font-sans text-base md:text-lg text-foreground/80 italic">
                  This approach ensures climate technology supports <span className="highlight">equality in practice</span>, not just in principle.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default EmpowermentSection;
