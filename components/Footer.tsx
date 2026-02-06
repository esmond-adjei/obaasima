'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './CustomIcon';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  items: FooterLink[];
}

interface FooterProps {
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const FOCUS_AREAS = [
  'Women & Climate Decision-Making',
  'Indigenous Knowledge Systems',
  'Responsible & Inclusive AI',
  'Agriculture & Climate Resilience'
];

const FOOTER_LINKS: FooterSection[] = [
  {
    title: 'About',
    items: [
      { label: 'About ObaaSIWA', href: '#about' },
      { label: 'Our Impact', href: '#impact' },
      { label: 'Empowerment', href: '#empowerment' }
    ]
  },
  {
    title: 'SIWA',
    items: [
      { label: 'SIWA Platform', href: 'https://siwa.dipperlab.com' },
      { label: 'How It Works', href: '#empowerment' }
    ]
  },
  {
    title: 'Get Involved',
    items: [
      { label: 'Partners', href: '/partners' },
      { label: 'Support Us', href: '/get-involved' },
      { label: 'Contact', href: '/contact' }
    ]
  }
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface FooterLinksColumnProps {
  section: FooterSection;
}

const FooterLinksColumn: React.FC<FooterLinksColumnProps> = ({ section }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-serif text-lg md:text-xl text-foreground font-semibold">
        {section.title}
      </h4>
      <ul className="space-y-2">
        {section.items.map((link) => {
          const isExternal = link.href.startsWith('http');
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="font-sans text-sm md:text-base text-foreground/70 hover:text-(--color-accent-warm) transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('w-full bg-(--color-secondary) text-(--color-primary-light) py-12 lg:py-16', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Logo & Tagline */}
        <div className="text-center mb-12 space-y-4">
          <Link href="/" className="inline-block">
            <Logo size="large" />
          </Link>
          <h3 className="font-serif text-2xl md:text-3xl text-(--color-primary-light)">
            ObaaSIWA
          </h3>
          <p className="font-sans text-lg md:text-xl text-(--color-primary-light)/90">
            Women-Centered Climate Intelligence
          </p>
          <p className="font-sans text-base md:text-lg text-(--color-primary-light)/70">
            Powered by Indigenous Knowledge and Responsible AI
          </p>
        </div>

        {/* Middle Section: Focus Areas */}
        <div className="mb-12 border-t border-b border-(--color-primary-light)/20 py-8">
          <h4 className="font-serif text-xl md:text-2xl text-(--color-primary-light) text-center mb-6">
            Focus Areas
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {FOCUS_AREAS.map((area) => (
              <div
                key={area}
                className="font-sans text-sm md:text-base text-(--color-primary-light)/80"
              >
                {area}
              </div>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {FOOTER_LINKS.map((section) => (
              <FooterLinksColumn key={section.title} section={section} />
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-(--color-primary-light)/20 text-center">
          <p className="font-sans text-sm md:text-base text-(--color-primary-light)/60">
            © {currentYear} ObaaSIWA | All Rights Reserved
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
