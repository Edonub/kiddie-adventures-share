
import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <div className="p-3 md:p-4">
      <Button 
        onClick={onClick}
        size="lg" 
        className="w-full md:w-auto bg-familea-primary hover:bg-familea-secondary text-white rounded-full"
      >
        <Search size={18} className="mr-2" />
        <span>Buscar</span>
      </Button>
    </div>
  );
};

export default SearchButton;
