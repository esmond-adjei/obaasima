'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { easeOut } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Statistic {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
  duration?: number;
}

interface StatisticsSectionProps {
  statistics?: Statistic[];
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_STATISTICS: Statistic[] = [
  {
    id: '1',
    value: 50,
    suffix: '+',
    description: 'Research Projects',
    duration: 2
  },
  {
    id: '2',
    value: 100,
    suffix: '+',
    description: 'Publications',
    duration: 2.2
  },
  {
    id: '3',
    value: 25,
    suffix: '+',
    description: 'Research Partners',
    duration: 2.4
  },
  {
    id: '4',
    value: 15,
    suffix: '+',
    description: 'Years of Excellence',
    duration: 2.6
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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

interface OdometerNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const OdometerNumber: React.FC<OdometerNumberProps> = ({
  value,
  duration = 2,
  prefix = '',
  suffix = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 50
  });
  const [displayValue, setDisplayValue] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return () => unsubscribe();
  }, [springValue]);

  return (
    <div ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </div>
  );
};

interface StatisticCardProps {
  statistic: Statistic;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ statistic }) => {
  return (
    <motion.div
      variants={ANIMATION_VARIANTS.item}
      className="flex flex-col items-center text-center space-y-2"
    >
      {/* Number with Odometer Effect */}
      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-(--color-accent-warm) tabular-nums">
        <OdometerNumber
          value={statistic.value}
          duration={statistic.duration}
          prefix={statistic.prefix}
          suffix={statistic.suffix}
        />
      </div>

      {/* Description */}
      <p className="text-base sm:text-lg lg:text-xl text-foreground/70 font-medium">
        {statistic.description}
      </p>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  statistics = DEFAULT_STATISTICS,
  className = ''
}) => {
  if (!statistics?.length) return null;

  return (
    <section
      id="statistics"
      className={cn(`w-full py-4 lg:py-10`, className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statistics Grid - Column for mobile, Row for landscape */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={ANIMATION_VARIANTS.container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {statistics.map((stat) => (
            <StatisticCard key={stat.id} statistic={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;