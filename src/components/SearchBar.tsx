
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
    <form onSubmit={handleSearch} className={`relative flex flex-col sm:flex-row items-center gap-2 sm:gap-0 ${className}`}>
      <Input
        type="text"
        placeholder="Buscar experiencias, talleres, actividades..."
        className={`pr-10 bg-white py-6 w-full ${isHomeVariant ? 'sm:rounded-l-none sm:rounded-r-none sm:border-r-0 rounded-lg sm:rounded-lg mb-2 sm:mb-0' : ''}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <DateRangePicker 
        initialDateRange={dateRange}
        onChange={setDateRange}
        className={cn(
          "w-full mb-2 sm:mb-0",
          isHomeVariant && "sm:rounded-none sm:border-l-0 sm:border-r-0 rounded-lg sm:rounded-none"
        )}
      />
      
      <Button 
        type="submit"
        className={cn(
          "w-full sm:w-auto",
          isHomeVariant && "sm:rounded-l-none rounded-lg sm:rounded-l-none"
        )}
      >
        <Search className="h-5 w-5" />
        <span className="ml-2 inline">Buscar</span>
      </Button>
    </form>
  );
};

export default SearchBar;
