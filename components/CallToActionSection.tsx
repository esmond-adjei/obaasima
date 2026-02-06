'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import { Handshake, Heart, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface CTAButton {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary' | 'accent';
}

interface CallToActionSectionProps {
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CTA_BUTTONS: CTAButton[] = [
  {
    id: 'partner',
    label: 'Partner With Us',
    href: '/partners',
    icon: <Handshake className="size-5 md:size-6" />,
    variant: 'primary'
  },
  {
    id: 'support',
    label: 'Support the Initiative',
    href: '/get-involved',
    icon: <Heart className="size-5 md:size-6" />,
    variant: 'secondary'
  },
  {
    id: 'siwa',
    label: 'Learn About SIWA',
    href: 'https://siwa.dipperlab.com',
    icon: <ExternalLink className="size-5 md:size-6" />,
    variant: 'accent'
  }
];

const BUTTON_STYLES = {
  primary: 'bg-(--color-accent-warm) hover:bg-(--color-accent-warm-dark) text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-(--color-accent) hover:bg-(--color-accent-dark) text-white shadow-lg hover:shadow-xl',
  accent: 'bg-(--color-primary-dark) hover:bg-(--color-secondary) text-white shadow-lg hover:shadow-xl'
};

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  },
  button: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
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

interface CTAButtonComponentProps {
  button: CTAButton;
}

const CTAButtonComponent: React.FC<CTAButtonComponentProps> = ({ button }) => {
  const isExternal = button.href.startsWith('http');
  
  return (
    <motion.a
      href={button.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      variants={ANIMATION_VARIANTS.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex items-center justify-center space-x-3 px-6 md:px-8 py-4 md:py-5 rounded-full font-sans text-base md:text-lg font-medium transition-all duration-300 group',
        BUTTON_STYLES[button.variant]
      )}
    >
      <span>{button.label}</span>
      <span className="group-hover:translate-x-1 transition-transform duration-200">
        {button.icon}
      </span>
    </motion.a>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ className = '' }) => {
  return (
    <section
      id="cta"
      className={cn('w-full py-20 lg:py-32 bg-(--color-primary-light)', className)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Content Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.container}
          className="text-center space-y-8 md:space-y-12"
        >
          
          {/* Headline */}
          <motion.h2
            variants={ANIMATION_VARIANTS.item}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight"
          >
            Build Climate Intelligence <br className="hidden md:block" />
            <span className="highlight">With Women</span>, Not Without Them
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={ANIMATION_VARIANTS.item}
            className="font-sans text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed"
          >
            ObaaSIWA invites partners, researchers, policymakers, and supporters to help scale an inclusive model of climate intelligence—one that respects indigenous knowledge and places women at the center of innovation.
          </motion.p>

          {/* Subtext */}
          <motion.p
            variants={ANIMATION_VARIANTS.item}
            className="font-sans text-xl md:text-2xl text-foreground font-medium"
          >
            Join us in shaping climate tools that work for communities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={ANIMATION_VARIANTS.container}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-10"
          >
            {CTA_BUTTONS.map((button) => (
              <CTAButtonComponent key={button.id} button={button} />
            ))}
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default CallToActionSection;
