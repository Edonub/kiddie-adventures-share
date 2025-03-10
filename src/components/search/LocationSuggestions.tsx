
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
      <div 
        ref={suggestionsRef} 
        className="absolute left-0 right-0 px-4 py-3 text-gray-500 text-sm bg-white shadow-lg rounded-b-md border border-gray-200 z-[100]"
      >
        {searchError}
      </div>
    );
  }
  
  if (suggestions.length > 0) {
    return (
      <div 
        ref={suggestionsRef} 
        className="absolute left-0 right-0 bg-white shadow-lg rounded-b-md max-h-[300px] overflow-y-auto border border-gray-200 z-[100]"
      >
        {suggestions.map((suggestion) => {
          const { main, secondary } = formatDisplayName(suggestion.display_name);
          return (
            <div 
              key={suggestion.place_id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center border-b border-gray-100 last:border-0"
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
      <div 
        ref={suggestionsRef} 
        className="absolute left-0 right-0 px-4 py-3 text-gray-500 text-sm bg-white shadow-lg rounded-b-md border border-gray-200 z-[100]"
      >
        Buscando localidades en España...
      </div>
    );
  }
  
  return (
    <div 
      ref={suggestionsRef} 
      className="absolute left-0 right-0 px-4 py-3 text-gray-500 text-sm bg-white shadow-lg rounded-b-md border border-gray-200 z-[100]"
    >
      Empieza a escribir para buscar localidades en España
    </div>
  );
};

export default LocationSuggestions;
