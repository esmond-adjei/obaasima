'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#story', label: 'Our Story' },
    { href: '#champions', label: 'Women Champions' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#impact', label: 'Impact' },
    { href: '#join', label: 'Get Involved' },
  ];

  return (
    <header className="relative w-full bg-background border-b border-(--color-border)">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link 
              href="/" 
              className="flex items-center group"
            >
              <Image
                src="/logo-symbol.png"
                alt="ObaaSIWA Logo"
                width={40}
                height={40}
                className="h-10 w-10 sm:h-12 sm:w-12 transition-transform group-hover:scale-110"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Left */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-(--color-surface)"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-(--color-surface)"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <button className="ml-4 px-6 py-2.5 bg-primary text-white font-medium text-sm lg:text-base rounded-full hover:bg-(--color-primary-dark) transition-colors shadow-md hover:shadow-lg">
              Join Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center gap-2 p-2 rounded-lg text-foreground hover:bg-(--color-surface) transition-colors"
            aria-label="Toggle menu"
          >
            <ThemeToggle />
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-(--color-border)">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-(--color-surface) rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button className="mt-2 mx-4 px-6 py-3 bg-primary text-white font-medium text-base rounded-full hover:bg-(--color-primary-dark) transition-colors shadow-md">
                Join Us
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
