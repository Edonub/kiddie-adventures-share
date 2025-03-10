
import { useState, useRef, useEffect } from "react";
import { 
  fetchLocations, 
  removeDuplicateLocations, 
  getMockDestinations, 
  storeSelectedLocation,
  NominatimResult 
} from "@/utils/locationSearch";
import { toast } from "sonner";

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

  // Debounced search function with immediate feedback
  const handleDestinationChange = (value: string) => {
    setDestination(value);
    
    // Clear previous timer
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }
    
    if (value.length >= 2) {
      setIsLoading(true);
      setShowSuggestions(true);
      
      // Set new timer
      debounceTimerRef.current = window.setTimeout(() => {
        searchLocations(value);
      }, 300); // 300ms debounce
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
      setIsLoading(false);
    }
  };

  // Search for locations
  const searchLocations = async (query: string) => {
    if (query.length < 2) {
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }
    
    setSearchError(null);
    
    try {
      console.log("Searching for:", query);
      const data = await fetchLocations(query);
      console.log("Search results:", data);
      
      if (data && data.length > 0) {
        const uniqueResults = removeDuplicateLocations(data);
        setSuggestions(uniqueResults);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        if (query.length > 2) {
          setSearchError("No se encontraron localidades en España");
        }
      }
    } catch (error) {
      console.error("Error fetching from Nominatim:", error);
      setSearchError("Error al buscar localidades españolas. Intente nuevamente.");
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
    const displayParts = suggestion.display_name.split(',');
    const simplified = displayParts.length > 1 
      ? `${displayParts[0].trim()}, España`
      : `${suggestion.display_name}, España`;
      
    setDestination(simplified);
    setShowSuggestions(false);
    storeSelectedLocation(suggestion, simplified);
    
    // Notificar al usuario que la selección fue exitosa
    toast.success(`Localidad seleccionada: ${displayParts[0].trim()}`);
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
