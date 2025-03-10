
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

  // Cuando cambia activeTab, verifica si debemos mostrar sugerencias
  useEffect(() => {
    if (activeTab === "destination" && destination.length > 1) {
      searchLocations(destination);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [activeTab, destination, searchLocations, setShowSuggestions]);

  const handleFocus = () => {
    console.log("Input focused! Current destination:", destination);
    setActiveTab("destination");
    if (destination.length > 1) {
      console.log("Searching for locations on focus:", destination);
      searchLocations(destination);
      setShowSuggestions(true);
    }
  };

  if (isMobile) {
    return (
      <div className="relative w-full">
        <div className="bg-white rounded-t-md z-20 relative">
          <SearchInput
            destination={destination}
            inputRef={inputRef}
            isLoading={isLoading}
            handleDestinationChange={handleDestinationChange}
            handleClear={handleClear}
            onFocus={handleFocus}
            isMobile={true}
          />
        </div>
        
        {showSuggestions && (
          <div className="absolute left-0 right-0 top-[100%] z-[100]">
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
          <div className="absolute left-0 right-0 top-full mt-2 z-[100]">
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
