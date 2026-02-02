'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { 
  PlayIcon, 
  PauseIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ChevronRight, 
  Users, 
  Sparkles 
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CardFrame from './layout/CardFrame';
import { cn } from '@/lib/utils';
import { parseHighlightedText } from './HightlightText';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface AppMessageType {
  id: string;
  type: 'image' | 'video';
  src: string;
  altText?: string;
  heading?: string;
  subheading?: string;
  duration?: number;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  displayType?: 'banner' | 'modal' | 'toast';
}

type ButtonVariant = 'primary' | 'accent' | 'secondary';

interface ButtonConfig {
  label: string;
  onClick?: 'scrollToStory';
  variant: ButtonVariant;
  icon: React.ComponentType<{ className?: string }>;
}

interface BannerSectionProps {
  bannerItems?: AppMessageType[];
  defaultDuration?: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_DURATION = 5000;
const MAX_VIDEO_DURATION = 30000;
const PROGRESS_INTERVAL = 50;

const STATUS_ITEMS: AppMessageType[] = [
  {
    id: '1',
    type: 'image',
    src: '/obaaSIWA.jpg',
    heading: 'Women Read the <>Climate</> Every Day',
    subheading: 'Across rural Ghana, women farmers rely on generations of ecological knowledge—cloud movement, wind patterns, plant and animal behavior—to make decisions that sustain families and communities.',
    primaryButtonText: 'Learn More',
    primaryButtonLink: ROUTES.CONTACT,
    secondaryButtonText: 'Our Story',
    secondaryButtonLink: '#story',
    order: 0,
    displayType: 'banner'
  },
  {
    id: '2',
    type: 'image',
    src: '/obaaSIWA.jpg',
    heading: 'But the Climate Has <>Changed</>',
    subheading: 'Climate variability has disrupted familiar patterns. Indigenous forecasting is becoming less predictable, while modern climate tools often exclude women\'s realities, languages, and ways of knowing.',    
    primaryButtonText: 'Explore SIWA',
    primaryButtonLink: '#siwa',
    secondaryButtonText: 'The Challenge',
    secondaryButtonLink: '#impact',
    order: 1,
    displayType: 'banner'
  },
  {
    id: '3',
    type: 'image',
    src: '/obaaSIWA.jpg',
    heading: 'What If Women Shaped Climate Intelligence?',
    subheading: 'ObaaSIWA brings women\'s knowledge into the center of climate decision-making—combining indigenous indicators with AI through SIWA, the Smart Indigenous Weather App.',
    primaryButtonText: 'See Impact',
    primaryButtonLink: '#impact',
    secondaryButtonText: 'About ObaaSIWA',
    secondaryButtonLink: '#about',
    order: 2,
    displayType: 'banner'
  },
  {
    id: '4',
    type: 'image',
    src: '/obaaSIWA.jpg',
    heading: 'From Knowledge Holders to <>Co-Designers</>',
    subheading: "With the right tools, women don't just receive forecasts. They help decide what data matters, how it is interpreted, and who benefits from it.",
    primaryButtonText: 'Meet the Women',
    primaryButtonLink: '#empowerment',
    secondaryButtonText: 'Join Us',
    secondaryButtonLink: '#cta',
    order: 3,
    displayType: 'banner'
  }
];
const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }
};

const BUTTONS: readonly ButtonConfig[] = [
  {
    label: 'Read Our Story',
    onClick: 'scrollToStory',
    variant: 'primary',
    icon: ChevronRight
  },
  {
    label: 'Meet the Women',
    variant: 'accent',
    icon: Users
  },
  {
    label: 'Join the Movement',
    variant: 'secondary',
    icon: Sparkles
  }
];

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-primary)] text-dark',
  accent: 'bg-[var(--color-accent)] text-white',
  secondary: 'bg-[var(--color-accent-warm)] text-white',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const scrollToStory = () => {
  document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useVideoPlayback = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const playPromisesRef = useRef<(Promise<void> | null)[]>([]);

  const updateVideoPlayback = useCallback((index: number, shouldPlay: boolean) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromisesRef.current[index] = playPromise;
        playPromise
          .then(() => {
            playPromisesRef.current[index] = null;
          })
          .catch(error => {
            console.warn('Video play failed:', error);
            playPromisesRef.current[index] = null;
          });
      }
    } else {
      const playPromise = playPromisesRef.current[index];
      if (playPromise) {
        playPromise
          .then(() => video.pause())
          .catch(() => {})
          .finally(() => {
            playPromisesRef.current[index] = null;
          });
      } else {
        video.pause();
      }
    }
  }, []);

  return { videoRefs, updateVideoPlayback };
};

