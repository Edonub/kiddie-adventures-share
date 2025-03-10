
import { useState, useRef, useEffect, useCallback } from "react";
import { 
  fetchLocations, 
  removeDuplicateLocations,
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

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDestination("");
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const searchLocations = useCallback(async (query: string) => {
    if (query.length < 2) {
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }
    
    setSearchError(null);
    setIsLoading(true);
    
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
          setShowSuggestions(true);
        }
      }
    } catch (error) {
      console.error("Error searching locations:", error);
      setSearchError("Error al buscar localidades. Por favor, inténtelo de nuevo.");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }
    
    if (value.length >= 2) {
      setIsLoading(true);
      setShowSuggestions(true);
      
      debounceTimerRef.current = window.setTimeout(() => {
        searchLocations(value);
      }, 300);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
      setIsLoading(false);
    }
  };

  const selectSuggestion = (suggestion: NominatimResult) => {
    const displayParts = suggestion.display_name.split(',');
    const simplified = `${displayParts[0].trim()}, España`;
    
    setDestination(simplified);
    setShowSuggestions(false);
    storeSelectedLocation(suggestion, simplified);
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
