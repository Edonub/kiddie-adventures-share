
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
  return (
    <>
      {isMobile ? (
        <div className="flex items-center px-4 py-3 relative bg-white rounded-lg shadow-sm">
          <MapPin size={20} className="text-gray-500 mr-3 flex-shrink-0" />
          <Input
            ref={inputRef}
            type="text" 
            placeholder="¿A qué localidad de España viajas?" 
            className="flex-1 bg-transparent border-0 shadow-none text-base text-black placeholder:text-gray-500 focus-visible:ring-0 p-0 h-auto"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onFocus={onFocus}
            autoComplete="off"
          />
          {destination && !isLoading && (
            <button 
              onClick={handleClear} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          )}
          {isLoading && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500" />
          )}
        </div>
      ) : (
        <div className="relative bg-white rounded-lg p-2">
          <div className="text-xs font-semibold text-gray-800 mb-1">Localidad</div>
          <div className="flex items-center">
            <MapPin size={18} className="text-gray-500 mr-2 flex-shrink-0" />
            <Input
              ref={inputRef}
              type="text" 
              placeholder="¿A qué localidad de España viajas?" 
              className="flex-1 bg-transparent border-0 shadow-none text-base font-medium text-black placeholder:text-gray-500 focus-visible:ring-0 p-0 h-auto"
              value={destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              onFocus={onFocus}
              autoComplete="off"
            />
            {destination && !isLoading && (
              <button 
                onClick={handleClear} 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchInput;
