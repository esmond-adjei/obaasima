# ObaaSIWA Website Development Guide
## Next.js 16+ App Router + Tailwind CSS + Google Fonts

---
ww
## Quick Start Setup

### 1. Install Dependencies
```bash
npx create-next-app@latest obaaSIWA-website --typescript --tailwind --app
cd obaaSIWA-website
npm install framer-motion @tailwindcss/typography
```

### 2. Tailwind Configuration

**tailwind.config.ts:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-earth': {
          DEFAULT: '#110911',
          80: 'rgba(17, 9, 17, 0.8)',
          60: 'rgba(17, 9, 17, 0.6)',
          40: 'rgba(17, 9, 17, 0.4)',
          20: 'rgba(17, 9, 17, 0.2)',
        },
        'warm-sand': {
          DEFAULT: '#CEC4A3',
          90: '#DDD5B8',
          70: '#E8E2CC',
          50: 'rgba(206, 196, 163, 0.5)',
          20: 'rgba(206, 196, 163, 0.2)',
        },
        success: '#7C9070',
        warning: '#B8956A',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-crimson)'],
        mono: ['var(--font-jetbrains)'],
      },
      maxWidth: {
        prose: '65ch',
        content: '1200px',
        wide: '1400px',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
```

### 3. Font Setup with Google Fonts

**app/layout.tsx:**
```typescript
import { Inter, Crimson_Pro, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata = {
  title: 'ObaaSIWA - Where Ancestral Wisdom Meets Modern Science',
  description: 'Empowering women farmers through AI-enhanced indigenous weather forecasting in Ghana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${crimsonPro.variable} ${jetBrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-deep-earth text-warm-sand-90 font-serif antialiased">
        {children}
      </body>
    </html>
  );
}
```

### 4. Global Styles

**app/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
    overflow-y: scroll;
  }
  
  body {
    @apply bg-deep-earth text-warm-sand-90 font-serif leading-normal overflow-x-hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-sans text-warm-sand font-bold;
  }
  
  a {
    @apply transition-colors duration-200;
  }
}

@layer components {
  /* Button Components */
  .btn-primary {
    @apply font-sans text-base font-medium px-8 py-3 rounded-sm;
    @apply bg-warm-sand text-deep-earth;
    @apply transition-all duration-300 ease-in-out;
    @apply hover:bg-warm-sand-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-warm-sand/20;
    @apply active:translate-y-0;
    @apply inline-flex items-center justify-center gap-2 tracking-wide;
    @apply disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0;
  }
  
  .btn-secondary {
    @apply font-sans text-base font-medium px-8 py-3 rounded-sm;
    @apply bg-transparent text-warm-sand border border-warm-sand;
    @apply transition-all duration-300 ease-in-out;
    @apply hover:bg-warm-sand/20 hover:border-warm-sand-90 hover:text-warm-sand-90;
    @apply active:translate-y-0;
    @apply inline-flex items-center justify-center gap-2 tracking-wide;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  /* Prose Styling */
  .prose-custom {
    @apply text-warm-sand-90 font-serif text-base leading-normal;
  }
  
  .prose-custom p {
    @apply mb-6;
  }
  
  .prose-custom h3 {
    @apply font-sans text-xl text-warm-sand mt-12 mb-6 font-bold;
  }
  
  .prose-custom h4 {
    @apply font-sans text-lg text-warm-sand mt-8 mb-4 font-semibold;
  }
  
  .prose-custom strong {
    @apply text-warm-sand font-medium;
  }
  
  .prose-custom em {
    @apply text-warm-sand italic;
  }
  
  .prose-custom a {
    @apply text-warm-sand underline decoration-warm-sand-50 underline-offset-2 hover:decoration-warm-sand;
  }
  
  .prose-custom ul {
    @apply list-disc pl-6 space-y-2 mb-6 text-warm-sand-90;
  }
  
  .prose-custom ol {
    @apply list-decimal pl-6 space-y-2 mb-6 text-warm-sand-90;
  }
  
  .prose-custom li {
    @apply pl-2;
  }
  
  .prose-custom blockquote {
    @apply my-12 py-8 border-l-4 border-warm-sand/50 pl-6 italic text-warm-sand;
  }
  
  .prose-custom code {
    @apply font-mono text-sm bg-warm-sand/10 px-2 py-1 rounded text-warm-sand;
  }
  
  /* Section Components */
  .section-wrapper {
    @apply w-full px-6 py-32 lg:px-8;
  }
  
  .section-inner {
    @apply max-w-prose mx-auto;
  }
  
  .section-wide {
    @apply max-w-content mx-auto;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## Design Philosophy

### Core Principles

1. **Seamless Flow** - No visible section boundaries (no boxes, cards, or hard dividers)
2. **Center Alignment** - Everything flows through the center like a book
3. **Earthy Elegance** - Colors represent soil (#110911) and sand (#CEC4A3)
4. **Generous Whitespace** - Let the story breathe
5. **Content First** - Design serves the narrative, never competes

### Visual Guidelines

- ✅ **DO**: Use subtle gradients, generous spacing, center alignment
- ❌ **DON'T**: Add boxes, background color changes between sections, unnecessary borders
- ✅ **DO**: Use serif fonts for body (storytelling), sans-serif for UI
- ❌ **DON'T**: Over-format with excessive bullets, bold text, or headers
- ✅ **DO**: Keep hover effects subtle and purposeful
- ❌ **DON'T**: Use dramatic animations or transitions

---

## Component Examples

### Hero Section
```tsx
// components/Hero.tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-deep-earth px-6 lg:px-8 py-16">
      {/* Subtle background image */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/assets/hero-bg.jpg"
          alt=""
          fill
          className="object-cover grayscale-[50%]"
          priority
        />
      </div>
      
      <div className="relative z-10 max-w-prose text-center">
        <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold text-warm-sand leading-tight mb-8 tracking-tight">
          When the Clouds Speak, She Listens
        </h1>
        
        <p className="font-serif text-lg md:text-xl text-warm-sand-90 leading-loose mb-12 max-w-[60ch] mx-auto">
          Meet the women farmers of Ghana who are teaching artificial 
          intelligence to understand the language of nature.
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="btn-primary">Read Our Story</button>
          <button className="btn-secondary">Meet the Women</button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce-slow">
        <span className="text-sm text-warm-sand-70 font-sans">Scroll to explore</span>
        <svg className="w-6 h-6 text-warm-sand-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
```

### Story Section
```tsx
// components/StorySection.tsx
import Image from 'next/image';

interface StorySectionProps {
  title?: string;
  children: React.ReactNode;
  quote?: {
    text: string;
    attribution: string;
  };
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export default function StorySection({ title, children, quote, image }: StorySectionProps) {
  return (
    <section className="section-wrapper bg-deep-earth">
      <div className="section-inner">
        {title && (
          <div className="text-center mb-24">
            <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-bold text-warm-sand leading-tight mb-6">
              {title}
            </h2>
            <div className="w-16 h-0.5 bg-warm-sand/50 mx-auto mt-6" />
          </div>
        )}
        
        <div className="prose-custom">
          {children}
          
          {quote && (
            <blockquote className="my-24 py-16 border-t border-b border-warm-sand/50 text-center">
              <p className="font-serif text-xl md:text-2xl italic text-warm-sand leading-loose mb-4 max-w-[50ch] mx-auto">
                <span className="text-5xl text-warm-sand/50 leading-[0] mr-1">"</span>
                {quote.text}
              </p>
              <cite className="font-sans text-sm text-warm-sand-70 not-italic tracking-wider uppercase">
                — {quote.attribution}
              </cite>
            </blockquote>
          )}
          
          {image && (
            <figure className="my-24 text-center">
              <div className="relative w-full aspect-video overflow-hidden rounded">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-300"
                />
              </div>
              {image.caption && (
                <figcaption className="font-sans text-sm text-warm-sand-70 mt-4 italic">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
```

### Stats Grid
```tsx
// components/StatsGrid.tsx
interface Stat {
  value: string;
  label: string;
  context?: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="section-wrapper bg-deep-earth">
      <div className="section-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 my-24">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-6 py-8 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-px bg-warm-sand/50" />
              
              <div className="font-sans text-5xl md:text-6xl font-bold text-warm-sand leading-tight mb-4">
                {stat.value}
              </div>
              
              <div className="font-sans text-base text-warm-sand-90 font-medium mb-2 tracking-wide">
                {stat.label}
              </div>
              
              {stat.context && (
                <div className="font-serif text-sm text-warm-sand-70 leading-normal">
                  {stat.context}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Navigation
```tsx
// components/Navigation.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-deep-earth/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'
    }`}>
      <div className="max-w-wide mx-auto px-6 lg:px-8 py-6 flex justify-between items-center">
        <Link href="/" className="font-sans text-xl font-bold text-warm-sand tracking-widest hover:text-warm-sand-90 transition-colors">
          ObaaSIWA
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {['Our Story', 'The Science', 'Impact', 'Get Involved', 'Contact'].map((item) => (
            <li key={item}>
              <Link 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="font-sans text-sm text-warm-sand-90 hover:text-warm-sand transition-colors tracking-wide"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        
        <button className="hidden md:block btn-primary text-sm px-6 py-2">
          Support Us
        </button>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-warm-sand"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-deep-earth/98 backdrop-blur-md border-t border-warm-sand/20">
          <ul className="px-6 py-4 space-y-4">
            {['Our Story', 'The Science', 'Impact', 'Get Involved', 'Contact'].map((item) => (
              <li key={item}>
                <Link 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block font-sans text-sm text-warm-sand-90 hover:text-warm-sand py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <button className="btn-primary w-full text-sm">Support Us</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
```

### Footer
```tsx
// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-deep-earth border-t border-warm-sand/50 section-wrapper">
      <div className="max-w-wide mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 text-center md:text-left">
            <h3 className="font-sans text-2xl font-bold text-warm-sand mb-3">ObaaSIWA</h3>
            <p className="font-serif text-sm text-warm-sand-70 italic">
              Where Ancestral Wisdom Meets Modern Science
            </p>
          </div>
          
          {/* Links */}
          {[
            { title: 'Learn More', links: ['Our Story', 'The Science', 'Impact', 'Research'] },
            { title: 'Get Involved', links: ['For Farmers', 'For Researchers', 'For Partners', 'Support Us'] },
            { title: 'Resources', links: ['Policy Brief', 'Publications', 'Open Data', 'FAQ'] },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="font-sans text-sm font-bold text-warm-sand mb-4 uppercase tracking-wider">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href={`#${link.toLowerCase().replace(' ', '-')}`} className="font-sans text-sm text-warm-sand-90 hover:text-warm-sand">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter */}
        <div className="text-center max-w-2xl mx-auto py-12 border-t border-b border-warm-sand/50 mb-12">
          <h4 className="font-sans text-xl font-bold text-warm-sand mb-3">Stay Updated</h4>
          <p className="font-serif text-base text-warm-sand-90 mb-6">
            Receive news about our progress and opportunities to get involved
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="flex-1 px-4 py-3 bg-warm-sand/10 border border-warm-sand/50 rounded-sm text-warm-sand font-sans text-base placeholder:text-warm-sand-70 focus:outline-none focus:border-warm-sand focus:bg-warm-sand/15"
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
        
        {/* Bottom */}
        <div className="text-center">
          {/* Social */}
          <div className="flex justify-center gap-6 mb-6">
            {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map((social) => (
              <a key={social} href="#" className="text-warm-sand-90 hover:text-warm-sand text-lg transition-colors" aria-label={social}>
                {social[0]}
              </a>
            ))}
          </div>
          
          {/* Legal */}
          <p className="font-sans text-xs text-warm-sand-70 mb-2">
            © 2025 DIPPER Lab, KNUST • Supported by GRAIN Network & AI4D Africa
          </p>
          <div className="font-sans text-xs text-warm-sand-70 flex justify-center gap-2 flex-wrap">
            <span>Partners:</span>
            <Link href="https://grain-africa.org" className="hover:text-warm-sand">GRAIN Network</Link>
            <span>•</span>
            <a href="#" className="hover:text-warm-sand">IPAR</a>
            <span>•</span>
            <a href="#" className="hover:text-warm-sand">CSEA</a>
            <span>•</span>
            <a href="#" className="hover:text-warm-sand">Sunbird AI</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## Animations with Framer Motion

### Fade In on Scroll
```tsx
// components/FadeIn.tsx
'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FadeIn({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Usage:
<FadeIn>
  <h2>This fades in when scrolled into view</h2>
</FadeIn>
```

---

## Responsive Design

### Breakpoint Usage
```tsx
// Tailwind breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// Example responsive text:
<h1 className="text-3xl md:text-4xl lg:text-6xl">
  Responsive Heading
</h1>

// Example responsive grid:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Content */}
</div>

// Example responsive padding:
<section className="px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
  {/* Content */}
</section>
```

---

## Accessibility

### Focus States
Already handled in globals.css, but ensure:
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-warm-sand focus:ring-offset-2 focus:ring-offset-deep-earth">
  Button
</button>
```

### Skip to Main Content
```tsx
// Add to layout.tsx
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-[9999] bg-warm-sand text-deep-earth px-4 py-2 font-sans font-bold"
>
  Skip to main content
</a>

// Add to main section:
<main id="main-content">
  {/* Content */}
</main>
```

### ARIA Labels
```tsx
<button aria-label="Close menu">
  <svg>...</svg>
</button>

<img src="..." alt="Woman farmer using SIWA app in field" />

<nav aria-label="Main navigation">
  {/* Nav items */}
</nav>
```

---

## Project Structure

```
obaaSIWA-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── fonts/ (if using local fonts)
├── components/
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── StorySection.tsx
│   ├── StatsGrid.tsx
│   ├── FadeIn.tsx
│   └── Button.tsx
├── public/
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── documents/
├── lib/
│   └── utils.ts
└── content/
    └── data.ts
```

---

## Page Assembly Example

```tsx
// app/page.tsx
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import StorySection from '@/components/StorySection';
import StatsGrid from '@/components/StatsGrid';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <>
      <Navigation />
      
      <main id="main-content">
        <Hero />
        
        <FadeIn>
          <StorySection
            title="A Crisis in the Fields"
            quote={{
              text: "For generations, we watched the Kakapenpen tree...",
              attribution: "A woman farmer from the Pra River Basin"
            }}
          >
            <p>Picture this: It's dawn in rural Ghana...</p>
            <h3>The Morning After</h3>
            <p>A woman farmer walks through her field...</p>
          </StorySection>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <StatsGrid stats={[
            { value: '27-42%', label: 'Traditional Forecast Accuracy', context: '12-hour predictions' },
            { value: '200', label: 'Women Champions', context: 'Being trained' },
            { value: '70%', label: 'Agricultural Workforce', context: 'Women farmers in West Africa' },
          ]} />
        </FadeIn>
        
        {/* More sections... */}
      </main>
      
      <Footer />
    </>
  );
}
```

---

## Final Checklist

### Design
- [ ] No visible section boundaries
- [ ] Center alignment throughout
- [ ] Only #110911 and #CEC4A3 colors used
- [ ] Generous whitespace
- [ ] Subtle animations
- [ ] No unnecessary boxes or borders

### Technical
- [ ] Images optimized with Next.js Image
- [ ] Fonts loaded via next/font/google
- [ ] Tailwind CSS configured correctly
- [ ] Responsive on all screen sizes
- [ ] Fast page load (<3s)
- [ ] No layout shift

### Accessibility
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] WCAG AA color contrast
- [ ] ARIA labels present
- [ ] Alt text on all images
- [ ] Focus states visible

### Content
- [ ] Story flows naturally
- [ ] Human-centered narrative
- [ ] Data supports story
- [ ] CTAs clear and purposeful

---

## Key Reminders for Developer

1. **This is a story, not a product page** - Every design decision enhances narrative flow
2. **Less is more** - Resist visual complexity
3. **Center everything** - Creates book-like reading experience
4. **Respect the colors** - #110911 and #CEC4A3 represent earth and work
5. **Test with real content** - Lorem ipsum hides flow issues
6. **Mobile-first** - Rural Ghana users primarily on phones
7. **Performance matters** - Fast loading respects limited data
8. **Accessibility is inclusion** - Non-negotiable

**When in doubt**: Ask "Does this help tell the story of women farmers using AI to adapt to climate change?" If not, remove it.

---

**Built with Next.js 13+, Tailwind CSS, and respect for the important work being done.**
