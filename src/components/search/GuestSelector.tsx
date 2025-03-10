
import { Users, Plus, Minus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface Child {
  id: number;
  age: number;
}

interface GuestSelectorProps {
  activeTab: string;
  setActiveTab: (tab: "destination" | "dates" | "guests") => void;
  adults: number;
  setAdults: (count: number) => void;
  children: number;
  setChildren: (count: number) => void;
  childrenDetails?: Child[];
  setChildrenDetails?: (children: Child[]) => void;
}

const GuestSelector = ({ 
  activeTab, 
  setActiveTab, 
  adults, 
  setAdults, 
  children,
  setChildren,
  childrenDetails = [],
  setChildrenDetails = () => {}
}: GuestSelectorProps) => {
  const isMobile = useIsMobile();
  const [childAge, setChildAge] = useState<number>(2);
  const [nextChildId, setNextChildId] = useState<number>(1);

  const addChild = () => {
    const newChild = { id: nextChildId, age: childAge };
    setChildrenDetails([...childrenDetails, newChild]);
    setChildren(childrenDetails.length + 1);
    setNextChildId(nextChildId + 1);
    setChildAge(2); // Reset age input for next child
  };

  const removeChild = (id: number) => {
    const updatedChildren = childrenDetails.filter(child => child.id !== id);
    setChildrenDetails(updatedChildren);
    setChildren(updatedChildren.length);
  };

  const getChildrenSummary = () => {
    if (childrenDetails.length === 0) return "";
    
    // Group children by age
    const ageGroups: Record<number, number> = {};
    childrenDetails.forEach(child => {
      ageGroups[child.age] = (ageGroups[child.age] || 0) + 1;
    });
    
    // Create summary text
    const groups = Object.entries(ageGroups).map(([age, count]) => 
      `${count} de ${age} ${count === 1 ? 'año' : 'años'}`
    );
    
    return groups.join(', ');
  };

  // Handle the input change to prevent leading zeros
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Parse to number and back to string to remove leading zeros
    const ageValue = parseInt(value) || 0;
    setChildAge(ageValue);
  };

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex justify-between items-center w-full h-12 px-3 py-2 bg-white">
            <Users size={18} className="text-gray-500 mr-2" />
            <span className="flex-1 text-left text-sm text-gray-500 truncate">
              {adults + children > 0 
                ? `${adults} ${adults === 1 ? 'adulto' : 'adultos'}${children > 0 ? `, ${children} ${children === 1 ? 'niño' : 'niños'}` : ''}`
                : "Viajeros"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="center">
          <div className="space-y-4">
            {/* Adultos */}
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
            
            {/* Niños */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium">Niños</h3>
                  <p className="text-sm text-gray-500">De 0 a 12 años</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-5 text-center">{children}</span>
                </div>
              </div>
              
              {/* Lista de niños con sus edades */}
              <div className="space-y-2 mt-2">
                {childrenDetails.map((child) => (
                  <div key={child.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">{child.age} {child.age === 1 ? 'año' : 'años'}</Badge>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeChild(child.id);
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
              
              {/* Formulario para añadir un niño */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1">
                  <Input
                    type="number"
                    min="0"
                    max="12"
                    value={childAge}
                    onChange={handleAgeChange}
                    className="w-full"
                    placeholder="Edad del niño"
                  />
                </div>
                <Button 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    addChild();
                  }}
                  className="whitespace-nowrap"
                >
                  <Plus size={16} className="mr-1" />
                  Añadir niño
                </Button>
              </div>
            </div>
            
            {/* Resumen de niños */}
            {children > 0 && (
              <div className="bg-gray-50 p-2 rounded text-sm">
                <p><strong>Resumen:</strong> {getChildrenSummary()}</p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

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
                  ? `${adults} ${adults === 1 ? 'adulto' : 'adultos'}${children > 0 ? `, ${children} ${children === 1 ? 'niño' : 'niños'}` : ''}`
                  : "Añade viajeros"}
              </div>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          {/* Adultos */}
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
          
          {/* Niños */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">Niños</h3>
                <p className="text-sm text-gray-500">De 0 a 12 años</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-5 text-center">{children}</span>
              </div>
            </div>
            
            {/* Lista de niños con sus edades */}
            <div className="space-y-2 mt-2">
              {childrenDetails.map((child) => (
                <div key={child.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">{child.age} {child.age === 1 ? 'año' : 'años'}</Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeChild(child.id);
                    }}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Formulario para añadir un niño */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1">
                <Input
                  type="number"
                  min="0"
                  max="12"
                  value={childAge}
                  onChange={handleAgeChange}
                  className="w-full"
                  placeholder="Edad del niño"
                />
              </div>
              <Button 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  addChild();
                }}
                className="whitespace-nowrap"
              >
                <Plus size={16} className="mr-1" />
                Añadir niño
              </Button>
            </div>
          </div>
          
          {/* Resumen de niños */}
          {children > 0 && (
            <div className="bg-gray-50 p-2 rounded text-sm">
              <p><strong>Resumen:</strong> {getChildrenSummary()}</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GuestSelector;
