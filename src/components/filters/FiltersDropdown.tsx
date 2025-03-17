import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";

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
  bookingType: "all" | "free" | "paid";
  setBookingType: (type: "all" | "free" | "paid") => void;
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
  isMobile = false,
  bookingType,
  setBookingType
}: FiltersDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobileDevice = useIsMobile();

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

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] < 200 || durationRange[0] < 180 || bookingType !== "all";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={`p-1 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 ${hasActiveFilters ? "text-familyxp-primary border-familyxp-primary/30" : "text-gray-600"}`}
          size="icon"
        >
          <SlidersHorizontal className="h-3 w-3" />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-familyxp-primary text-white text-[10px] flex items-center justify-center">
              {selectedCategories.length + (priceRange[0] < 200 ? 1 : 0) + (durationRange[0] < 180 ? 1 : 0) + (bookingType !== "all" ? 1 : 0)}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        side="bottom" 
        align={isMobileDevice ? "center" : "end"}
        alignOffset={isMobileDevice ? 0 : undefined}
        sideOffset={5} 
        className={`${isMobileDevice ? "w-[calc(100vw-32px)] max-w-[380px]" : "w-[320px]"} p-6 bg-white shadow-xl rounded-xl border-none z-[999]`}
        avoidCollisions={false}
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800">Tipo de experiencia</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge
                variant={bookingType === "all" ? "default" : "secondary"}
                onClick={() => setBookingType("all")}
                className={`cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm ${
                  bookingType === "all"
                    ? "bg-familyxp-primary text-white hover:bg-familyxp-primary/90"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todos
              </Badge>
              <Badge
                variant={bookingType === "free" ? "default" : "secondary"}
                onClick={() => setBookingType("free")}
                className={`cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm ${
                  bookingType === "free"
                    ? "bg-familyxp-primary text-white hover:bg-familyxp-primary/90"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Gratis
              </Badge>
              <Badge
                variant={bookingType === "paid" ? "default" : "secondary"}
                onClick={() => setBookingType("paid")}
                className={`cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm ${
                  bookingType === "paid"
                    ? "bg-familyxp-primary text-white hover:bg-familyxp-primary/90"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Reservar
              </Badge>
            </div>
          </div>

          <Separator className="bg-gray-100" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">Precio máximo</h3>
              <span className="text-sm font-medium text-familyxp-primary">{priceRange[0]}€</span>
            </div>
            {!isMobileDevice && (
              <p className="text-xs text-gray-500 leading-relaxed">
                Selecciona el precio máximo que estás dispuesto a pagar.
              </p>
            )}
            <Slider
              defaultValue={priceRange}
              max={1000}
              step={10}
              onValueChange={(value) => setPriceRange(value)}
              className="mt-2"
            />
          </div>

          <Separator className="bg-gray-100" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">Duración máxima</h3>
              <span className="text-sm font-medium text-familyxp-primary">{formatDuration(durationRange[0])}</span>
            </div>
            {!isMobileDevice && (
              <p className="text-xs text-gray-500 leading-relaxed">
                Selecciona la duración máxima de la experiencia.
              </p>
            )}
            <Slider
              defaultValue={durationRange}
              max={480}
              step={30}
              onValueChange={(value) => setDurationRange(value)}
              className="mt-2"
            />
          </div>

          <Separator className="bg-gray-100" />

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-800">Categorías</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "secondary"}
                  onClick={() => toggleCategory(category.id)}
                  className={`cursor-pointer transition-all duration-200 px-3 py-1.5 text-sm ${
                    selectedCategories.includes(category.id)
                      ? "bg-familyxp-primary text-white hover:bg-familyxp-primary/90"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-100" />

          <div className="flex items-center justify-between pt-2">
            <Button 
              variant="ghost" 
              onClick={() => {
                resetFilters();
                setIsOpen(false);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Borrar filtros
            </Button>
            <Button 
              onClick={() => setIsOpen(false)}
              className="bg-familyxp-primary hover:bg-familyxp-primary/90"
            >
              Aplicar filtros
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FiltersDropdown;
