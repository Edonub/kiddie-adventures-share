
import React from 'react';
import { MapPin } from 'lucide-react';
import { NominatimResult, formatDisplayName } from '@/utils/locationSearch';

interface LocationSuggestionsProps {
  suggestions: NominatimResult[];
  searchError: string | null;
  isLoading: boolean;
  onSelectSuggestion: (suggestion: NominatimResult) => void;
  suggestionsRef: React.RefObject<HTMLDivElement>;
}

const LocationSuggestions: React.FC<LocationSuggestionsProps> = ({
  suggestions,
  searchError,
  isLoading,
  onSelectSuggestion,
  suggestionsRef
}) => {
  if (searchError) {
    return (
      <div ref={suggestionsRef} className="px-4 py-3 text-gray-500 text-sm bg-white shadow-lg rounded-b-md">
        {searchError}
      </div>
    );
  }
  
  if (suggestions.length > 0) {
    return (
      <div ref={suggestionsRef} className="bg-white shadow-lg rounded-b-md max-h-[300px] overflow-y-auto">
        {suggestions.map((suggestion, index) => {
          const { main, secondary } = formatDisplayName(suggestion.display_name);
          return (
            <div 
              key={suggestion.place_id || index}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => onSelectSuggestion(suggestion)}
            >
              <MapPin size={18} className="text-gray-500 mr-3 flex-shrink-0" />
              <div className="w-full overflow-hidden">
                <div className="font-medium text-black">{main}</div>
                <div className="text-gray-500 text-sm">{secondary}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div ref={suggestionsRef} className="px-4 py-3 text-gray-500 text-sm bg-white shadow-lg rounded-b-md">
        Buscando localidades en España...
      </div>
    );
  }
  
  return (
    <div ref={suggestionsRef} className="px-4 py-3 text-gray-500 text-sm bg-white shadow-lg rounded-b-md">
      Empieza a escribir para buscar localidades en España
    </div>
  );
};

export default LocationSuggestions;
