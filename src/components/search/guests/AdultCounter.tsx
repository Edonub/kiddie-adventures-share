
import { Plus, Minus } from "lucide-react";
import { Button } from "../../ui/button";

interface AdultCounterProps {
  adults: number;
  setAdults: (count: number) => void;
}

const AdultCounter = ({ adults, setAdults }: AdultCounterProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-sm">Adultos</h3>
        <p className="text-xs text-gray-500">Mayores de 13 años</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            setAdults(Math.max(1, adults - 1));
          }}
          disabled={adults <= 1}
        >
          <Minus size={14} />
        </Button>
        <span className="w-4 text-center text-sm">{adults}</span>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-7 w-7 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            setAdults(adults + 1);
          }}
        >
          <Plus size={14} />
        </Button>
      </div>
    </div>
  );
};

export default AdultCounter;
