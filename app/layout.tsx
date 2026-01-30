import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';

// Papyrus font for headings/display
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'SIWA - Smart Indigenous Weather App',
    template: '%s | SIWA',
  },
  description: 'SIWA combines traditional ecological knowledge with AI to provide climate-smart weather forecasting for Ghanaian farmers.',
  keywords: [ 'SIWA', 'Smart Indigenous Weather App', 'Climate Resilience', 'Agriculture', 'Ghana', 'Weather Forecasting', 'AI', 'Indigenous Knowledge', 'Smallholder Farmers' ],
  authors: [{ name: 'DIPPER Lab Team' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${papyrus.variable} ${poppins.variable}`} suppressHydrationWarning>
      <Analytics />
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
