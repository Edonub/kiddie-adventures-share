
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
import CategoryList from "@/components/CategoryList";
import PropertyCard from "@/components/PropertyCard";
import { samplePlans } from "@/components/plans/types";
import { ActivityProps } from "@/components/ActivityCard";
import ActivityCard from "@/components/ActivityCard";

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

  // Sample activities for showcase
  const sampleActivities: ActivityProps[] = [
    {
      id: "1",
      title: "Taller de Cocina para Niños",
      location: "Madrid Centro",
      category: "Gastronómico",
      price: 25,
      rating: 4.8,
      reviewCount: 45,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      ageRange: "4-12 años",
      isPremium: true,
      description: "Aprende a cocinar platos divertidos con tu familia"
    },
    {
      id: "2",
      title: "Excursión a la Sierra",
      location: "Sierra de Guadarrama",
      category: "Al aire libre",
      price: 0,
      rating: 4.5,
      reviewCount: 32,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      ageRange: "Todas las edades"
    },
    {
      id: "3",
      title: "Visita al Museo de Ciencias",
      location: "Museo Nacional",
      category: "Cultural",
      price: 12,
      rating: 4.7,
      reviewCount: 56,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      ageRange: "6-16 años"
    },
    {
      id: "4",
      title: "Taller de Programación",
      location: "Centro Tecnológico",
      category: "Educativo",
      price: 30,
      rating: 4.9,
      reviewCount: 28,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      ageRange: "10-16 años"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-1 w-full overflow-x-hidden">
        <div className="px-2 mt-0.5">
          <div className="max-w-screen-xl mx-auto">
            <div className="py-1 px-2 bg-white rounded-xl shadow-sm mb-1.5">
              <AirbnbSearchBar />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm px-2 py-0.5 mb-1.5">
              <div className="w-full overflow-x-auto scrollbar-none mb-0">
                <CategoryTabs categories={categories} activeCategory="beach" />
              </div>
              
              <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between">
                {isMobile ? (
                  <>
                    <div className="flex items-center w-full mt-0">
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
            
            <div className="bg-white rounded-xl shadow-sm p-2 mb-4">
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
            
            {/* Planes Recomendados Section */}
            <CategoryList title="Planes Recomendados" seeAllLink="/planes">
              {samplePlans.slice(0, 4).map((plan) => (
                <PropertyCard 
                  key={plan.id}
                  id={plan.id.toString()}
                  title={plan.title}
                  images={[plan.image_url]}
                  location={plan.location || ""}
                  host={"Anfitrión"}
                  dates={"Fechas disponibles"}
                  price={plan.price || 0}
                  rating={4.5}
                />
              ))}
            </CategoryList>
            
            {/* Actividades para Familias Section */}
            <CategoryList title="Actividades para Familias" seeAllLink="/explorar">
              {sampleActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                />
              ))}
            </CategoryList>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
