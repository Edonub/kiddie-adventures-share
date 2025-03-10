
import { useState } from "react";
import { Clock, FilterX, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { Category } from "@/data/categories";
import { Badge } from "../ui/badge";

interface FiltersDropdownProps {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (categoryId: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  durationRange: number[];
  setDurationRange: (range: number[]) => void;
  resetFilters: () => void;
  isMobile?: boolean;
}

const FiltersDropdown = ({
  categories,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  durationRange,
  setDurationRange,
  resetFilters,
  isMobile = false
}: FiltersDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours}h ${remainingMinutes}min` 
        : `${hours}h`;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {isMobile ? (
          <Button variant="outline" className="h-10 w-10 rounded-full p-0 flex items-center justify-center">
            <SlidersHorizontal size={16} />
          </Button>
        ) : (
          <Button variant="outline">
            <FilterX className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium">Precio máximo</h3>
            <p className="text-xs text-gray-500">
              Selecciona el precio máximo que estás dispuesto a pagar.
            </p>
            <Slider
              defaultValue={priceRange}
              max={1000}
              step={10}
              onValueChange={(value) => setPriceRange(value)}
            />
            <div className="text-right text-gray-500 text-xs">
              Hasta {priceRange[0]}€
            </div>
          </div>

          <Separator />

          {/* Duration Range */}
          <div>
            <h3 className="text-sm font-medium">Duración máxima</h3>
            <p className="text-xs text-gray-500">
              Selecciona la duración máxima de la experiencia.
            </p>
            <Slider
              defaultValue={durationRange}
              max={480}
              step={30}
              onValueChange={(value) => setDurationRange(value)}
            />
            <div className="text-right text-gray-500 text-xs">
              Hasta {formatDuration(durationRange[0])}
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium">Categorías</h3>
            <div className="flex flex-wrap gap-1 mt-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "secondary"}
                  onClick={() => toggleCategory(category.id)}
                  className="cursor-pointer"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Reset and Apply buttons */}
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => {
              resetFilters();
              setIsOpen(false);
            }}>
              Borrar filtros
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Aplicar filtros
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FiltersDropdown;
