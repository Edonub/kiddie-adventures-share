
import { Search, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [suggestions, setSuggestions] = useState<{name: string, country: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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

  // Improved destination search handler
  const handleDestinationChange = async (value: string) => {
    setDestination(value);
    
    if (value.length > 1) {
      try {
        console.log("Fetching destinations for:", value);
        // Use Supabase to fetch destinations
        const { data, error } = await supabase
          .from('destinations')
          .select('name, country')
          .ilike('name', `${value}%`)
          .order('popularity', { ascending: false })
          .limit(5);
          
        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        console.log("Destination results:", data);
        if (data && data.length > 0) {
          setSuggestions(data);
          setShowSuggestions(true);
        } else {
          // If no data from Supabase, use fallback mock data
          const mockDestinations = [
            { name: "Madrid", country: "España" },
            { name: "Barcelona", country: "España" },
            { name: "Valencia", country: "España" },
            { name: "Málaga", country: "España" },
            { name: "Sevilla", country: "España" }
          ].filter(d => d.name.toLowerCase().startsWith(value.toLowerCase()));
          
          setSuggestions(mockDestinations);
          setShowSuggestions(mockDestinations.length > 0);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        // Fallback to simple filtering
        const mockDestinations = [
          { name: "Madrid", country: "España" },
          { name: "Barcelona", country: "España" },
          { name: "Valencia", country: "España" },
          { name: "Málaga", country: "España" },
          { name: "Sevilla", country: "España" }
        ].filter(d => d.name.toLowerCase().startsWith(value.toLowerCase()));
        
        setSuggestions(mockDestinations);
        setShowSuggestions(mockDestinations.length > 0);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    console.log("Selected suggestion:", suggestion);
    setDestination(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div 
      className={`p-3 md:p-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer rounded-t-full md:rounded-l-full md:rounded-tr-none ${activeTab === "destination" ? "bg-gray-50" : ""}`}
      onClick={() => setActiveTab("destination")}
    >
      <div className="px-2 relative">
        <div className="text-xs font-bold">Destino</div>
        <div className="flex items-center">
          <MapPin size={16} className="text-gray-500 mr-2" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Buscar destinos" 
            className="w-full bg-transparent border-none outline-none text-sm"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onFocus={() => {
              setActiveTab("destination");
              if (destination.length > 1) setShowSuggestions(true);
            }}
          />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-md shadow-lg z-10 border max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => selectSuggestion(suggestion.name)}
              >
                <MapPin size={16} className="text-gray-500 mr-2" />
                <span className="mr-2">{suggestion.name}, </span>
                <span className="text-gray-500 text-sm">{suggestion.country}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationSearch;
