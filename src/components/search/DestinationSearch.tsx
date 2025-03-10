
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocationSearch } from "@/hooks/use-location-search";
import SearchInput from "./SearchInput";
import LocationSuggestions from "./LocationSuggestions";

interface DestinationSearchProps {
  destination: string;
  setDestination: (value: string) => void;
  activeTab: string;
  setActiveTab: (tab: "destination" | "dates" | "guests") => void;
}

const DestinationSearch = ({ 
  destination, 
  setDestination, 
  activeTab, 
  setActiveTab 
}: DestinationSearchProps) => {
  const isMobile = useIsMobile();
  const {
    suggestions,
    showSuggestions,
    setShowSuggestions,
    isLoading,
    searchError,
    inputRef,
    suggestionsRef,
    handleClear,
    handleDestinationChange,
    selectSuggestion,
    searchLocations
  } = useLocationSearch(destination, setDestination);

  const handleFocus = () => {
    setActiveTab("destination");
    if (destination.length > 1) {
      searchLocations(destination);
      setShowSuggestions(true);
    }
  };

  if (isMobile) {
    return (
      <div className="relative w-full">
        <SearchInput
          destination={destination}
          inputRef={inputRef}
          isLoading={isLoading}
          handleDestinationChange={handleDestinationChange}
          handleClear={handleClear}
          onFocus={handleFocus}
          isMobile={true}
        />
        
        {showSuggestions && (
          <div 
            ref={suggestionsRef}
            className="fixed inset-0 top-[60px] bg-white z-[200] border-t border-gray-200 h-[calc(100vh-60px)] overflow-y-auto"
          >
            <div className="p-2">
              <LocationSuggestions
                suggestions={suggestions}
                searchError={searchError}
                isLoading={isLoading}
                onSelectSuggestion={(suggestion) => {
                  selectSuggestion(suggestion);
                  setShowSuggestions(false);
                }}
                suggestionsRef={suggestionsRef}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`p-3 md:p-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer rounded-t-full md:rounded-l-full md:rounded-tr-none ${activeTab === "destination" ? "bg-gray-50" : ""}`}
      onClick={() => setActiveTab("destination")}
    >
      <div className="relative">
        <SearchInput
          destination={destination}
          inputRef={inputRef}
          isLoading={isLoading}
          handleDestinationChange={handleDestinationChange}
          handleClear={handleClear}
          onFocus={handleFocus}
          isMobile={false}
        />
        
        {showSuggestions && (
          <div 
            ref={suggestionsRef}
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-md shadow-lg z-50 border max-h-60 overflow-y-auto"
          >
            <LocationSuggestions
              suggestions={suggestions}
              searchError={searchError}
              isLoading={isLoading}
              onSelectSuggestion={selectSuggestion}
              suggestionsRef={suggestionsRef}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationSearch;
