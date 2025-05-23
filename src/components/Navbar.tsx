'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LogoutButton from './LogoutButton';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Listings', href: '/listings' },
  { label: 'My Listings', href: '/my-listings' },
  { label: 'Add Listing', href: '/add-listing' },
  { label: 'Profile', href: '/profile' },
  { label: 'Inbox', href: '/inbox' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user || pathname === '/login' || pathname === '/signup') return null;

  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="text-3xl font-bold text-blue-900">Sublet Finder</div>
      <div className="hidden md:flex space-x-4 items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded hover:bg-blue-100 ${
              pathname === item.href ? 'bg-blue-200 font-semibold' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
        <LogoutButton />
      </div>
    </nav>
  );
}