const useCarouselProgress = (
  bannerItems: AppMessageType[],
  itemDurations: number[],
  currentIndex: number,
  isPlaying: boolean,
  api: CarouselApi | undefined,
  isSingle: boolean
) => {
  const [progress, setProgress] = useState<number[]>(() => bannerItems.map(() => 0));
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimeouts = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    clearTimeouts();
    if (!isPlaying || !api || isSingle) return;

    const currentItemDuration = itemDurations[currentIndex];
    const startTime = Date.now();
    const currentProgress = progress[currentIndex] > 0 
      ? (progress[currentIndex] / 100) * currentItemDuration 
      : 0;

    progressIntervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime + currentProgress;
      const newProgressVal = Math.min((elapsedTime / currentItemDuration) * 100, 100);
      
      setProgress(prev => {
        const newProgress = [...prev];
        newProgress[currentIndex] = newProgressVal;
        return newProgress;
      });

      if (newProgressVal >= 100) {
        const nextIndex = currentIndex === bannerItems.length - 1 ? 0 : currentIndex + 1;
        api.scrollTo(nextIndex);
      }
    }, PROGRESS_INTERVAL);
  }, [clearTimeouts, bannerItems.length, isPlaying, api, isSingle, itemDurations, currentIndex, progress]);

  useEffect(() => {
    startProgress();
    return clearTimeouts;
  }, [startProgress, clearTimeouts]);

  return { progress, setProgress, clearTimeouts };
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface MediaBackgroundProps {
  item: AppMessageType;
  index: number;
  currentIndex: number;
  isPlaying: boolean;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
  updateVideoPlayback: (index: number, shouldPlay: boolean) => void;
}

const MediaBackground: React.FC<MediaBackgroundProps> = ({
  item,
  index,
  currentIndex,
  isPlaying,
  videoRefs,
  updateVideoPlayback
}) => {
  if (item.type === 'image') {
    return (
      <Image
        src={item.src}
        alt={item.altText || item.heading || 'Banner image'}
        className="absolute inset-0 w-full h-full object-cover z-10"
        fill
        sizes="100vw"
        priority={index === 0}
      />
    );
  }

  return (
    <video
      // eslint-disable-next-line react-hooks/immutability
      ref={el => { videoRefs.current[index] = el; }}
      src={item.src}
      poster="/images/default-video-poster.jpg"
      className="absolute inset-0 w-full h-full object-cover z-10"
      playsInline
      muted
      onLoadedMetadata={() => {
        if (index === currentIndex && isPlaying) {
          updateVideoPlayback(index, true);
        }
      }}
    />
  );
};

interface ContentOverlayProps {
  item: AppMessageType;
  isActive: boolean;
}

