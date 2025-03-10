
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton = ({
  onClick
}: SearchButtonProps) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Button 
        onClick={onClick} 
        size="icon" 
        className="h-10 w-10 rounded-full bg-familyxp-primary hover:bg-familyxp-secondary flex items-center justify-center text-white"
      >
        <Search size={18} />
      </Button>
    );
  }
  
  return (
    <div className="p-3 md:p-4">
      <Button 
        onClick={onClick} 
        size="lg" 
        className="w-full md:w-auto text-white rounded-full bg-familyxp-primary hover:bg-familyxp-secondary flex items-center justify-center"
      >
        <Search size={20} />
      </Button>
    </div>
  );
};

export default SearchButton;
