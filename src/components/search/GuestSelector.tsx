
import { Users, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface GuestSelectorProps {
  activeTab: string;
  setActiveTab: (tab: "destination" | "dates" | "guests") => void;
  adults: number;
  setAdults: (count: number) => void;
  children: number;
  setChildren: (count: number) => void;
}

const GuestSelector = ({ 
  activeTab, 
  setActiveTab, 
  adults, 
  setAdults, 
  children, 
  setChildren 
}: GuestSelectorProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div 
          className={`p-3 md:p-4 flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer ${activeTab === "guests" ? "bg-gray-50" : ""}`}
          onClick={() => setActiveTab("guests")}
        >
          <div className="px-2 flex-1">
            <div className="text-xs font-bold">Viajeros</div>
            <div className="flex items-center">
              <Users size={16} className="text-gray-500 mr-2" />
              <div className="text-sm text-gray-500">
                {adults + children > 0 
                  ? `${adults + children} ${adults + children === 1 ? 'viajero' : 'viajeros'}`
                  : "Añade viajeros"}
              </div>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Adultos</h3>
              <p className="text-sm text-gray-500">Mayores de 13 años</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setAdults(Math.max(1, adults - 1));
                }}
                disabled={adults <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="w-5 text-center">{adults}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setAdults(adults + 1);
                }}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Niños</h3>
              <p className="text-sm text-gray-500">De 0 a 12 años</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setChildren(Math.max(0, children - 1));
                }}
                disabled={children <= 0}
              >
                <Minus size={16} />
              </Button>
              <span className="w-5 text-center">{children}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setChildren(children + 1);
                }}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GuestSelector;
