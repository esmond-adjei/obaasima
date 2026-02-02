'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface HighlightTextProps {
  text: string;
  highlightClassName?: string;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Parses text with <> </> markers and returns an array of JSX elements
 * @param text - The input text with <> </> markers
 * @param highlightClassName - CSS class to apply to highlighted segments
 * @returns Array of React nodes (strings and span elements)
 */
const parseHighlightedText = (
  text: string, 
  highlightClassName: string = 'highlight'
): React.ReactNode[] => {
  if (!text) return [];

  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let partIndex = 0;

  // Regular expression to match <>content</>
  const regex = /<>(.*?)<\/>/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;
    const highlightedContent = match[1];

    // Add text before the match (if any)
    if (matchStart > currentIndex) {
      const beforeText = text.slice(currentIndex, matchStart);
      parts.push(
        <React.Fragment key={`text-${partIndex++}`}>
          {beforeText}
        </React.Fragment>
      );
    }

    // Add the highlighted content
    parts.push(
      <span 
        key={`highlight-${partIndex++}`} 
        className={highlightClassName}
      >
        {highlightedContent}
      </span>
    );

    currentIndex = matchEnd;
  }

  // Add any remaining text after the last match
  if (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);
    parts.push(
      <React.Fragment key={`text-${partIndex++}`}>
        {remainingText}
      </React.Fragment>
    );
  }

  // If no matches were found, return the original text
  if (parts.length === 0) {
    parts.push(
      <React.Fragment key="text-0">
        {text}
      </React.Fragment>
    );
  }

  return parts;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * HighlightText component that parses text with <> </> markers and applies highlight styling
 * 
 * @example
 * <HighlightText text="About <>ObaaSIWA</>" />
 * // Renders: About <span className="highlight">ObaaSIWA</span>
 * 
 * @example
 * <HighlightText 
 *   text="The <>Quick</> Brown Fox" 
 *   highlightClassName="text-amber-500 font-bold"
 * />
 * // Renders: The <span className="text-amber-500 font-bold">Quick</span> Brown Fox
 */
const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  highlightClassName,
  className = '',
  as: Component = 'span'
}) => {
  const parsedContent = parseHighlightedText(text, highlightClassName);

  return (
    <Component className={cn(className)}>
      {parsedContent}
    </Component>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default HighlightText;
export { parseHighlightedText };
export type { HighlightTextProps };