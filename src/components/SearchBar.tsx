
import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import DateRangePicker, { DateRange } from "./DateRangePicker";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string, dateRange?: DateRange) => void;
  initialValue?: string;
  initialDateRange?: DateRange;
  variant?: string;
}

const SearchBar = ({ className = "", onSearch, initialValue = "", initialDateRange, variant }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange || { from: undefined, to: undefined });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, dateRange);
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
      
      <DateRangePicker 
        initialDateRange={dateRange}
        onChange={setDateRange}
        className={cn(
          "w-full",
          isHomeVariant && "rounded-none border-l-0 border-r-0"
        )}
      />
      
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
