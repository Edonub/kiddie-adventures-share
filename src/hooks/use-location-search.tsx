
import { useState, useRef, useEffect } from "react";
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
  
  // Ejecutar búsqueda inmediatamente cuando el usuario escribe
  useEffect(() => {
    const searchLocations = async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      
      setIsLoading(true);
      setSearchError(null);
      
      try {
        const data = await fetchLocations(query);
        console.log("Datos de la API recibidos:", data);
        
        if (data.length === 0) {
          setSuggestions([]);
          setShowSuggestions(false);
        } else {
          const uniqueResults = removeDuplicateLocations(data);
          setSuggestions(uniqueResults);
          setShowSuggestions(true);
          console.log("Sugerencias mostradas:", uniqueResults);
        }
      } catch (error) {
        console.error("Error en searchLocations:", error);
        setSearchError("Error al buscar localidades");
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Buscar sin debounce para respuesta inmediata
    if (destination.length >= 2) {
      searchLocations(destination);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [destination]);

  // Monitor del estado de sugerencias para debugging
  useEffect(() => {
    console.log("Estado de sugerencias:", { 
      count: suggestions.length, 
      showSuggestions, 
      isLoading 
    });
  }, [suggestions, showSuggestions, isLoading]);

  // Manejar clicks fuera de las sugerencias
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSuggestions && // Solo cierra si las sugerencias están visibles
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        console.log("Click fuera de las sugerencias, cerrando");
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions]);

  // Función simplificada para manejar el cambio en el input
  const handleDestinationChange = (value: string) => {
    setDestination(value);
    
    // Si el valor está vacío, limpiar sugerencias
    if (value.length < 2) {
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

  const handleFocus = () => {
    if (destination.length >= 2) {
      setShowSuggestions(true);
    }
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
    handleFocus
  };
};
