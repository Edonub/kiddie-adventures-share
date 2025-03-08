
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import AirbnbSearchBar from "@/components/AirbnbSearchBar";
import { categories } from "@/data/categories";
import FiltersSection from "@/components/filters/FiltersSection";
import PropertyListing from "@/components/properties/PropertyListing";

const Index = () => {
  const [bookingType, setBookingType] = useState<"all" | "free" | "paid">("all");
  const [priceRange, setPriceRange] = useState([200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId) 
        : [...prev, categoryId]
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="pt-4 pb-8 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="pt-4 pb-8">
              <AirbnbSearchBar />
            </div>
            
            <div className="flex flex-wrap items-center justify-between mb-6">
              <CategoryTabs categories={categories} activeCategory="beach" />
              
              <FiltersSection 
                categories={categories}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                bookingType={bookingType}
                setBookingType={setBookingType}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
            
            <PropertyListing 
              bookingType={bookingType}
              priceRange={priceRange}
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
