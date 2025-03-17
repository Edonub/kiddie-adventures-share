
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
import FiltersDropdown from "@/components/filters/FiltersDropdown";

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

  const filteredProperties = properties
    .filter(property => {
      if (bookingType === 'free' && property.price > 0) return false;
      if (bookingType === 'paid' && property.price === 0) return false;
      
      if (property.price > priceRange[0]) return false;
      
      if (selectedCategories.length > 0 && !selectedCategories.includes(property.category)) {
        return false;
      }
      
      return true;
    });

  const resetFilters = () => {
    setPriceRange([200]);
    setDurationRange([180]);
    setBookingType("all");
    selectedCategories.forEach(cat => toggleCategory(cat));
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-1 w-full overflow-x-hidden">
        <div className="px-2 mt-1">
          <div className="max-w-screen-xl mx-auto">
            <div className="py-1 px-2 bg-white rounded-xl shadow-sm mb-2">
              <AirbnbSearchBar />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm px-2 py-1 mb-2">
              <div className="w-full overflow-x-auto scrollbar-none mb-0.5">
                <CategoryTabs categories={categories} activeCategory="beach" />
              </div>
              
              <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between">
                {isMobile ? (
                  <>
                    <div className="flex items-center w-full mt-0.5">
                      <div className="flex-shrink-0 mr-2">
                        <ViewSwitcher view={viewMode} onViewChange={setViewMode} />
                      </div>
                      <div className="flex-grow flex justify-end">
                        <FiltersDropdown 
                          categories={categories}
                          selectedCategories={selectedCategories}
                          toggleCategory={toggleCategory}
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                          durationRange={durationRange}
                          setDurationRange={setDurationRange}
                          resetFilters={resetFilters}
                          isMobile={isMobile}
                          bookingType={bookingType}
                          setBookingType={setBookingType}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-grow flex items-center gap-2">
                      <ViewSwitcher view={viewMode} onViewChange={setViewMode} />
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
                  </>
                )}
              </div>
            </div>
            
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
