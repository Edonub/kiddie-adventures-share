
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

const DestinationSearch: React.FC<DestinationSearchProps> = ({ 
  destination, 
  setDestination, 
  activeTab, 
  setActiveTab 
}) => {
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
    handleFocus
  } = useLocationSearch(destination, setDestination);

  // Versión móvil
  if (isMobile) {
    return (
      <div className="relative w-full">
        <SearchInput
          destination={destination}
          inputRef={inputRef}
          isLoading={isLoading}
          handleDestinationChange={handleDestinationChange}
          handleClear={handleClear}
          onFocus={() => {
            setActiveTab("destination");
            handleFocus();
          }}
          isMobile={true}
        />
        
        {(showSuggestions || isLoading) && (
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

  // Versión desktop
  return (
    <div 
      className={`relative flex-1 p-2 cursor-pointer ${activeTab === "destination" ? "bg-gray-50 rounded-lg" : ""}`}
      onClick={() => {
        setActiveTab("destination");
      }}
    >
      <SearchInput
        destination={destination}
        inputRef={inputRef}
        isLoading={isLoading}
        handleDestinationChange={handleDestinationChange}
        handleClear={handleClear}
        onFocus={() => {
          setActiveTab("destination");
          handleFocus();
        }}
        isMobile={false}
      />
      
      {(showSuggestions || isLoading) && (
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
