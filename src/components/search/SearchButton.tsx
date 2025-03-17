
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface SearchButtonProps {
  onClick: () => void;
  className?: string;
}

const SearchButton = ({ onClick, className }: SearchButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type="button"
      className={cn(
        "rounded-full h-8 w-8 md:h-8 md:w-auto md:px-4 flex items-center justify-center",
        className
      )}
    >
      <Search className="h-4 w-4" />
      <span className="ml-2 hidden md:inline text-xs">Buscar</span>
    </Button>
  );
};

export default SearchButton;
