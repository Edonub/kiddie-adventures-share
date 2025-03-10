
import React, { useEffect } from "react";
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

  useEffect(() => {
    if (activeTab === "destination" && destination.length > 1) {
      searchLocations(destination);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [activeTab, destination, searchLocations, setShowSuggestions]);

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
          <LocationSuggestions
            suggestions={suggestions}
            searchError={searchError}
            isLoading={isLoading}
            onSelectSuggestion={selectSuggestion}
            suggestionsRef={suggestionsRef}
          />
        )}
      </div>
    );
  }

  return (
    <div 
      className={`relative flex-1 p-2 cursor-pointer ${activeTab === "destination" ? "bg-gray-50 rounded-lg" : ""}`}
      onClick={() => setActiveTab("destination")}
    >
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
        <LocationSuggestions
          suggestions={suggestions}
          searchError={searchError}
          isLoading={isLoading}
          onSelectSuggestion={selectSuggestion}
          suggestionsRef={suggestionsRef}
        />
      )}
    </div>
  );
};

export default DestinationSearch;
