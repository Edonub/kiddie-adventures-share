
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
    selectSuggestion
  } = useLocationSearch(destination, setDestination);

  const handleFocus = () => {
    setActiveTab("destination");
    if (destination.length > 1) {
      setShowSuggestions(true);
    }
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    // Solo se ejecuta cuando hacemos clic en el contenedor pero no en el input ni en las sugerencias
    if (
      inputRef.current && 
      !inputRef.current.contains(event.target as Node) &&
      suggestionsRef.current && 
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  if (isMobile) {
    return (
      <div className="relative w-full" onClick={handleClickOutside}>
        <SearchInput
          destination={destination}
          inputRef={inputRef}
          isLoading={isLoading}
          handleDestinationChange={handleDestinationChange}
          handleClear={handleClear}
          onFocus={handleFocus}
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

  return (
    <div 
      className={`relative flex-1 p-2 cursor-pointer ${activeTab === "destination" ? "bg-gray-50 rounded-lg" : ""}`}
      onClick={(e) => {
        setActiveTab("destination");
        handleClickOutside(e);
      }}
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
