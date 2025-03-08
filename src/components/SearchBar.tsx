
import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import DateRangePicker, { DateRange } from "./DateRangePicker";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

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
  const [suggestions, setSuggestions] = useState<{name: string, country: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 1) {
        const { data, error } = await supabase
          .from('destinations')
          .select('name, country')
          .ilike('name', `%${searchQuery}%`)
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

    fetchSuggestions();
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, dateRange);
    }
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // Apply special styling for home variant
  const isHomeVariant = variant === 'home';
  
  return (
    <form onSubmit={handleSearch} className={`relative flex flex-col sm:flex-row items-center gap-2 sm:gap-0 bg-white rounded-full shadow-lg ${className}`}>
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Buscar experiencias, talleres, actividades..."
          className={`pr-10 bg-white py-6 w-full ${isHomeVariant ? 'sm:rounded-l-full sm:rounded-r-none sm:border-r-0 rounded-lg sm:rounded-lg mb-2 sm:mb-0' : 'rounded-full'}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
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
      
      <DateRangePicker 
        initialDateRange={dateRange}
        onChange={setDateRange}
        className={cn(
          "w-full mb-2 sm:mb-0",
          isHomeVariant && "sm:rounded-none sm:border-l-0 sm:border-r-0 rounded-lg sm:rounded-none"
        )}
        showDirect={true}
      />
      
      <Button 
        type="submit"
        className={cn(
          "w-full sm:w-auto rounded-full",
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
