'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import { AlertCircle, Users, TrendingDown, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface WhyMatter {
  id: string;
  icon: React.ReactNode;
  text: string;
}

interface WhyItMattersSectionProps {
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const WHY_MATTERS: WhyMatter[] = [
  {
    id: '1',
    icon: <Users className="size-6 md:size-7" />,
    text: 'Women make critical farming decisions yet are often excluded from climate tools'
  },
  {
    id: '2',
    icon: <AlertCircle className="size-6 md:size-7" />,
    text: 'Indigenous knowledge is rarely treated as valid data'
  },
  {
    id: '3',
    icon: <TrendingDown className="size-6 md:size-7" />,
    text: 'AI systems risk reinforcing inequality when communities are not involved in design'
  }
];

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface MatterItemProps {
  matter: WhyMatter;
}

const MatterItem: React.FC<MatterItemProps> = ({ matter }) => {
  return (
    <motion.div
      variants={ANIMATION_VARIANTS.item}
      className="flex items-start space-x-4 p-4 md:p-6 bg-(--color-surface) rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="text-(--color-accent-warm) shrink-0 mt-1">
        {matter.icon}
      </div>
      <p className="font-sans text-base md:text-lg text-foreground/80">
        {matter.text}
      </p>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const WhyItMattersSection: React.FC<WhyItMattersSectionProps> = ({ className = '' }) => {
  return (
    <section
      id="why-it-matters"
      className={cn('w-full py-12 lg:py-16', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Why It Matters
          </h2>
          <p className="font-sans text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
            Women farmers face multiple barriers in accessing climate tools and resources.
          </p>
        </motion.div>

        {/* Matters Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={ANIMATION_VARIANTS.container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {WHY_MATTERS.map((matter) => (
            <MatterItem key={matter.id} matter={matter} />
          ))}
        </motion.div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="font-sans text-xl md:text-2xl text-foreground font-medium">
            <span className="highlight">ObaaSIWA addresses all three</span>—by design.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyItMattersSection;
