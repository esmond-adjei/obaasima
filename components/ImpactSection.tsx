'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import { Users, Sprout, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ImpactItem {
  id: string;
  category: string;
  icon: React.ReactNode;
  impacts: string[];
}

interface ImpactSectionProps {
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const IMPACT_DATA: ImpactItem[] = [
  {
    id: 'women',
    category: 'For Women Farmers',
    icon: <Users className="size-10 md:size-12" />,
    impacts: [
      'Increased confidence in climate decision-making',
      'Greater recognition as climate knowledge leaders',
      'Stronger voice in farmer groups and community discussions'
    ]
  },
  {
    id: 'communities',
    category: 'For Communities',
    icon: <Sprout className="size-10 md:size-12" />,
    impacts: [
      'Improved timing of planting and harvesting',
      'Reduced risk from sudden rainfall changes',
      'Greater trust in climate tools that reflect local realities'
    ]
  },
  {
    id: 'climate',
    category: 'For Climate Systems',
    icon: <Cloud className="size-10 md:size-12" />,
    impacts: [
      'Indigenous knowledge treated as structured, valuable data',
      'AI models grounded in lived experience',
      'Extension officers and institutions engaging with women\'s insights'
    ]
  }
];

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easeOut
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

interface ImpactCardProps {
  impact: ImpactItem;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ impact }) => {
  return (
    <motion.div
      variants={ANIMATION_VARIANTS.item}
      className="flex flex-col space-y-4 p-6 md:p-8 bg-(--color-surface) rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Icon */}
      <div className="text-(--color-accent-warm)">
        {impact.icon}
      </div>

      {/* Category Title */}
      <h3 className="font-serif text-2xl md:text-3xl text-foreground">
        {impact.category}
      </h3>

      {/* Impact List */}
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
        className="space-y-3"
      >
        {impact.impacts.map((item, index) => (
          <motion.li
            key={index}
            variants={ANIMATION_VARIANTS.listItem}
            className="flex items-start space-x-3"
          >
            <span className="text-(--color-accent-warm) mt-1.5 shrink-0">•</span>
            <span className="font-sans text-base md:text-lg text-foreground/80">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ImpactSection: React.FC<ImpactSectionProps> = ({ className = '' }) => {
  return (
    <section
      id="impact"
      className={cn('w-full py-16 lg:py-24 bg-(--color-primary-light)', className)}
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
            What Has Changed
          </h2>
          <p className="font-sans text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            The result is change that is practical, social, and structural.
          </p>
        </motion.div>

        {/* Impact Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={ANIMATION_VARIANTS.container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {IMPACT_DATA.map((impact) => (
            <ImpactCard key={impact.id} impact={impact} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
