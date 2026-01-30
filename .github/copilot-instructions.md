# ObaaSIWA Website - Copilot Instructions

## Project Overview
This is a storytelling website for **ObaaSIWA**, a climate resilience project by DIPPER Lab that combines traditional ecological knowledge with AI to support women farmers in Ghana. The site tells the story of how women farmers become co-designers in creating hybrid weather forecasting systems.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 (PostCSS plugin architecture) with v4 syntax (e.g., `bg-(--color-surface)`)
- **Fonts**: Papyrus (local, from public/font) for display; Poppins (Google Font) for body text
- **Images**: Using Next.js Image component with public assets (logos, banners from public/)
- **Analytics**: Vercel Analytics
- **Deployment Target**: Vercel

## Architecture & Patterns

### Font Strategy
Two custom fonts are configured in [../app/layout.tsx](../app/layout.tsx):
- **Papyrus** (`--font-papyrus`): Display font for headings and titles (local font from public/font)
- **Poppins** (`--font-poppins`): Body font for all text content (Google Font)

Both fonts use `display: 'swap'` for performance, with comprehensive fallbacks, preloading enabled, and `adjustFontFallback` for layout stability. Access via CSS variables in components: `var(--font-papyrus)` for headings and `var(--font-poppins)` for body text.

### Color System
Custom color scheme defined in [../app/globals.css](../app/globals.css) using **OKLCH color space** for perceptual uniformity with full dark mode support:

**Light Mode (Primary Themed):**
- Primary palette: `--color-primary` (warm earthy tones), `--color-primary-light`, `--color-primary-dark`
- Backgrounds: Lighter variations of the primary palette
- Text: Deep dark foreground for readability

**Dark Mode (Secondary Themed):**
- Secondary palette: `--color-secondary` (deep earth tones) used as base for dark backgrounds
- Backgrounds: Darker variations (oklch(12-18%) for deep dark aesthetic
- Text: Light foreground (oklch(92%) for excellent contrast

**Shared Across Both Modes:**
- Accent colors: `--color-accent` (nature-inspired greens), `--color-accent-warm`
- Semantic: `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- **All colors MUST be defined in OKLCH format** for consistent perception across displays
- Automatic theme detection via `@media (prefers-color-scheme: dark)`
- Smooth transitions between light/dark modes (0.3s ease)

### General Theme rules
- No emojis


### Path Aliases
TypeScript configured with `@/*` alias pointing to project root. Use for imports:
```typescript
import Component from '@/components/Component'
import { util } from '@/lib/utils'
```

## Content Strategy
The website follows a **storytelling arc** documented in [../docs/obaaSIWA_storytelling_website.md](../docs/obaaSIWA_storytelling_website.md):
1. **Hero**: "When the Clouds Speak, She Listens" - establishes emotional connection
2. **Crisis**: The changing climate's impact on traditional knowledge
3. **Innovation**: Introduction of SIWA's hybrid approach
4. **Champions**: Women farmers as co-designers, not just users
5. **Science**: Technical explanation accessible to non-technical audiences
6. **Impact**: Gender-disaggregated outcomes that matter

When creating components, reference this document for approved copy, narrative flow, and content hierarchy.

## Development Workflows

### Running Locally
```bash
npm run dev    # Development server on localhost:3000
npm run build  # Production build
npm run lint   # Run ESLint
```

### Component Creation
- Create components in `components/` directory (not yet created)
- Use TypeScript with proper interface definitions
- Follow React 19 patterns (no legacy APIs)
- Implement responsive design mobile-first
- Ensure accessibility (semantic HTML, ARIA where needed)

## Key Design Principles

### Storytelling First
- Each section should feel like a narrative progression
- Use woman farmers' authentic voices (quotes from docs)
- Balance emotion with factual impact data
- Prioritize imagery that shows women as knowledge holders, not beneficiaries

### Performance
- Use `next/image` for all images with proper `width`, `height`, and `priority` flags
- Leverage font optimization configured in layout
- Keep JavaScript minimal - this is primarily a content site
- Lazy load below-the-fold content

### Accessibility & Inclusivity
- This project serves communities with varying digital literacy
- Design should be intuitive for international audiences
- Consider cultural context: Ghana, women farmers, rural communities
- Support for future multilingual content (English primary, local languages planned)

## Critical Context
- **Target Audience**: Funders, partners, policymakers, and general public interested in climate + gender + tech
- **Core Message**: Women farmers are experts whose knowledge, when combined with AI, creates more resilient agricultural systems
- **Tone**: Inspirational yet grounded in evidence; celebrates women without patronizing

## Common Tasks

### Adding New Sections
1. Check [../docs/obaaSIWA_storytelling_website.md](../docs/obaaSIWA_storytelling_website.md) for approved content
2. Create component in `components/` with descriptive name (e.g., `HeroSection.tsx`)
3. Import and use fonts via className: `className={lexend.className}` or CSS variables
4. Follow mobile-first responsive patterns with Tailwind

### Styling Guidelines
- **Always use Tailwind CSS v4 utility classes** for all styling
- **Never use inline styles** or style attributes
- Use Tailwind CSS v4 syntax: `bg-(--color-primary)` instead of `bg-[var(--color-primary)]`
- Leverage CSS custom properties defined in globals.css
- Use `font-(--font-papyrus)` for headings and `font-(--font-poppins)` for body text
- **All colors must be in OKLCH format** when defining new colors in globals.css
- Maintain consistent spacing scale using Tailwind's spacing utilities
- Test responsive breakpoints (sm, md, lg, xl, 2xl)
- Use semantic color variables (e.g., `bg-primary`, `text-foreground`) from @theme
- Use `next/image` for all images with optimized loading (width, height, priority)

### Metadata & SEO
Metadata configured in [../app/layout.tsx](../app/layout.tsx) includes keywords relevant to climate resilience, agriculture, Ghana, and indigenous knowledge. Update when adding new pages.
