
import { useState, useRef, useEffect } from "react";
import { 
  fetchLocations, 
  removeDuplicateLocations, 
  getMockDestinations, 
  storeSelectedLocation,
  NominatimResult 
} from "@/utils/locationSearch";

export const useLocationSearch = (
  destination: string, 
  setDestination: (value: string) => void
) => {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) && 
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear destination input handler
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDestination("");
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Debounced search function
  const handleDestinationChange = (value: string) => {
    setDestination(value);
    
    // Clear previous timer
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }
    
    // Set new timer
    debounceTimerRef.current = window.setTimeout(() => {
      searchLocations(value);
    }, 300); // 300ms debounce
  };

  // Search for locations
  const searchLocations = async (query: string) => {
    if (query.length < 2) {
      setShowSuggestions(false);
      return;
    }
    
    setIsLoading(true);
    setSearchError(null);
    setShowSuggestions(true);
    
    try {
      const data = await fetchLocations(query);
      
      if (data && data.length > 0) {
        // Eliminar duplicados basados en nombres de localidades
        const uniqueResults = removeDuplicateLocations(data);
        setSuggestions(uniqueResults);
      } else {
        setSuggestions([]);
        // Only show no results message if user typed enough characters
        if (query.length > 2) {
          setSearchError("No se encontraron localidades en España");
        }
      }
    } catch (error) {
      console.error("Error fetching from Nominatim:", error);
      setSearchError("Error al buscar localidades españolas. Intente nuevamente.");
      // Fallback to mock data in case of API error
      const mockData = getMockDestinations(query);
      if (mockData.length > 0) {
        setSuggestions(mockData as unknown as NominatimResult[]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Select a suggestion
  const selectSuggestion = (suggestion: NominatimResult) => {
    console.log("Selected suggestion:", suggestion);
    // Extract the first part of the display name (usually city, country)
    const displayParts = suggestion.display_name.split(',');
    const simplified = displayParts.length > 1 
      ? `${displayParts[0].trim()}, España`
      : `${suggestion.display_name}, España`;
      
    setDestination(simplified);
    setShowSuggestions(false);
    
    // Store the selected location
    storeSelectedLocation(suggestion, simplified);
  };

  return {
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
  };
};
