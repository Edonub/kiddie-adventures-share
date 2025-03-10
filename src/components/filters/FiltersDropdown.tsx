
import { useState, useEffect } from "react";
import { 
  Filter, Tag, MapPin, Clock, Users, Wallet, Plus, X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Category } from "@/data/categories";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Child {
  id: number;
  age: number;
}

interface FiltersDropdownProps {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (categoryId: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  resetFilters: () => void;
  adults?: number;
  setAdults?: (adults: number) => void;
  childrenDetails?: Child[];
  setChildrenDetails?: (children: Child[]) => void;
}

const FiltersDropdown = ({
  categories,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  resetFilters,
  adults = 1,
  setAdults = () => {},
  childrenDetails = [],
  setChildrenDetails = () => {}
}: FiltersDropdownProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  // Using Sheet for mobile which allows page scrolling underneath
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="rounded-full flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] pt-6">
          <ScrollArea className="h-full pr-4">
            <FiltersContent 
              categories={categories}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              resetFilters={resetFilters}
              onClose={() => {}}
              adults={adults}
              setAdults={setAdults}
              childrenDetails={childrenDetails}
              setChildrenDetails={setChildrenDetails}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  // For desktop, use Popover instead of DropdownMenu to allow scrolling of the main page
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="rounded-full flex items-center"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="mr-2 h-4 w-4" />
        Filtros
      </Button>
      
      {showFilters && (
        <div 
          className="absolute left-0 top-[calc(100%+10px)] w-96 p-4 bg-white shadow-lg border border-gray-200 rounded-md max-h-[80vh] overflow-y-auto z-50"
        >
          <FiltersContent 
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            resetFilters={resetFilters}
            onClose={() => setShowFilters(false)}
            adults={adults}
            setAdults={setAdults}
            childrenDetails={childrenDetails}
            setChildrenDetails={setChildrenDetails}
          />
        </div>
      )}
    </div>
  );
};

// Extracted filter content to avoid duplication
const FiltersContent = ({
  categories,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  resetFilters,
  onClose,
  adults = 1,
  setAdults = () => {},
  childrenDetails = [],
  setChildrenDetails = () => {}
}: FiltersDropdownProps & { onClose: () => void }) => {
  const [childAge, setChildAge] = useState<number>(2);
  const [nextChildId, setNextChildId] = useState<number>(
    childrenDetails.length > 0 
      ? Math.max(...childrenDetails.map(c => c.id)) + 1 
      : 1
  );

  const addChild = () => {
    if (childAge < 0 || childAge > 12) return;
    
    const newChild = { id: nextChildId, age: childAge };
    setChildrenDetails([...childrenDetails, newChild]);
    setNextChildId(nextChildId + 1);
    setChildAge(2); // Reset age input for next child
  };

  const removeChild = (id: number) => {
    const updatedChildren = childrenDetails.filter(child => child.id !== id);
    setChildrenDetails(updatedChildren);
  };

  return (
    <div className="space-y-4">
      <DropdownMenuLabel>Filtros</DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      <div className="space-y-4">
        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Wallet className="mr-2 h-4 w-4" /> Precio
          </h3>
          <Slider
            value={priceRange}
            max={500}
            step={10}
            onValueChange={setPriceRange}
            className="my-4"
          />
          <div className="flex justify-between text-sm">
            <span>0€</span>
            <span>{priceRange[0]}€</span>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Group Size - Adults and Children */}
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Users className="mr-2 h-4 w-4" /> Viajeros
          </h3>
          
          {/* Adults */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm">Adultos</span>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                disabled={adults <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="w-5 text-center">{adults}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => setAdults(adults + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          
          {/* Children with ages */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Niños (0-12 años)</span>
              <span className="text-sm">Total: {childrenDetails.length}</span>
            </div>
            
            {/* List of children */}
            <div className="space-y-2 mb-3">
              {childrenDetails.length > 0 ? (
                childrenDetails.map((child) => (
                  <div key={child.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <Badge variant="outline" className="mr-2">
                      {child.age} {child.age === 1 ? 'año' : 'años'}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => removeChild(child.id)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">No hay niños añadidos</div>
              )}
            </div>
            
            {/* Add new child */}
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  type="number"
                  min="0"
                  max="12"
                  value={childAge}
                  onChange={(e) => setChildAge(parseInt(e.target.value) || 0)}
                  className="w-full"
                  placeholder="Edad"
                />
              </div>
              <Button 
                variant="outline"
                onClick={addChild}
                className="whitespace-nowrap"
                disabled={childAge < 0 || childAge > 12}
              >
                <Plus size={16} className="mr-1" />
                Añadir
              </Button>
            </div>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Tag className="mr-2 h-4 w-4" /> Categorías
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.slice(0, 6).map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Location */}
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <MapPin className="mr-2 h-4 w-4" /> Ubicación
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['Madrid', 'Barcelona', 'Valencia', 'Sevilla'].map(location => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox id={`location-${location}`} />
                <Label htmlFor={`location-${location}`} className="text-sm">
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Duration */}
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Clock className="mr-2 h-4 w-4" /> Duración
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['< 1 hora', '1-3 horas', 'Medio día', 'Día completo'].map(duration => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox id={`duration-${duration}`} />
                <Label htmlFor={`duration-${duration}`} className="text-sm">
                  {duration}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Limpiar
        </Button>
        <Button size="sm" onClick={onClose}>
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
};

export default FiltersDropdown;
