import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Coffee } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100 hover:opacity-80 transition-opacity"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <div className="flex-1 flex justify-center items-center gap-2">
          <Coffee className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Internship Authentication Career Cafe
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;