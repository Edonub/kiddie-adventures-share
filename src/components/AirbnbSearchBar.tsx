
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import DestinationSearch from "./search/DestinationSearch";
import DateSelection from "./search/DateSelection";
import GuestSelector from "./search/GuestSelector";
import SearchButton from "./search/SearchButton";

const AirbnbSearchBar = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState<"destination" | "dates" | "guests">("destination");

  const handleSearch = () => {
    console.log("Searching for destination:", destination);
    if (!destination.trim()) {
      toast.error("Por favor selecciona una localidad española");
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
    
    localStorage.setItem('lastSearch', JSON.stringify({
      destination,
      dateFrom: dateFrom ? format(dateFrom, "yyyy-MM-dd") : null,
      dateTo: dateTo ? format(dateTo, "yyyy-MM-dd") : null,
      guests: totalGuests,
      country: "España"
    }));
    
    navigate(`/explorar?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-full shadow-lg border border-gray-200 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-[33%]">
          <DestinationSearch 
            destination={destination}
            setDestination={setDestination}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        
        <div className="w-full md:w-[28%]">
          <DateSelection 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
          />
        </div>
        
        <div className="w-full md:w-[28%]">
          <GuestSelector 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
          />
        </div>

        <div className="w-full md:w-[11%]">
          <SearchButton onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default AirbnbSearchBar;
