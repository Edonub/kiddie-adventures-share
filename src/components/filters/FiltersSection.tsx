
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SlidersHorizontal } from "lucide-react";
import BookingTypeSelector from "./BookingTypeSelector";
import FiltersDropdown from "./FiltersDropdown";
import { Category } from "@/data/categories";
import { Button } from "@/components/ui/button";

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

const FiltersSection = ({
  categories,
  selectedCategories,
  toggleCategory,
  bookingType,
  setBookingType,
  priceRange,
  setPriceRange,
  adults = 1,
  setAdults = () => {},
  childrenDetails = [],
  setChildrenDetails = () => {}
}: FiltersSectionProps) => {
  const isMobile = useIsMobile();
  
  const resetFilters = () => {
    setPriceRange([200]);
    setBookingType("all");
    setAdults(1);
    setChildrenDetails([]);
    // Reset selected categories by passing an empty array to a parent component function
    selectedCategories.forEach(cat => toggleCategory(cat));
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
      <BookingTypeSelector 
        bookingType={bookingType}
        setBookingType={setBookingType}
      />
      
      <FiltersDropdown
        categories={categories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        resetFilters={resetFilters}
        adults={adults}
        setAdults={setAdults}
        childrenDetails={childrenDetails}
        setChildrenDetails={setChildrenDetails}
        isMobile={isMobile}
      />
    </div>
  );
};

export default FiltersSection;
