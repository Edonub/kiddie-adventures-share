
import { Button } from "./ui/button";
import { Search, Users, Plus, Minus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import DateRangePicker, { DateRange } from "./DateRangePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

const AirbnbSearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState<"destination" | "dates" | "guests">("destination");
  const [suggestions, setSuggestions] = useState<{name: string, country: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.append("destino", destination);
    
    if (dateRange?.from) {
      params.append("dateFrom", format(dateRange.from, "yyyy-MM-dd"));
      
      if (dateRange.to) {
        params.append("dateTo", format(dateRange.to, "yyyy-MM-dd"));
      }
    }
    
    const totalGuests = adults + children;
    if (totalGuests > 0) params.append("guests", totalGuests.toString());
    
    navigate(`/explorar?${params.toString()}`);
  };

  // Handle fetch suggestions as user types
  const handleDestinationChange = async (value: string) => {
    setDestination(value);
    
    if (value.length > 1) {
      const { data, error } = await supabase
        .from('destinations')
        .select('name, country')
        .ilike('name', `%${value}%`)
        .order('popularity', { ascending: false })
        .limit(5);
        
      if (!error && data) {
        setSuggestions(data);
        setShowSuggestions(true);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
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
            <input 
              type="text" 
              placeholder="Buscar destinos" 
              className="w-full bg-transparent border-none outline-none text-sm"
              value={destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              onFocus={() => setActiveTab("destination")}
            />
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-md shadow-lg z-10 border">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => selectSuggestion(suggestion.name)}
                  >
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
                <div className="text-sm text-gray-500">
                  {dateRange.from ? format(dateRange.from, "dd MMM") : "Introduce la fecha"}
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <DateRangePicker
              initialDateRange={dateRange}
              onChange={setDateRange}
              className="border-none shadow-none"
              showDirect={true}
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
                <div className="text-sm text-gray-500">
                  {dateRange.to ? format(dateRange.to, "dd MMM") : "Introduce la fecha"}
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <DateRangePicker
              initialDateRange={dateRange}
              onChange={setDateRange}
              className="border-none shadow-none"
              showDirect={true}
            />
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <div 
              className={`p-3 md:p-4 flex-1 flex items-center justify-between cursor-pointer rounded-b-full md:rounded-r-full md:rounded-bl-none ${activeTab === "guests" ? "bg-gray-50" : ""}`}
              onClick={() => setActiveTab("guests")}
            >
              <div className="px-2">
                <div className="text-xs font-bold">Viajeros</div>
                <div className="text-sm text-gray-500">
                  {adults + children > 0 
                    ? `${adults + children} ${adults + children === 1 ? 'viajero' : 'viajeros'}`
                    : "Añade viajeros"}
                </div>
              </div>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearch();
                }}
                size="icon" 
                className="bg-familyxp-primary hover:bg-familyxp-secondary text-white rounded-full"
              >
                <Search size={18} />
              </Button>
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
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-5 text-center">{adults}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setAdults(adults + 1)}
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
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-5 text-center">{children}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => setChildren(children + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AirbnbSearchBar;
