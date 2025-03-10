
import React from 'react';
import { MapPin, X } from 'lucide-react';

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
        <div className="flex items-center px-3 py-2 relative bg-white rounded-md">
          <MapPin size={18} className="text-gray-500 mr-2 flex-shrink-0" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="¿A qué localidad de España viajas?" 
            className="w-full bg-white border-none outline-none text-base text-black placeholder:text-gray-400"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onFocus={onFocus}
            autoComplete="off"
          />
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 flex-shrink-0 ml-1"></div>
          )}
          {destination && !isLoading && (
            <button 
              onClick={handleClear} 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 ml-1"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
        </div>
      ) : (
        <div className="px-2 relative bg-white">
          <div className="text-xs font-bold">Localidad</div>
          <div className="flex items-center">
            <MapPin size={16} className="text-gray-500 mr-2 flex-shrink-0" />
            <input 
              ref={inputRef}
              type="text" 
              placeholder="¿A qué localidad de España viajas?" 
              className="w-full bg-white border-none outline-none text-sm text-black font-medium placeholder:text-gray-400"
              value={destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              onFocus={onFocus}
              autoComplete="off"
            />
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 flex-shrink-0 ml-1"></div>
            )}
            {destination && !isLoading && (
              <button 
                onClick={handleClear} 
                className="p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0 ml-1"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchInput;
