
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card = ({ 
  children, 
  className, 
  title, 
  description, 
  hover = false,
  onClick
}: CardProps) => {
  return (
    <div 
      className={cn(
        "glass-panel p-6 w-full", 
        hover && "glass-panel-hover cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {title && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
