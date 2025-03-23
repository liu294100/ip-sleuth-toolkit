
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: '首页', path: '/' },
    { label: '关于', path: '/about' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-border transition-all">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <Globe className="h-6 w-6 text-primary" />
            <span className="font-medium text-lg">IP Sleuth</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                location.pathname === item.path 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {/* Mobile menu button (can be expanded later) */}
          <button className="md:hidden p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
