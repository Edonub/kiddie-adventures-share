
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import DateRangePicker, { DateRange } from "./DateRangePicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const AirbnbSearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [guests, setGuests] = useState(0);
  const [activeTab, setActiveTab] = useState<"destination" | "dates" | "guests">("destination");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.append("destino", destination);
    
    if (dateRange?.from) {
      params.append("dateFrom", format(dateRange.from, "yyyy-MM-dd"));
      
      if (dateRange.to) {
        params.append("dateTo", format(dateRange.to, "yyyy-MM-dd"));
      }
    }
    
    if (guests > 0) params.append("guests", guests.toString());
    
    navigate(`/explorar?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-full shadow-lg border border-gray-200 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center">
        <div 
          className={`p-3 md:p-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer rounded-t-full md:rounded-l-full md:rounded-tr-none ${activeTab === "destination" ? "bg-gray-50" : ""}`}
          onClick={() => setActiveTab("destination")}
        >
          <div className="px-2">
            <div className="text-xs font-bold">Destino</div>
            <input 
              type="text" 
              placeholder="Buscar destinos" 
              className="w-full bg-transparent border-none outline-none text-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
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
            />
          </PopoverContent>
        </Popover>
        
        <div 
          className={`p-3 md:p-4 flex-1 flex items-center justify-between cursor-pointer rounded-b-full md:rounded-r-full md:rounded-bl-none ${activeTab === "guests" ? "bg-gray-50" : ""}`}
          onClick={() => setActiveTab("guests")}
        >
          <div className="px-2">
            <div className="text-xs font-bold">Viajeros</div>
            <div className="text-sm text-gray-500">
              {guests > 0 ? `${guests} viajeros` : "Añade viajeros"}
            </div>
          </div>
          <Button 
            onClick={handleSearch}
            size="icon" 
            className="bg-familyxp-primary hover:bg-familyxp-secondary text-white rounded-full"
          >
            <Search size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AirbnbSearchBar;
