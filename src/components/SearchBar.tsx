
import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string, date?: Date) => void;
  initialValue?: string;
  initialDate?: Date;
  variant?: string;
}

const SearchBar = ({ className = "", onSearch, initialValue = "", initialDate, variant }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [date, setDate] = useState<Date | undefined>(initialDate);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, date);
    }
  };

  // Apply special styling for home variant
  const isHomeVariant = variant === 'home';
  
  return (
    <form onSubmit={handleSearch} className={`relative flex items-center ${className}`}>
      <Input
        type="text"
        placeholder="Buscar experiencias, talleres, actividades..."
        className={`pr-10 bg-white py-6 w-full ${isHomeVariant ? 'rounded-l-none rounded-r-none border-r-0' : ''}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            type="button"
            variant="outline" 
            className={cn(
              "py-6 rounded-none border-l-0 border-r-0 w-full",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy") : <span>Selecciona fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      
      <Button 
        type="submit"
        className={isHomeVariant ? "rounded-l-none" : ""}
      >
        <Search className="h-5 w-5" />
        <span className="ml-2 hidden sm:inline">Buscar</span>
      </Button>
    </form>
  );
};

export default SearchBar;
