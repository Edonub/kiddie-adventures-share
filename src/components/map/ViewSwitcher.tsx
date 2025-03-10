
import React from 'react';
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewSwitcherProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center">
      <div className="bg-gray-100 rounded-full flex shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-l-full px-3 py-1 h-8 transition-all",
            view === 'list' 
              ? "bg-white text-familyxp-primary shadow-sm" 
              : "text-gray-600 hover:text-familyxp-primary"
          )}
          onClick={() => onViewChange('list')}
        >
          <List className="w-4 h-4" />
          <span className="text-xs font-medium ml-1.5">Lista</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-r-full px-3 py-1 h-8 transition-all",
            view === 'map' 
              ? "bg-white text-familyxp-primary shadow-sm" 
              : "text-gray-600 hover:text-familyxp-primary"
          )}
          onClick={() => onViewChange('map')}
        >
          <Map className="w-4 h-4" />
          <span className="text-xs font-medium ml-1.5">Mapa</span>
        </Button>
      </div>
    </div>
  );
};

export default ViewSwitcher;
