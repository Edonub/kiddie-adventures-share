
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

const Index = () => {
  const [bookingType, setBookingType] = useState<"all" | "free" | "paid">("all");
  const [priceRange, setPriceRange] = useState([200]);
  const [durationRange, setDurationRange] = useState([180]); // Default 3 hours max
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const isMobile = useIsMobile();

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId) 
        : [...prev, categoryId]
    );
  };

  // Filter properties
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
      
      return true;
    });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-2 w-full overflow-x-hidden">
        <div className="px-2">
          <div className="max-w-screen-xl mx-auto">
            {/* Search Bar */}
            <div className="py-2 px-2 bg-white rounded-xl shadow-sm mb-1">
              <AirbnbSearchBar />
            </div>
            
            {/* Categories and Filters */}
            <div className="bg-white rounded-xl shadow-sm px-2 py-2 mb-1">
              <div className="w-full overflow-x-auto scrollbar-none mb-1">
                <CategoryTabs categories={categories} activeCategory="beach" />
              </div>
              
              <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-1 justify-between">
                <FiltersSection 
                  categories={categories}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  bookingType={bookingType}
                  setBookingType={setBookingType}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  durationRange={durationRange}
                  setDurationRange={setDurationRange}
                />
                
                <div className="ml-auto">
                  <ViewSwitcher view={viewMode} onViewChange={setViewMode} />
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm p-2">
              {viewMode === 'list' ? (
                <PropertyListing 
                  bookingType={bookingType}
                  priceRange={priceRange}
                  selectedCategories={selectedCategories}
                  durationRange={durationRange}
                />
              ) : (
                <MapSearch filteredProperties={filteredProperties} />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
