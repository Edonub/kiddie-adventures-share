
import React from 'react';
import { MapPin, X } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  destination: string;
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  handleDestinationChange: (value: string) => void;
  handleClear: (e: React.MouseEvent) => void;
  onFocus: () => void;
  isMobile: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  destination,
  inputRef,
  isLoading,
  handleDestinationChange,
  handleClear,
  onFocus,
  isMobile
}) => {
  if (isMobile) {
    return (
      <div className="flex items-center px-3 py-2 relative rounded-lg shadow-sm">
        <MapPin size={18} className="text-familyxp-primary mr-2 flex-shrink-0" />
        <Input
          ref={inputRef}
          type="text" 
          placeholder="¿A qué localidad de España viajas?" 
          className="flex-1 bg-transparent border-0 shadow-none text-sm text-black placeholder:text-gray-500 focus-visible:ring-0 p-0 h-auto"
          value={destination}
          onChange={(e) => handleDestinationChange(e.target.value)}
          onFocus={onFocus}
          autoComplete="off"
        />
        {destination && !isLoading && (
          <button 
            onClick={handleClear} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            type="button"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-familyxp-primary" />
        )}
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="text-xs text-black font-bold">Localidad</div>
      <div className="flex items-center">
        <MapPin size={14} className="text-familyxp-primary mr-1 flex-shrink-0" />
        <Input
          ref={inputRef}
          type="text" 
          placeholder="¿A qué localidad de España viajas?" 
          className="flex-1 bg-transparent border-0 shadow-none text-xs font-normal text-black placeholder:text-gray-500 focus-visible:ring-0 p-0 h-auto"
          value={destination}
          onChange={(e) => handleDestinationChange(e.target.value)}
          onFocus={onFocus}
          autoComplete="off"
        />
        {destination && !isLoading && (
          <button 
            onClick={handleClear} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            type="button"
          >
            <X size={14} className="text-gray-500" />
          </button>
        )}
        {isLoading && (
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-familyxp-primary" />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
