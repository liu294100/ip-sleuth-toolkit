
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Home, InfoIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: '首页', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: '关于', path: '/about', icon: <InfoIcon className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Globe className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            IP Sleuth
          </span>
        </Link>
        <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex-1 md:flex-initial flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground shadow hover:brightness-105"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.icon}
                <span className={cn("ml-2", isMobile && "hidden")}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
