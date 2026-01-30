'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CardFrame from './CardFrame';


interface AppMessageType {
  id: string;
  type: 'image' | 'video';
  src: string;
  altText?: string;
  heading?: string;
  subheading?: string;
  duration?: number; // in milliseconds, for video or image display duration
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order?: number;
  displayType?: 'banner' | 'modal' | 'toast';
}

const statusItems: AppMessageType[] = [
  {
    id: '3',
    type: 'image',
    src: '/obaaSIWA.jpg',
    heading: 'Digital Transformation',
    subheading: 'Our research targets low-power, reliable communication, and diverse smart device support, aiming to advance technologies.',
    primaryButtonText: 'Learn More',
    primaryButtonLink: ROUTES.CONTACT,
    secondaryButtonText: 'Our Research',
    secondaryButtonLink: ROUTES.researchProjects(),
    order: 0,
    displayType: 'banner'
  },
  {
    id: '2',
    type: 'image',
    src: '/obaaSIWA.jpg',
    heading: 'AI Safety and Security',
    subheading: 'We research on robust, interpretable, and privacy-preserving AI for IoT and edge systems to ensure reliable intelligent services.',    
    primaryButtonText: 'Projects',
    primaryButtonLink: ROUTES.researchProjects(),
    secondaryButtonText: 'Publications',
    secondaryButtonLink: ROUTES.publications(),
    order: 0,
    displayType: 'banner'
  },
  {
    id: '4',
    type: 'image',
    src: '/obaaSIWA.jpg',
    heading: 'IoT & Edge Intelligence',
    subheading: 'Advancing distributed IoT platforms and edge computing solutions for next-generation smart systems.',
    primaryButtonText: 'View Projects',
    primaryButtonLink: ROUTES.researchProjects(),
    secondaryButtonText: 'Team',
    secondaryButtonLink: '/people/team',
    order: 0,
    displayType: 'banner'
  }
];


type BannerSectionProps = {
  bannerItems?: AppMessageType[];
  defaultDuration?: number;
};

