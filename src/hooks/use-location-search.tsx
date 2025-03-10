
import { useState, useRef, useCallback, useEffect } from "react";
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

  // Debugging useEffect para verificar cambios en suggestions
  useEffect(() => {
    console.log("Sugerencias actualizadas:", suggestions);
  }, [suggestions]);

  const searchLocations = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    setSearchError(null);
    setIsLoading(true);
    console.log("Buscando localidades para:", query);
    
    try {
      const data = await fetchLocations(query);
      console.log("Datos recibidos de la API:", data); // Verificar datos de API
      
      if (!data || data.length === 0) {
        console.log("No se encontraron resultados para:", query);
        setSuggestions([]);
        setShowSuggestions(false);
      } else {
        const uniqueResults = removeDuplicateLocations(data);
        console.log("Resultados filtrados:", uniqueResults);
        
        // Primero actualizamos las sugerencias
        setSuggestions(uniqueResults);
        // Luego aseguramos que se muestren
        setShowSuggestions(true);
        console.log("ShowSuggestions establecido a true");
      }
    } catch (error) {
      console.error("Error searching locations:", error);
      setSearchError("Error al buscar localidades. Por favor, inténtelo de nuevo.");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
      console.log("isLoading establecido a false");
    }
  }, []);

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    console.log("Texto de búsqueda cambiado a:", value);
    
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }
    
    if (value.length >= 2) {
      setIsLoading(true);
      debounceTimerRef.current = window.setTimeout(() => {
        searchLocations(value);
      }, 150); // Reducido a 150ms para mayor rapidez
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
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

  // Close suggestions when clicking outside - mejorado
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSuggestions && // Solo cierra si realmente están visibles
        suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) && 
        inputRef.current && !inputRef.current.contains(event.target as Node)
      ) {
        console.log("Cerrando sugerencias por clic fuera");
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

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
