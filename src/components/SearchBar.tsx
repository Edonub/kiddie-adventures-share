
import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
}

const SearchBar = ({ className = "", onSearch, initialValue = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center ${className}`}>
      <Input
        type="text"
        placeholder="Buscar experiencias, talleres, actividades..."
        className="pr-10 bg-white py-6 rounded-l-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button 
        type="submit"
        className="rounded-l-none"
      >
        <Search className="h-5 w-5" />
        <span className="ml-2 hidden sm:inline">Buscar</span>
      </Button>
    </form>
  );
};

export default SearchBar;
