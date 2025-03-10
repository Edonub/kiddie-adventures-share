
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import DestinationSearch from "./search/DestinationSearch";
import DateSelection from "./search/DateSelection";
import GuestSelector from "./search/GuestSelector";
import SearchButton from "./search/SearchButton";

interface Child {
  id: number;
  age: number;
}

const AirbnbSearchBar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [destination, setDestination] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childrenDetails, setChildrenDetails] = useState<Child[]>([]);
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
    
    // Agregar información de adultos y niños
    if (adults > 0) params.append("adults", adults.toString());
    
    // Agregar detalles de niños si hay alguno
    if (childrenDetails.length > 0) {
      // Guardar cada niño con su edad como un item separado
      childrenDetails.forEach((child, index) => {
        params.append(`childAge${index}`, child.age.toString());
      });
      params.append("childrenCount", childrenDetails.length.toString());
    }
    
    localStorage.setItem('lastSearch', JSON.stringify({
      destination,
      dateFrom: dateFrom ? format(dateFrom, "yyyy-MM-dd") : null,
      dateTo: dateTo ? format(dateTo, "yyyy-MM-dd") : null,
      adults,
      children: childrenDetails.length,
      childrenDetails,
      country: "España"
    }));
    
    navigate(`/explorar?${params.toString()}`);
  };

  if (isMobile) {
    return (
      <div className="w-full px-4 mt-16"> {/* Added margin-top to account for fixed navbar */}
        <div className="bg-white shadow-md rounded-full border border-gray-200 flex items-center">
          <div className="flex-1">
            <DestinationSearch
              destination={destination}
              setDestination={setDestination}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="pr-1">
            <SearchButton onClick={handleSearch} />
          </div>
        </div>
        
        {/* Expanded view for dates and guests as secondary actions */}
        <div className="mt-3 flex gap-2">
          <div className="flex-1">
            <DateSelection
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              dateFrom={dateFrom}
              setDateFrom={setDateFrom}
              dateTo={dateTo}
              setDateTo={setDateTo}
            />
          </div>
          
          <div className="flex-1">
            <GuestSelector
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              childrenDetails={childrenDetails}
              setChildrenDetails={setChildrenDetails}
            />
          </div>
        </div>
      </div>
    );
  }

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
            childrenDetails={childrenDetails}
            setChildrenDetails={setChildrenDetails}
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
