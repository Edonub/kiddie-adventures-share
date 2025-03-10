
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
    handleFocus
  } = useLocationSearch(destination, setDestination);

  // Función para manejar el click en el fondo
  const handleContainerClick = (e: React.MouseEvent) => {
    // Si hacemos clic en el contenedor principal
    if (
      inputRef.current && 
      !inputRef.current.contains(e.target as Node) &&
      suggestionsRef.current && 
      !suggestionsRef.current.contains(e.target as Node)
    ) {
      setActiveTab("destination");
      setShowSuggestions(false);
    }
  };

  // Versión móvil
  if (isMobile) {
    return (
      <div className="relative w-full" onClick={handleContainerClick}>
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
      onClick={(e) => {
        setActiveTab("destination");
        // No cerramos las sugerencias al hacer clic en el contenedor principal en desktop
        e.stopPropagation();
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
