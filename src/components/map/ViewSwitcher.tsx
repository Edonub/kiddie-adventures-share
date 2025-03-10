
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
      <div className="bg-familyxp-light rounded-lg flex shadow-sm overflow-hidden">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "transition-all px-3 h-8 rounded-md",
            view === 'list' 
              ? "bg-white text-familyxp-primary shadow-sm" 
              : "text-gray-600 hover:text-familyxp-primary hover:bg-white/50"
          )}
          onClick={() => onViewChange('list')}
        >
          <List className={cn("", isMobile ? "w-4 h-4" : "w-4 h-4")} />
          {!isMobile && <span className="text-xs font-medium ml-1.5">Lista</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "transition-all px-3 h-8 rounded-md",
            view === 'map' 
              ? "bg-white text-familyxp-primary shadow-sm" 
              : "text-gray-600 hover:text-familyxp-primary hover:bg-white/50"
          )}
          onClick={() => onViewChange('map')}
        >
          <Map className={cn("", isMobile ? "w-4 h-4" : "w-4 h-4")} />
          {!isMobile && <span className="text-xs font-medium ml-1.5">Mapa</span>}
        </Button>
      </div>
    </div>
  );
};

export default ViewSwitcher;
