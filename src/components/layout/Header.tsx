import React from 'react';
import Link from 'next/link';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-gray-800">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl font-bold text-white">codex</span>
          </Link>
        </div>
      
        <Navigation />
        
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;