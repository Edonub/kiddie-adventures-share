
import React from 'react';
import { Button } from "@/components/ui/button";
import { Map, List } from "lucide-react";

interface ViewSwitcherProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center">
      <div className="bg-gray-100 rounded-full py-0.5 px-0.5 shadow-sm hover:shadow transition-shadow">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-full h-7 px-2 transition-all ${view === 'list' ? 'bg-white text-familyxp-primary shadow-sm' : 'text-gray-600 hover:text-familyxp-primary'}`}
            onClick={() => onViewChange('list')}
          >
            <List className="w-3.5 h-3.5 mr-1" />
            <span className="text-xs font-medium">Lista</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-full h-7 px-2 transition-all ${view === 'map' ? 'bg-white text-familyxp-primary shadow-sm' : 'text-gray-600 hover:text-familyxp-primary'}`}
            onClick={() => onViewChange('map')}
          >
            <Map className="w-3.5 h-3.5 mr-1" />
            <span className="text-xs font-medium">Mapa</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewSwitcher;
