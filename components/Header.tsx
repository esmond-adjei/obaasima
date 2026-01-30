import Link from 'next/link';
import { Logo } from './CustomIcon';

export default function Header() {


  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="hcc">
        
        {/* Centered Logo */}
          <Link
            href="/"
            className="block"
          >
            <Logo size="medium" />
          </Link>

      </div>
    </nav>
  );
}
