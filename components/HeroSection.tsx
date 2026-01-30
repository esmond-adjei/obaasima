'use client';

import CardFrame from '@/components/layout/CardFrame';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Sparkles } from 'lucide-react';
import CarouselLayout from './layout/CarouselLayout';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Button configuration
const buttons = [
  {
    label: 'Read Our Story',
    onClick: 'scrollToStory' as const,
    variant: 'primary',
    icon: ChevronRight
  },
  {
    label: 'Meet the Women',
    onClick: undefined,
    variant: 'accent',
    icon: Users
  },
  {
    label: 'Join the Movement',
    onClick: undefined,
    variant: 'secondary',
    icon: Sparkles
  }
] as const;

const contentList = [
  {
    backgroundImage: '/obaaSIWA.jpg',
    headline: 'When the Clouds Speak, <>She Listens</>',
    subheadline: 'Meet the women farmers of Ghana who are teaching artificial intelligence to understand the language of nature—and transforming climate resilience for rural Africa in the process.',
    ctas: [
      { label: 'Read Our Story', onClick: 'scrollToStory' as const, variant: 'primary', icon: ChevronRight },
      { label: 'Meet the Women', onClick: undefined, variant: 'accent', icon: Users },
      { label: 'Join the Movement', onClick: undefined, variant: 'secondary', icon: Sparkles }
    ]
  },
  {
    backgroundImage: '/obaaSIWA.jpg',
    headline: 'Empowering Farmers, <>One Forecast at a Time</>',
    subheadline: 'Discover how SIWA leverages indigenous knowledge and cutting-edge AI to deliver accurate, climate-smart weather forecasts tailored for smallholder farmers in Ghana.',
    ctas: [
      { label: 'Read Our Story', onClick: 'scrollToStory' as const, variant: 'primary', icon: ChevronRight },
      { label: 'Meet the Women', onClick: undefined, variant: 'accent', icon: Users },
      { label: 'Join the Movement', onClick: undefined, variant: 'secondary', icon: Sparkles }
    ]
  },
  {
    backgroundImage: '/obaaSIWA.jpg',
    headline: 'Bridging Tradition and Technology for <>Climate Resilience</>',
    subheadline: 'Explore how SIWA combines the wisdom of Ghanaian women farmers with advanced AI to create a revolutionary weather app that supports sustainable agriculture and food security.',
    ctas: [
      { label: 'Read Our Story', onClick: 'scrollToStory' as const, variant: 'primary', icon: ChevronRight },
      { label: 'Meet the Women', onClick: undefined, variant: 'accent', icon: Users },
      { label: 'Join the Movement', onClick: undefined, variant: 'secondary', icon: Sparkles }
    ]
  }
];

const buttonStyles = {
  primary: 'bg-(--color-primary) text-(--color-primary-dark)',
  accent: 'bg-(--color-accent) text-(--color-accent-dark)',
  secondary: 'bg-(--color-accent-warm) text-(--color-accent-warm-dark)',
} as const;

export default function HeroSection() {
  const scrollToStory = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleButtonClick = (onClick?: string) => {
    if (onClick === 'scrollToStory') scrollToStory();
  };

  return (
    <div className="">
      <CarouselLayout>
        {
          contentList.map((content, index) => (
            <div key={index} className="shrink-0">
              <CardFrame>
                <section className="relative w-full min-h-fit flex items-center justify-center overflow-hidden">
                  {/* Background Banner Image */}
                  <Image
                    src={content.backgroundImage}
                    alt={content.headline}
                    fill
                    className="object-cover object-top brightness-50"
                    priority
                  />

                  {/* Overlay Content */}
                  <motion.div 
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                  >
                    <div className="text-center">
                      {/* Main Headline */}
                      <motion.h1 
                        className="font-(--font-papyrus) text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 sm:mb-8 drop-shadow-lg"
                        variants={fadeInUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {content.headline.split('<>').map((part, idx) => 
                          part.includes('</>') ? (
                            <motion.span key={idx} className="text-amber-100" variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
                              {part.replace('</>', '')}
                            </motion.span>
                          ) : (
                            <span key={idx}>{part}</span>
                          )
                        )}
                        <br />
                        {content.headline.includes('<>') && content.headline.split('<>').length % 2 === 0 && (<br />)}
                      </motion.h1>

                      {/* Subheadline */}
                      <motion.p 
                        className="font-(--font-poppins) text-sm lg:text-xl text-gray-100 max-w-4xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow-md"
                        variants={fadeInUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {content.subheadline}
                      </motion.p>

                      {/* Call-to-Action Buttons */}
                      <motion.div 
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                        variants={fadeInUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {buttons.map(({ label, onClick, variant, icon: Icon }) => (
                          <button
                            key={label}
                            onClick={() => handleButtonClick(onClick)}
                            className={cn(
                              'px-8 py-4 cursor-pointer text-white text-sm rounded-full transition-all shadow-lg hover:shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center',
                              buttonStyles[variant],
                              'hover:bg-(--color-secondary-dark) hover:text-white'
                            )}
                          >
                            {label}
                            <Icon className="size-5 transition-transform" />
                          </button>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </section>
              </CardFrame>
            </div>
          ))
        }
      </CarouselLayout>
    </div>
  );
}
