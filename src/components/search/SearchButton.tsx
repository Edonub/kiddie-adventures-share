
import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton = ({
  onClick
}: SearchButtonProps) => {
  return <div className="p-3 md:p-4">
      <Button 
        onClick={onClick} 
        size="lg" 
        className="w-full md:w-auto text-white rounded-full bg-familyxp-primary hover:bg-familyxp-secondary flex items-center justify-center"
      >
        <Search size={20} />
      </Button>
    </div>;
};

export default SearchButton;
