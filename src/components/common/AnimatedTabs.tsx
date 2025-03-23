
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
  onChange?: (tabId: string) => void;
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  defaultTab,
  className,
  onChange
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) onChange(tabId);
  };

  useEffect(() => {
    // Update the indicator position whenever active tab changes
    const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (activeTabIndex >= 0 && tabsRef.current[activeTabIndex]) {
      const tabElement = tabsRef.current[activeTabIndex];
      if (tabElement) {
        setIndicatorStyle({
          width: `${tabElement.offsetWidth}px`,
          transform: `translateX(${tabElement.offsetLeft}px)`
        });
      }
    }
  }, [activeTab, tabs]);

  useEffect(() => {
    // Handle responsive indicator positioning on window resize
    const handleResize = () => {
      const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
      if (activeTabIndex >= 0 && tabsRef.current[activeTabIndex]) {
        const tabElement = tabsRef.current[activeTabIndex];
        if (tabElement) {
          setIndicatorStyle({
            width: `${tabElement.offsetWidth}px`,
            transform: `translateX(${tabElement.offsetLeft}px)`
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab, tabs]);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex border-b border-border overflow-x-auto no-scrollbar">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={el => (tabsRef.current[index] = el)}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "px-4 py-2 flex items-center whitespace-nowrap transition-all duration-200",
                activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
        <div 
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300" 
          style={indicatorStyle}
        />
      </div>
      <div className="mt-4">
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={cn(
              "transition-opacity duration-300",
              activeTab === tab.id ? "block animate-fade-in" : "hidden"
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTabs;
