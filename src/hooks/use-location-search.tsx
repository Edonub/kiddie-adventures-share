
import { useState, useRef, useCallback } from "react";
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
  
  // Función optimizada para buscar localidades
  const searchLocations = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    setIsLoading(true);
    setSearchError(null);
    
    try {
      const data = await fetchLocations(query);
      
      if (data.length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
      } else {
        const uniqueResults = removeDuplicateLocations(data);
        setSuggestions(uniqueResults);
        setShowSuggestions(true);
      }
    } catch (error) {
      setSearchError("Error al buscar localidades");
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función simplificada para manejar el cambio en el input
  const handleDestinationChange = (value: string) => {
    setDestination(value);
    
    // Sin debounce para respuesta inmediata
    if (value.length >= 2) {
      searchLocations(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDestination("");
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const selectSuggestion = (suggestion: NominatimResult) => {
    const displayParts = suggestion.display_name.split(',');
    const simplified = `${displayParts[0].trim()}, España`;
    
    setDestination(simplified);
    setSuggestions([]);
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
