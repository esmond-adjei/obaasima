"use client";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, useMotionValue, useAnimationFrame, PanInfo } from "framer-motion";
import { PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CarouselLayoutProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  duration?: number; // Duration per slide in ms
  pauseOnHover?: boolean;
  showControls?: boolean;
  loop?: boolean;
  onSlideChange?: (index: number) => void;
  className?: string;
}

export default function CarouselLayout({
  children,
  autoPlay = true,
  duration = 10000,
  pauseOnHover = true,
  showControls = true,
  loop = true,
  onSlideChange,
  className = "",
}: CarouselLayoutProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(32);
  
  const x = useMotionValue(0);
  const childrenArray = React.Children.toArray(children);
  const itemCount = childrenArray.length;
  const isSingle = useMemo(() => itemCount === 1, [itemCount]);

  // Calculate card width and gap on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!trackRef.current) return;
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? window.innerWidth * 0.85 : 720;
      const gapSize = isMobile ? 24 : 32;
      setCardWidth(width);
      setGap(gapSize);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Snap to nearest card with optional callback
  const snapToCard = useCallback((index: number) => {
    if (cardWidth === 0 || itemCount === 0) return;
    
    const clampedIndex = Math.max(0, Math.min(itemCount - 1, index));
    const targetX = -(clampedIndex * (cardWidth + gap));
    x.set(targetX);
    setCurrentIndex(clampedIndex);
    setProgress(0);
    
    // Trigger callback if provided
    onSlideChange?.(clampedIndex);
  }, [cardWidth, gap, x, itemCount, onSlideChange]);

  // Initialize position after dimensions are set
  useEffect(() => {
    if (cardWidth > 0 && !isInitializedRef.current) {
      isInitializedRef.current = true;
      // Defer state update to avoid cascading renders
      requestAnimationFrame(() => {
        snapToCard(0);
      });
    }
  }, [cardWidth, snapToCard]);

  // Handle drag end with improved logic
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    let newIndex = currentIndex;
    const threshold = cardWidth / 3;
    
    // Determine direction based on velocity or offset
    if (Math.abs(velocity) > 500) {
      // Fast swipe
      newIndex = velocity > 0 ? currentIndex - 1 : currentIndex + 1;
    } else if (Math.abs(offset) > threshold) {
      // Slow drag past threshold
      newIndex = offset > 0 ? currentIndex - 1 : currentIndex + 1;
    }
    
    // Handle loop or clamp
    if (loop) {
      if (newIndex < 0) newIndex = itemCount - 1;
      if (newIndex >= itemCount) newIndex = 0;
    } else {
      newIndex = Math.max(0, Math.min(itemCount - 1, newIndex));
    }
    
    snapToCard(newIndex);
  }, [currentIndex, cardWidth, itemCount, loop, snapToCard]);

  // Auto-play with progress using useAnimationFrame
  useAnimationFrame((time, delta) => {
    if (!isPlaying || isPaused || isDragging || isSingle || cardWidth === 0) return;

    setProgress((prev) => {
      const increment = (delta / duration) * 100;
      const newProgress = prev + increment;

      if (newProgress >= 100) {
        const nextIndex = loop ? (currentIndex + 1) % itemCount : Math.min(currentIndex + 1, itemCount - 1);
        
        // Stop playing if we've reached the end and loop is disabled
        if (!loop && nextIndex === itemCount - 1 && currentIndex === itemCount - 1) {
          setIsPlaying(false);
          return 0;
        }
        
        snapToCard(nextIndex);
        return 0;
      }

      return newProgress;
    });
  });

  // Navigation handlers with loop support
  const handleNext = useCallback(() => {
    if (loop) {
      const nextIndex = (currentIndex + 1) % itemCount;
      snapToCard(nextIndex);
    } else {
      const nextIndex = Math.min(currentIndex + 1, itemCount - 1);
      snapToCard(nextIndex);
      if (nextIndex === itemCount - 1) {
        setIsPlaying(false); // Stop at end if not looping
      }
    }
  }, [currentIndex, itemCount, loop, snapToCard]);

  const handlePrev = useCallback(() => {
    if (loop) {
      const prevIndex = currentIndex === 0 ? itemCount - 1 : currentIndex - 1;
      snapToCard(prevIndex);
    } else {
      const prevIndex = Math.max(currentIndex - 1, 0);
      snapToCard(prevIndex);
    }
  }, [currentIndex, itemCount, loop, snapToCard]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      snapToCard(index);
    }
  }, [itemCount, snapToCard]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
      if (e.key === " " && !isSingle) {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, togglePlayPause, isSingle]);

  // Cleanup
  useEffect(() => {
    const intervalId = progressIntervalRef.current;
    return () => {
      if (intervalId) {
        cancelAnimationFrame(intervalId);
      }
    };
  }, []);

  // Calculate drag constraints dynamically
  const dragConstraints = useMemo(() => {
    if (cardWidth === 0 || itemCount === 0) return { left: 0, right: 0 };
    return {
      left: -(cardWidth + gap) * (itemCount - 1),
      right: 0,
    };
  }, [cardWidth, gap, itemCount]);

  if (!childrenArray.length) return null;

  return (
    <section className={`relative w-full py-14 md:py-20 overflow-hidden ${className}`}>
      <div className="w-full">
        {/* Carousel Track */}
        <motion.div
          ref={trackRef}
          drag={itemCount > 1 ? "x" : false}
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onHoverStart={() => pauseOnHover && !isSingle && setIsPaused(true)}
          onHoverEnd={() => pauseOnHover && !isSingle && setIsPaused(false)}
          style={{ x }}
          className={`flex gap-6 md:gap-8 px-4 md:px-12 ${
            itemCount > 1 ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          {childrenArray.map((child, index) => (
            <motion.div
              key={index}
              className="shrink-0"
              animate={{
                scale: index === currentIndex ? 1 : 0.95,
                opacity: index === currentIndex ? 1 : 0.6,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        {!isSingle && showControls && (
          <div className="flex items-center justify-center mt-8 px-4">
            <div className="flex items-center gap-4 max-w-md w-full">
              <button
                onClick={handlePrev}
                disabled={!loop && currentIndex === 0}
                className="text-foreground hover:bg-accent rounded-full p-2 transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="size-6" />
              </button>

              <div className="grow flex items-center gap-2">
                <button
                  onClick={togglePlayPause}
                  className="text-foreground hover:bg-accent rounded-full p-2 transition-colors shrink-0"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <PauseIcon className="size-5" />
                  ) : (
                    <PlayIcon className="size-5" />
                  )}
                </button>

                {/* Progress Indicators */}
                <div className="grow flex gap-1.5 h-1 items-center">
                  {childrenArray.map((_, index) =>
                    index === currentIndex ? (
                      <div
                        key={index}
                        className="flex-1 bg-muted rounded-full overflow-hidden h-1 min-w-2"
                      >
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.1, ease: "linear" }}
                        />
                      </div>
                    ) : (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 ${
                          index < currentIndex ? "bg-primary" : "bg-muted"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    )
                  )}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!loop && currentIndex === itemCount - 1}
                className="text-foreground hover:bg-accent rounded-full p-2 transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="size-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
