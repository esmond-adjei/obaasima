import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { Poppins, Urbanist } from 'next/font/google';
import localFont from 'next/font/local';
import { Metadata, Viewport } from 'next';

const papyrus = localFont({ 
  src: '../public/font/papyrus.ttf',
  display: 'swap',
  variable: '--font-papyrus',
  fallback: ['Georgia', 'serif'],
  preload: true,
});

// Poppins font for body text
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: true,
  weight: ['300', '400', '500', '600', '700'],
});

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-urbanist',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  preload: true,
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'ObaaSIWA - Women-Centered Climate Intelligence',
    template: '%s | ObaaSIWA',
  },
  description: 'ObaaSIWA is a women-centered climate intelligence initiative that integrates indigenous ecological knowledge with responsible AI to support better agricultural decision-making in Ghana.',
  keywords: [ 'ObaaSIWA', 'SIWA', 'Climate Resilience', 'Women Farmers', 'Ghana', 'Indigenous Knowledge', 'AI', 'Weather Forecasting', 'Agriculture', 'Climate Intelligence' ],
  authors: [{ name: 'DIPPER Lab' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${papyrus.variable} ${poppins.variable} ${urbanist.variable}`} suppressHydrationWarning>
      <Analytics />
      <body>
          {children}
      </body>
    </html>
  );
}
