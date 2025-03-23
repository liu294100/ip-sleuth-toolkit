
import React from 'react';
import NavBar from './NavBar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className={cn("flex-1 container mx-auto px-4 py-8", className)}>
        {children}
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IP Sleuth Toolkit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
