
import React from 'react';
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ViewSwitcherProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ view, onViewChange }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center">
      <div className="bg-gray-100 p-0.5 rounded-full flex shadow-sm overflow-hidden">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full flex items-center transition-all",
            isMobile ? "px-3 py-1.5 h-8" : "px-3.5 py-1.5 h-8",
            view === 'list' 
              ? "bg-white text-familyxp-primary shadow-sm" 
              : "text-gray-600 hover:text-familyxp-primary hover:bg-gray-200"
          )}
          onClick={() => onViewChange('list')}
        >
          <List className={cn("", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
          {!isMobile && <span className="text-xs font-medium ml-1.5">Lista</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full flex items-center transition-all",
            isMobile ? "px-3 py-1.5 h-8" : "px-3.5 py-1.5 h-8",
            view === 'map' 
              ? "bg-white text-familyxp-primary shadow-sm" 
              : "text-gray-600 hover:text-familyxp-primary hover:bg-gray-200"
          )}
          onClick={() => onViewChange('map')}
        >
          <Map className={cn("", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
          {!isMobile && <span className="text-xs font-medium ml-1.5">Mapa</span>}
        </Button>
      </div>
    </div>
  );
};

export default ViewSwitcher;
