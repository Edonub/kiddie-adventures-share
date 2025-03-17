
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import ChildrenSection from "./search/guests/ChildrenSection";
import AdultCounter from "./search/guests/AdultCounter";
import ChildrenSummary from "./search/guests/ChildrenSummary";
import { cn } from "@/lib/utils";

interface Child {
  id: number;
  age: number;
}

const AirbnbSearchBar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childrenDetails, setChildrenDetails] = useState<Child[]>([]);
  const [nextChildId, setNextChildId] = useState<number>(1);
  const [searchOpen, setSearchOpen] = useState(false);

  const addChild = (age: number) => {
    const newChild = { id: nextChildId, age };
    setChildrenDetails([...childrenDetails, newChild]);
    setChildren(childrenDetails.length + 1);
    setNextChildId(nextChildId + 1);
  };

  const removeChild = (id: number) => {
    const updatedChildren = childrenDetails.filter(child => child.id !== id);
    setChildrenDetails(updatedChildren);
    setChildren(updatedChildren.length);
  };

  const handleSearch = () => {
    if (!destination.trim()) {
      toast.error("Por favor selecciona una localidad española");
      return;
    }
    
    const params = new URLSearchParams();
    if (destination) params.append("destino", destination);
    
    if (date?.from) {
      params.append("dateFrom", format(date.from, "yyyy-MM-dd"));
      
      if (date.to) {
        params.append("dateTo", format(date.to, "yyyy-MM-dd"));
      }
    }
    
    // Agregar información de adultos y niños
    if (adults > 0) params.append("adults", adults.toString());
    
    // Agregar detalles de niños si hay alguno
    if (childrenDetails.length > 0) {
      childrenDetails.forEach((child, index) => {
        params.append(`childAge${index}`, child.age.toString());
      });
      params.append("childrenCount", childrenDetails.length.toString());
    }
    
    localStorage.setItem('lastSearch', JSON.stringify({
      destination,
      dateFrom: date?.from ? format(date.from, "yyyy-MM-dd") : null,
      dateTo: date?.to ? format(date.to, "yyyy-MM-dd") : null,
      adults,
      children: childrenDetails.length,
      childrenDetails,
      country: "España"
    }));
    
    navigate(`/explorar?${params.toString()}`);
    setSearchOpen(false);
  };

  const getDisplayText = () => {
    const parts = [];
    if (destination) parts.push(destination);
    if (date?.from) {
      const dateText = date.to 
        ? `${format(date.from, "dd MMM")} - ${format(date.to, "dd MMM")}` 
        : format(date.from, "dd MMM");
      parts.push(dateText);
    }
    if (adults > 0 || childrenDetails.length > 0) {
      const guestText = `${adults} ${adults === 1 ? 'adulto' : 'adultos'}${childrenDetails.length > 0 ? `, ${childrenDetails.length} ${childrenDetails.length === 1 ? 'niño' : 'niños'}` : ''}`;
      parts.push(guestText);
    }
    
    return parts.length > 0 
      ? parts.join(' · ') 
      : "¿A dónde viajas?";
  };

  return (
    <Popover open={searchOpen} onOpenChange={setSearchOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full bg-white shadow-sm rounded-full border flex items-center h-8 px-2 justify-between"
        >
          <div className="flex items-center text-xs text-gray-600 truncate">
            <span className="truncate mr-1">{getDisplayText()}</span>
          </div>
          <div className="rounded-full bg-primary w-6 h-6 flex items-center justify-center flex-shrink-0">
            <Search className="h-3 w-3 text-white" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-80 max-h-[80vh] overflow-y-auto" align="center">
        <div className="p-3 border-b">
          <h3 className="font-medium text-sm mb-2">Localidad</h3>
          <div className="flex items-center border rounded-lg px-2 py-1">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <Input
              type="text"
              placeholder="¿A qué localidad de España viajas?"
              className="border-0 shadow-none text-sm p-0 h-8 focus-visible:ring-0"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        
        <div className="p-3 border-b">
          <h3 className="font-medium text-sm mb-2">Fechas</h3>
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            initialFocus
            numberOfMonths={1}
            className="p-0 pointer-events-auto"
          />
        </div>
        
        <div className="p-3 border-b">
          <h3 className="font-medium text-sm mb-2">Viajeros</h3>
          <div className="space-y-3">
            <AdultCounter adults={adults} setAdults={setAdults} />
            
            <div className="border-t pt-3">
              <ChildrenSection 
                children={children}
                childrenDetails={childrenDetails}
                removeChild={removeChild}
                addChild={addChild}
              />
            </div>
            
            {children > 0 && <ChildrenSummary childrenDetails={childrenDetails} />}
          </div>
        </div>
        
        <div className="p-3">
          <Button 
            className="w-full" 
            onClick={handleSearch}
          >
            <Search className="h-4 w-4 mr-2" /> 
            Buscar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AirbnbSearchBar;
