
import { useState } from "react";
import { 
  Filter, Tag, MapPin, Clock, Users, Wallet 
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
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Category } from "@/data/categories";

interface FiltersDropdownProps {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (categoryId: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  resetFilters: () => void;
}

const FiltersDropdown = ({
  categories,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  resetFilters
}: FiltersDropdownProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <DropdownMenu open={showFilters} onOpenChange={setShowFilters}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-4 bg-white shadow-lg border border-gray-200 rounded-md" 
        align="start"
        side="bottom"
        sideOffset={5}
      >
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
          
          <DropdownMenuSeparator />
          
          {/* Group Size */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Users className="mr-2 h-4 w-4" /> Tamaño del grupo
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['Individual', 'Parejas', 'Pequeño grupo', 'Grupo grande'].map(size => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`} className="text-sm">
                    {size}
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
          <Button size="sm" onClick={() => setShowFilters(false)}>
            Aplicar filtros
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FiltersDropdown;
