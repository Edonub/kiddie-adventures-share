import { Search, MapPin, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NominatimResult {
  display_name: string;
  place_id: number;
  lat: string;
  lon: string;
}

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
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

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

  // Fetch locations from Nominatim API with debounce
  const fetchLocations = async (query: string) => {
    if (query.length < 2) return;
    
    setIsLoading(true);
    setSearchError(null);
    
    try {
      // Use OpenStreetMap Nominatim API with filtro para España (countrycodes=es)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=es&format=json&limit=5&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error(`Error en la búsqueda: ${response.statusText}`);
      }
      
      const data: NominatimResult[] = await response.json();
      console.log("Nominatim results for Spain:", data);
      
      if (data && data.length > 0) {
        // Eliminar duplicados basados en nombres de localidades
        const uniqueResults = removeDuplicateLocations(data);
        setSuggestions(uniqueResults);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        // Only show no results message if user typed enough characters
        if (query.length > 2) {
          setSearchError("No se encontraron localidades en España");
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
      }
    } catch (error) {
      console.error("Error fetching from Nominatim:", error);
      setSearchError("Error al buscar localidades españolas. Intente nuevamente.");
      // Fallback to mock data in case of API error
      const mockData = getMockDestinations(query);
      if (mockData.length > 0) {
        setSuggestions(mockData as unknown as NominatimResult[]);
        setShowSuggestions(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar resultados duplicados basados en la localidad principal
  const removeDuplicateLocations = (results: NominatimResult[]): NominatimResult[] => {
    const seen = new Set<string>();
    return results.filter(result => {
      // Obtener la localidad principal (primera parte del display_name)
      const mainLocation = result.display_name.split(',')[0].trim();
      const key = `${mainLocation}`;
      
      // Si ya hemos visto esta localidad, es un duplicado
      if (seen.has(key)) {
        return false;
      }
      
      // Añadir la localidad al conjunto de vistas
      seen.add(key);
      return true;
    });
  };

  // Debounced search
  const handleDestinationChange = (value: string) => {
    setDestination(value);
    
    // Clear previous timer
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }
    
    // Set new timer
    debounceTimerRef.current = window.setTimeout(() => {
      fetchLocations(value);
    }, 300); // 300ms debounce
  };

  // Get mock destinations based on input value (fallback)
  const getMockDestinations = (value: string) => {
    const lowerValue = value.toLowerCase();
    
    // Mock data de localidades españolas
    const allDestinations = [
      { name: "Sevilla", country: "España" },
      { name: "Centro, Sevilla", country: "España" },
      { name: "Triana, Sevilla", country: "España" },
      { name: "Casco Antiguo, Sevilla", country: "España" },
      { name: "Sevilla Este, Sevilla", country: "España" },
      { name: "Madrid", country: "España" },
      { name: "Barcelona", country: "España" },
      { name: "Valencia", country: "España" },
      { name: "Málaga", country: "España" },
      { name: "Granada", country: "España" },
      { name: "Toledo", country: "España" },
      { name: "Santiago de Compostela", country: "España" },
      { name: "Bilbao", country: "España" },
      { name: "San Sebastián", country: "España" },
      { name: "Córdoba", country: "España" }
    ];
    
    // Filtrar destinos y eliminar duplicados
    const filteredDestinations = allDestinations.filter(d => 
      d.name.toLowerCase().includes(lowerValue) || 
      d.country.toLowerCase().includes(lowerValue)
    );
    
    // Eliminar duplicados para datos mockeados
    const uniqueDestinations = filteredDestinations.filter((destination, index, self) =>
      index === self.findIndex(d => d.name.split(',')[0] === destination.name.split(',')[0])
    );
    
    return uniqueDestinations.slice(0, 5);
  };

  const selectSuggestion = (suggestion: NominatimResult) => {
    console.log("Selected suggestion:", suggestion);
    // Extract the first part of the display name (usually city, country)
    const displayParts = suggestion.display_name.split(',');
    const simplified = displayParts.length > 1 
      ? `${displayParts[0].trim()}, España`
      : `${suggestion.display_name}, España`;
      
    setDestination(simplified);
    setShowSuggestions(false);
    
    // Store the full location data including coordinates if needed later
    // This can be used for maps or for more precise search
    localStorage.setItem('selectedLocation', JSON.stringify({
      name: simplified,
      lat: suggestion.lat,
      lon: suggestion.lon,
      full: suggestion.display_name,
      country: "España"
    }));
  };

  // Format display name to be more readable
  const formatDisplayName = (displayName: string): { main: string, secondary: string } => {
    const parts = displayName.split(',').map(part => part.trim());
    
    if (parts.length === 1) {
      return { main: parts[0], secondary: 'España' };
    }
    
    const main = parts[0];
    // Simplificamos para mostrar siempre España como país
    const secondary = parts.length > 2 
      ? `${parts[1]}, España` 
      : 'España';
      
    return { main, secondary };
  };

  if (isMobile) {
    return (
      <div className="relative w-full">
        <div className="flex items-center px-3 py-2">
          <MapPin size={18} className="text-gray-500 mr-2 flex-shrink-0" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="¿A qué localidad de España viajas?" 
            className="w-full bg-transparent border-none outline-none text-sm placeholder-gray-500"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onFocus={() => {
              setActiveTab("destination");
              if (destination.length > 1) {
                fetchLocations(destination);
              }
            }}
          />
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 flex-shrink-0"></div>
          )}
          {destination && !isLoading && (
            <button 
              onClick={handleClear} 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
        </div>
        
        {showSuggestions && (
          <div 
            ref={suggestionsRef}
            className="absolute left-0 right-0 top-[110%] bg-white rounded-lg shadow-lg z-20 border max-h-60 overflow-y-auto"
          >
            {searchError ? (
              <div className="px-4 py-3 text-gray-500">{searchError}</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => {
                const { main, secondary } = formatDisplayName(suggestion.display_name);
                return (
                  <div 
                    key={suggestion.place_id || index}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    <MapPin size={18} className="text-gray-500 mr-3 flex-shrink-0" />
                    <div className="truncate">
                      <div className="font-medium">{main}</div>
                      <div className="text-gray-500 text-sm truncate">{secondary}</div>
                    </div>
                  </div>
                );
              })
            ) : isLoading ? (
              <div className="px-4 py-3 text-gray-500">Buscando localidades en España...</div>
            ) : (
              <div className="px-4 py-3 text-gray-500">Empieza a escribir para buscar localidades en España</div>
            )}
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
      <div className="px-2 relative">
        <div className="text-xs font-bold">Localidad</div>
        <div className="flex items-center">
          <MapPin size={16} className="text-gray-500 mr-2" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="¿A qué localidad de España viajas?" 
            className="w-full bg-transparent border-none outline-none text-sm"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onFocus={() => {
              setActiveTab("destination");
              if (destination.length > 1) {
                fetchLocations(destination);
              }
            }}
          />
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
          )}
          {destination && !isLoading && (
            <button 
              onClick={handleClear} 
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
        </div>
        
        {showSuggestions && (
          <div 
            ref={suggestionsRef}
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-md shadow-lg z-20 border max-h-60 overflow-y-auto"
          >
            {searchError ? (
              <div className="px-4 py-3 text-gray-500">{searchError}</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => {
                const { main, secondary } = formatDisplayName(suggestion.display_name);
                return (
                  <div 
                    key={suggestion.place_id || index}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    <MapPin size={18} className="text-gray-500 mr-3 flex-shrink-0" />
                    <div className="truncate">
                      <div className="font-medium">{main}</div>
                      <div className="text-gray-500 text-sm truncate">{secondary}</div>
                    </div>
                  </div>
                );
              })
            ) : isLoading ? (
              <div className="px-4 py-3 text-gray-500">Buscando localidades en España...</div>
            ) : (
              <div className="px-4 py-3 text-gray-500">Empieza a escribir para buscar localidades en España</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationSearch;
