
import { Search, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchBarProps {
  className?: string;
  variant?: "default" | "home";
}

const SearchBar = ({ className = "", variant = "default" }: SearchBarProps) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center gap-3 ${className} ${variant === "home" ? "w-full max-w-3xl bg-white p-3 rounded-lg shadow-md" : ""}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          type="text" 
          placeholder="¿Qué planes buscas?" 
          className={`pl-10 ${variant === "home" ? "border-0 shadow-none focus:ring-0" : ""}`}
        />
      </div>
      
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          type="text" 
          placeholder="¿Dónde buscar?" 
          className={`pl-10 ${variant === "home" ? "border-0 shadow-none focus:ring-0" : ""}`}
        />
      </div>
      
      <Button className="bg-familyxp-primary hover:bg-familyxp-secondary">
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
