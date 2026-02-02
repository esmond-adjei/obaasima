'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from './CustomIcon';

export default function Header() {
  const navLinkClass =
    'text-foreground hover:text-(--color-accent-warm) rounded py-2 transition';

  const underlineVariants = {
    initial: { scaleX: 0 },
    hover: { scaleX: 1 },
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/partners', label: 'Partners' },
    { href: '/get-involved', label: 'Get Involved' },
  ];

  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center">
        
        {/* Navigation Links */}
        <ul className="flex space-x-4 md:space-x-8">
          {leftItems.map((item) => (
            <motion.li key={item.href} whileHover="hover" initial="initial">
              <Link href={item.href} className={`${navLinkClass} relative`}>
                {item.label}
                <motion.span
                  variants={underlineVariants}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute left-0 -bottom-1 h-0.5 w-full origin-left bg-(--color-accent-warm)"
                />
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Centered Logo */}
        <Link
          href="/"
          className="block mx-4 md:mx-8"
        >
          <Logo size="medium" />
        </Link>

        {/* Remaining Navigation Links */}
        <ul className="flex space-x-4 md:space-x-8">
          {rightItems.map((item) => (
            <motion.li key={item.href} whileHover="hover" initial="initial">
              <Link href={item.href} className={`${navLinkClass} relative`}>
                {item.label}
                <motion.span
                  variants={underlineVariants}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute left-0 -bottom-1 h-0.5 w-full origin-left bg-(--color-accent-warm)"
                />
              </Link>
            </motion.li>
          ))}
        </ul>

      </div>
    </nav>
  );
}
