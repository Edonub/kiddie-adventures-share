
import { Button } from "./ui/button";
import { Search, Users, Plus, Minus, MapPin, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { toast } from "sonner";

const AirbnbSearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState<"destination" | "dates" | "guests">("destination");
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

  const handleSearch = () => {
    console.log("Searching for destination:", destination);
    if (!destination.trim()) {
      toast.error("Por favor selecciona un destino");
      return;
    }
    
    const params = new URLSearchParams();
    if (destination) params.append("destino", destination);
    
    if (dateFrom) {
      params.append("dateFrom", format(dateFrom, "yyyy-MM-dd"));
      
      if (dateTo) {
        params.append("dateTo", format(dateTo, "yyyy-MM-dd"));
      }
    }
    
    const totalGuests = adults + children;
    if (totalGuests > 0) params.append("guests", totalGuests.toString());
    
    navigate(`/explorar?${params.toString()}`);
  };

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
    <div className="max-w-4xl mx-auto bg-white rounded-full shadow-lg border border-gray-200 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center">
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
        
        <Popover>
          <PopoverTrigger asChild>
            <div 
              className={`p-3 md:p-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer ${activeTab === "dates" ? "bg-gray-50" : ""}`}
              onClick={() => setActiveTab("dates")}
            >
              <div className="px-2">
                <div className="text-xs font-bold">Llegada</div>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-500 mr-2" />
                  <div className="text-sm text-gray-500">
                    {dateFrom ? format(dateFrom, "dd MMM") : "Seleccionar fecha"}
                  </div>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={dateFrom}
              onSelect={setDateFrom}
              initialFocus
              className="p-2 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <div 
              className={`p-3 md:p-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer ${activeTab === "dates" ? "bg-gray-50" : ""}`}
              onClick={() => setActiveTab("dates")}
            >
              <div className="px-2">
                <div className="text-xs font-bold">Salida</div>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-500 mr-2" />
                  <div className="text-sm text-gray-500">
                    {dateTo ? format(dateTo, "dd MMM") : "Seleccionar fecha"}
                  </div>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={dateTo}
              onSelect={setDateTo}
              initialFocus
              className="p-2 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <div 
              className={`p-3 md:p-4 flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer ${activeTab === "guests" ? "bg-gray-50" : ""}`}
              onClick={() => setActiveTab("guests")}
            >
              <div className="px-2 flex-1">
                <div className="text-xs font-bold">Viajeros</div>
                <div className="flex items-center">
                  <Users size={16} className="text-gray-500 mr-2" />
                  <div className="text-sm text-gray-500">
                    {adults + children > 0 
                      ? `${adults + children} ${adults + children === 1 ? 'viajero' : 'viajeros'}`
                      : "Añade viajeros"}
                  </div>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Adultos</h3>
                  <p className="text-sm text-gray-500">Mayores de 13 años</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAdults(Math.max(1, adults - 1));
                    }}
                    disabled={adults <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-5 text-center">{adults}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAdults(adults + 1);
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Niños</h3>
                  <p className="text-sm text-gray-500">De 0 a 12 años</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setChildren(Math.max(0, children - 1));
                    }}
                    disabled={children <= 0}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-5 text-center">{children}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setChildren(children + 1);
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="p-3 md:p-4">
          <Button 
            onClick={handleSearch}
            size="lg" 
            className="w-full md:w-auto bg-familea-primary hover:bg-familea-secondary text-white rounded-full"
          >
            <Search size={18} className="mr-2" />
            <span>Buscar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AirbnbSearchBar;
