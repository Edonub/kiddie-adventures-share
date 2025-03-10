import { useState } from "react";
import { FilterX, Plus, Minus } from "lucide-react";
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
import { Input } from "../ui/input";

interface Child {
  id: number;
  age: number;
}

interface FiltersSectionProps {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (categoryId: string) => void;
  bookingType: "all" | "free" | "paid";
  setBookingType: (type: "all" | "free" | "paid") => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
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
}: {
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adultsCount, setAdultsCount] = useState(adults);
  const [childAge, setChildAge] = useState<number>(2);
  const [nextChildId, setNextChildId] = useState<number>(1);
  const [childrenDetailsState, setChildrenDetailsState] = useState<Child[]>(childrenDetails);

  const updateAdults = (count: number) => {
    setAdultsCount(count);
    setAdults(count);
  };

  const addChild = () => {
    const newChild = { id: nextChildId, age: childAge };
    setChildrenDetailsState([...childrenDetailsState, newChild]);
    setChildrenDetails([...childrenDetailsState, newChild]);
    setNextChildId(nextChildId + 1);
    setChildAge(2); // Reset age input for next child
  };

  const removeChild = (id: number) => {
    const updatedChildren = childrenDetailsState.filter(child => child.id !== id);
    setChildrenDetailsState(updatedChildren);
    setChildrenDetails(updatedChildren);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FilterX className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium">Precio máximo por noche</h3>
            <p className="text-xs text-gray-500">
              Selecciona el precio máximo que estás dispuesto a pagar por noche.
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

          {/* Guests */}
          <div>
            <h3 className="text-sm font-medium">Huéspedes</h3>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500">Adultos (mayores de 13 años)</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => updateAdults(Math.max(1, adultsCount - 1))}
                  disabled={adultsCount <= 1}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-5 text-center">{adultsCount}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => updateAdults(adultsCount + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500">Niños (0-12 años)</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-5 text-center">{childrenDetailsState.length}</span>
              </div>
            </div>

            {/* Lista de niños con sus edades */}
            <div className="space-y-2 mt-2">
              {childrenDetailsState.map((child) => (
                <div key={child.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">{child.age} años</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeChild(child.id)}
                  >
                    <FilterX size={14} />
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
                  onChange={(e) => setChildAge(parseInt(e.target.value) || 0)}
                  className="w-full text-sm"
                  placeholder="Edad"
                />
              </div>
              <Button
                variant="outline"
                onClick={addChild}
                className="whitespace-nowrap text-sm"
              >
                <Plus size={14} className="mr-1" />
                Añadir
              </Button>
            </div>
          </div>

          <Separator />

          {/* Reset and Apply buttons */}
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => {
              resetFilters();
              setAdultsCount(1);
              setChildrenDetailsState([]);
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
