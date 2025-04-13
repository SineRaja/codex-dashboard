import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation: React.FC = () => {
  const router = useRouter();
  
  const navigationItems = [
    { label: 'Admin', href: '/admin' },
    { label: 'Overview', href: '/overview' },
    { label: 'Website Health', href: '/website-health' },
    { label: 'Search Visibility', href: '/search-visibility' },
    { label: 'Performance & Forecasting', href: '/performance' },
    { label: 'Budget Tracker', href: '/budget' },
  ];

  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-6">
        {navigationItems.map((item) => {
          const isActive = router.pathname === item.href;
          
          return (
            <li key={item.href}>
              <Link href={item.href}>
                <span className={`relative px-1 py-2 transition-colors duration-200 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}>
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;