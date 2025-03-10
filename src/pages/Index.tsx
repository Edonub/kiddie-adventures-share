
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import AirbnbSearchBar from "@/components/AirbnbSearchBar";
import { categories } from "@/data/categories";
import FiltersSection from "@/components/filters/FiltersSection";
import PropertyListing from "@/components/properties/PropertyListing";
import MapSearch from "@/components/map/MapSearch";
import ViewSwitcher from "@/components/map/ViewSwitcher";
import { properties } from "@/data/properties";
import { useIsMobile } from "@/hooks/use-mobile";

interface Child {
  id: number;
  age: number;
}

const Index = () => {
  const [bookingType, setBookingType] = useState<"all" | "free" | "paid">("all");
  const [priceRange, setPriceRange] = useState([200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [adults, setAdults] = useState(1);
  const [childrenDetails, setChildrenDetails] = useState<Child[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const isMobile = useIsMobile();

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId) 
        : [...prev, categoryId]
    );
  };

  // Filter properties (same logic as in PropertyListing component)
  const filteredProperties = properties
    .filter(property => {
      // Filter by booking type (free, paid, all)
      if (bookingType === 'free' && property.price > 0) return false;
      if (bookingType === 'paid' && property.price === 0) return false;
      
      // Filter by price range
      if (property.price > priceRange[0]) return false;
      
      // Filter by categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(property.category)) {
        return false;
      }
      
      // Filter by capacity for adults
      const adultsCapacity = property.adults_capacity || 2;
      if (adults > adultsCapacity) return false;
      
      // Filter by capacity for children
      const childrenCapacity = property.children_capacity || 0;
      if (childrenDetails.length > childrenCapacity) return false;
      
      return true;
    });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-14 w-full overflow-x-hidden"> {/* Added overflow-x-hidden to prevent horizontal scroll */}
        <div className="pb-8 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className={`pt-${isMobile ? '1' : '4'} pb-${isMobile ? '4' : '8'}`}>
              <AirbnbSearchBar />
            </div>
            
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="w-full overflow-x-auto scrollbar-none pb-2"> {/* Added width control and hidden scrollbar */}
                <CategoryTabs categories={categories} activeCategory="beach" />
              </div>
              
              <div className="w-full mt-2"> {/* Added width control */}
                <FiltersSection 
                  categories={categories}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  bookingType={bookingType}
                  setBookingType={setBookingType}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  adults={adults}
                  setAdults={setAdults}
                  childrenDetails={childrenDetails}
                  setChildrenDetails={setChildrenDetails}
                />
              </div>
            </div>
            
            <ViewSwitcher view={viewMode} onViewChange={setViewMode} />
            
            {viewMode === 'list' ? (
              <PropertyListing 
                bookingType={bookingType}
                priceRange={priceRange}
                selectedCategories={selectedCategories}
                adults={adults}
                childrenDetails={childrenDetails}
              />
            ) : (
              <MapSearch filteredProperties={filteredProperties} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