const ContentOverlay: React.FC<ContentOverlayProps> = ({ item, isActive }) => {
  if (!isActive) return null;

  const handleButtonClick = (onClick?: string) => {
    if (onClick === 'scrollToStory') scrollToStory();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.staggerContainer}
      >
        <div className="text-center space-y-3 md:space-y-6">
          {/* Headline */}
          <motion.h1 
            className="font-serif text-4xl md:text-5xl xl:text-6xl text-white drop-shadow-lg leading-21"
            variants={ANIMATION_VARIANTS.fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {parseHighlightedText(item.heading || '')}
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="font-sans text-sm lg:text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
            variants={ANIMATION_VARIANTS.fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {item.subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            variants={ANIMATION_VARIANTS.fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {BUTTONS.map(({ label, onClick, variant, icon: Icon }) => (
              <button
                key={label}
                onClick={() => handleButtonClick(onClick)}
                className={cn(
                  'px-3 py-2 text-xs md:px-6 md:py-4 cursor-pointer text-white md:text-sm rounded-full transition-all shadow-lg hover:shadow-xl flex items-center gap-2 shrink-0 whitespace-nowrap',
                  'hover:bg-(--color-secondary-dark) hover:text-white',
                  BUTTON_STYLES[variant],
                )}
              >
                {label}
                <Icon className="hidden md:block size-5 transition-transform" />
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};


interface CarouselControlsProps {
  isPlaying: boolean;
  progress: number[];
  currentIndex: number;
  bannerItems: AppMessageType[];
  api: CarouselApi | undefined;
  onTogglePlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  isPlaying,
  progress,
  currentIndex,
  bannerItems,
  api,
  onTogglePlayPause,
  onPrev,
  onNext
}) => (
  <div className="mt-6 w-full max-w-md mx-auto px-4 z-20">
    <div className="flex items-center justify-between w-full gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrev}
        className="text-foreground hover:bg-secondary/20 rounded-full shrink-0"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="size-6" />
      </Button>

      <div className='grow max-w-xs flex items-center gap-x-3'>
        <Button 
          variant="ghost"
          size="icon"
          onClick={onTogglePlayPause} 
          className="p-2 text-foreground rounded-full hover:bg-secondary/20 shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon className="size-5" /> : <PlayIcon className="size-5" />}
        </Button>
        
        <div className="grow flex space-x-2 h-1 items-center">
          {bannerItems.map((_, index) => (
            index === currentIndex ? (
              <div key={index} className="flex-1 bg-secondary/50 rounded-full overflow-hidden h-1.5">
                <div
                  className="h-full bg-foreground transition-all duration-100 ease-linear rounded-full"
                  style={{ width: `${progress[index]}%` }}
                />
              </div>
            ) : (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200 hover:scale-125',
                  index < currentIndex ? 'bg-foreground' : 'bg-secondary/50'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="text-foreground hover:bg-secondary/20 rounded-full shrink-0"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="size-6" />
      </Button>
    </div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const BannerSection: React.FC<BannerSectionProps> = ({
  bannerItems = STATUS_ITEMS,
  defaultDuration = DEFAULT_DURATION,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const { videoRefs, updateVideoPlayback } = useVideoPlayback();
  
  const isSingle = useMemo(() => bannerItems.length === 1, [bannerItems]);
  
  const itemDurations = useMemo(
    () => bannerItems.map(item => {
      const duration = item.duration || defaultDuration;
      return item.type === 'video' ? Math.min(duration, MAX_VIDEO_DURATION) : duration;
    }),
    [defaultDuration, bannerItems]
  );

  const { progress, setProgress } = useCarouselProgress(
    bannerItems,
    itemDurations,
    currentIndex,
    isPlaying,
    api,
    isSingle
  );

  const handleSelect = useCallback(() => {
    if (!api) return;
    
    const newIndex = api.selectedScrollSnap();
    setCurrentIndex(newIndex);
    setProgress(prev => prev.map((p, i) => (i < newIndex ? 0 : i === newIndex ? p : 0)));
    
    videoRefs.current.forEach((_, idx) => {
      updateVideoPlayback(idx, idx === newIndex && isPlaying);
    });
  }, [api, isPlaying, updateVideoPlayback, setProgress, videoRefs]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => {
      const newIsPlaying = !prev;
      updateVideoPlayback(currentIndex, newIsPlaying);
      return newIsPlaying;
    });
  }, [currentIndex, updateVideoPlayback]);

  const handleNext = useCallback(() => {
    if (!api) return;
    const nextIndex = currentIndex === bannerItems.length - 1 ? 0 : currentIndex + 1;
    api.scrollTo(nextIndex);
    setProgress(prev => prev.map(() => 0));
  }, [api, currentIndex, bannerItems, setProgress]);

  const handlePrev = useCallback(() => {
    if (!api) return;
    const prevIndex = currentIndex === 0 ? bannerItems.length - 1 : currentIndex - 1;
    api.scrollTo(prevIndex);
    setProgress(prev => prev.map(() => 0));
  }, [api, currentIndex, bannerItems, setProgress]);

  useEffect(() => {
    if (!api) return;
    
    api.on('select', handleSelect);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleSelect();
    
    return () => {
      api.off('select', handleSelect);
    };
  }, [api, handleSelect]);

  if (!bannerItems?.length) return null;

  return (
    <div className="relative w-full h-[calc(100vh-var(--header-height)*1.6)] hcc flex-col">
      <Carousel 
        setApi={setApi} 
        className="w-full mx-auto" 
        opts={{ 
          loop: true,
          align: 'center',
        }}
      >
        <CarouselContent className="-ml-4">
          {bannerItems.map((item, index) => {
            const isActive = index === currentIndex;
            
            return (
              <CarouselItem 
                key={item.id} 
                className="pl-4 basis-[90%] md:basis-4/5 lg:basis-2/3"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.90,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="h-[80vh]"
                >
                  <CardFrame
                    className="h-full w-full cursor-grab"
                    onClick={isActive ? togglePlayPause : undefined}
                  >
                    <section className="relative w-full h-full flex items-center justify-center">
                      <MediaBackground
                        item={item}
                        index={index}
                        currentIndex={currentIndex}
                        isPlaying={isPlaying}
                        videoRefs={videoRefs}
                        updateVideoPlayback={updateVideoPlayback}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-r from-secondary/80 via-secondary/40 to-transparent z-10" />

                      <ContentOverlay item={item} isActive={isActive} />
                    </section>
                  </CardFrame>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {!isSingle && (
        <CarouselControls
          isPlaying={isPlaying}
          progress={progress}
          currentIndex={currentIndex}
          bannerItems={bannerItems}
          api={api}
          onTogglePlayPause={togglePlayPause}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default BannerSection;