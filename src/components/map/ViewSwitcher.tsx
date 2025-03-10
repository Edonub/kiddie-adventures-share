
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
      <div className="border rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <Button
          variant={view === 'list' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-l-full px-4 ${view === 'list' ? 'bg-familyxp-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => onViewChange('list')}
        >
          <List className="w-4 h-4 mr-2" />
          Lista
        </Button>
        <Button
          variant={view === 'map' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-r-full px-4 ${view === 'map' ? 'bg-familyxp-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => onViewChange('map')}
        >
          <Map className="w-4 h-4 mr-2" />
          Mapa
        </Button>
      </div>
    </div>
  );
};

export default ViewSwitcher;