const BannerSection: React.FC<BannerSectionProps> = ({
  bannerItems = statusItems,
  defaultDuration = 10000,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState<number[]>(() => bannerItems.map(() => 0));

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const playPromisesRef = useRef<(Promise<void> | null)[]>([]);
  const itemDurations = useMemo(
    () => bannerItems.map(item => {
      const duration = item.duration || defaultDuration;
      return item.type === 'video' ? Math.min(duration, 30000) : duration;
    }),
    [defaultDuration, bannerItems]
  );

  const isSingle = useMemo(() => bannerItems.length === 1, [bannerItems]);

  const clearTimeouts = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const updateVideoPlayback = useCallback((index: number, shouldPlay: boolean) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromisesRef.current[index] = playPromise;
        playPromise
          .then(() => {
            // Video playback started successfully
            playPromisesRef.current[index] = null;
          })
          .catch(error => {
            // Auto-play was prevented or other error occurred
            console.warn('Video play failed:', error);
            playPromisesRef.current[index] = null;
          });
      }
    } else {
      // Wait for any pending play promise before pausing
      const playPromise = playPromisesRef.current[index];
      if (playPromise) {
        playPromise
          .then(() => {
            video.pause();
          })
          .catch(() => {
            // Play failed, no need to pause
          })
          .finally(() => {
            playPromisesRef.current[index] = null;
          });
      } else {
        video.pause();
      }
    }
  }, []);

  const handleSelect = useCallback(() => {
    if (!api) return;
    
    const newIndex = api.selectedScrollSnap();
    setCurrentIndex(newIndex);
    setProgress(prev => prev.map((p, i) => (i < newIndex ? 0 : i === newIndex ? p : 0)));
    
    videoRefs.current.forEach((_, idx) => {
      updateVideoPlayback(idx, idx === newIndex && isPlaying);
    });
  }, [api, isPlaying, updateVideoPlayback]);

  const startProgress = useCallback(() => {
    clearTimeouts();
    if (!isPlaying || !api || isSingle) return;

    const currentItemDuration = itemDurations[currentIndex];
    const startTime = Date.now();
    const currentProgress = progress[currentIndex] > 0 ? (progress[currentIndex] / 100) * currentItemDuration : 0;

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
    }, 50);
  }, [clearTimeouts, bannerItems.length, isPlaying, api, isSingle, itemDurations, currentIndex, progress]);

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
  }, [api, currentIndex, bannerItems]);

  const handlePrev = useCallback(() => {
    if (!api) return;
    
    const prevIndex = currentIndex === 0 ? bannerItems.length - 1 : currentIndex - 1;
    api.scrollTo(prevIndex);
    setProgress(prev => prev.map(() => 0));
  }, [api, currentIndex, bannerItems]);

  useEffect(() => {
    if (!api) return;
    
    api.on('select', handleSelect);
    handleSelect();
    
    return () => {
      api.off('select', handleSelect);
    };
  }, [api, handleSelect]);

  useEffect(() => {
    startProgress();
    return () => {
      clearTimeouts();
    };
  }, [startProgress, clearTimeouts]);

  if (!bannerItems?.length) return null;

  return (
    <div className="relative w-full h-[calc(100vh-var(--header-height)*1.6)] flex flex-col items-center justify-center overflow-hidden py-8">
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
                className="pl-4 basis-full md:basis-4/5 lg:basis-2/3"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="h-[calc(100vh-var(--header-height)*2)] 2xl:h-[85vh]"
                >
                  <CardFrame
                    className="h-full w-full"
                    onClick={isActive ? togglePlayPause : undefined}
                  >
                    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">

                      {/* BACKGROUND MEDIA */}
                      {item.type === 'image' ? (
                        <Image
                          src={item.src}
                          alt={item.altText || item.heading || 'Status image'}
                          className="absolute inset-0 w-full h-full object-cover z-10"
                          fill
                          sizes="100vw"
                          priority={index === 0}
                        />
                      ) : (
                        <video
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
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />

                      {/* TEXT SECTION - Only show on active card */}
                      {isActive && (
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={`text-${item.id}-${currentIndex}`}
                            className="z-20 cursor-default bg-background/20 border border-white/30 backdrop-blur-xl ml-4 md:ml-12 lg:ml-20 mx-4 p-6 md:p-8 max-w-xl lg:max-w-2xl"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ 
                              duration: 0.5, 
                              ease: 'easeOut',
                              opacity: { duration: 0.3 },
                              y: { duration: 0.5 },
                              scale: { duration: 0.4 }
                            }}
                          >
                            {item.heading && (
                              <motion.h1 
                                className="text-3xl md:text-4xl lg:text-5xl line-clamp-3 font-bold mb-4 text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ lineHeight: 1.2 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                              >
                                {item.heading}
                              </motion.h1>
                            )}
                            {item.subheading && (
                              <motion.p 
                                className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                              >
                                {item.subheading}
                              </motion.p>
                            )}
                            <motion.div 
                              className="flex flex-wrap gap-4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                            >
                              {item.primaryButtonText && item.primaryButtonLink && (
                                <Link 
                                  href={item.primaryButtonLink} 
                                  className="button bg-primary-500 text-white hover:bg-primary-600 px-6 py-3 font-medium hover:bg-opacity-90 transition-colors rounded-lg"
                                >
                                  {item.primaryButtonText}
                                </Link>
                              )}
                              {item.secondaryButtonText && item.secondaryButtonLink && (
                                <Link 
                                  href={item.secondaryButtonLink} 
                                  className="button bg-white/90 text-black hover:bg-white px-6 py-3 font-medium transition-colors rounded-lg"
                                >
                                  {item.secondaryButtonText}
                                </Link>
                              )}
                            </motion.div>
                          </motion.div>
                        </AnimatePresence>
                      )}

                    </section>
                  </CardFrame>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {!isSingle && (
        <div className="mt-6 w-full max-w-md mx-auto px-4 z-20">
          <div className="flex items-center justify-between w-full gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="text-foreground hover:bg-secondary/20 rounded-full shrink-0"
            >
              <ChevronLeftIcon className="size-6" />
            </Button>

            <div className='grow max-w-xs flex items-center gap-x-3'>
              <Button 
                variant="ghost"
                size="icon"
                onClick={togglePlayPause} 
                className="p-2 text-foreground rounded-full hover:bg-secondary/20 shrink-0"
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
                      className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 ${
                        index < currentIndex ? 'bg-foreground' : 'bg-secondary/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="text-foreground hover:bg-secondary/20 rounded-full shrink-0"
            >
              <ChevronRightIcon className="size-6" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerSection;