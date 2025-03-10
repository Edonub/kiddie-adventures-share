
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
      
      <main className="flex-1 pt-14 w-full overflow-x-hidden">
        <div className="pb-8 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="pt-4 pb-6 bg-white rounded-lg shadow-sm px-4 my-4">
              <AirbnbSearchBar />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="w-full overflow-x-auto scrollbar-none">
                <CategoryTabs categories={categories} activeCategory="beach" />
              </div>
              
              <div className="w-full flex flex-wrap md:flex-nowrap justify-between items-center mt-4 gap-3">
                <div className="w-full md:w-auto">
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
                </div>
                
                <div className="ml-auto">
                  <ViewSwitcher view={viewMode} onViewChange={setViewMode} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
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
