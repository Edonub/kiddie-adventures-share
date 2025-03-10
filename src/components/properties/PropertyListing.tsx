
import React from "react";
import { Property } from "@/data/properties";
import { properties } from "@/data/properties";

interface PropertyListingProps {
  bookingType: "all" | "free" | "paid";
  priceRange: number[];
  selectedCategories: string[];
  durationRange: number[];
  adults?: number;
  childrenDetails?: { id: number; age: number }[];
}

const PropertyListing = ({ 
  bookingType, 
  priceRange,
  selectedCategories,
  durationRange,
  adults = 1,
  childrenDetails = []
}: PropertyListingProps) => {
  
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
      
      // Filter by duration (assuming properties have duration in minutes)
      const propertyDuration = property.duration || 120; // Default to 2h if not specified
      if (propertyDuration > durationRange[0]) return false;
      
      return true;
    });
  
  const formatDuration = (minutes: number) => {
    if (!minutes) return "Duración no especificada";
    if (minutes < 60) {
      return `${minutes} minutos`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours}h ${remainingMinutes}min` 
        : `${hours} horas`;
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map(property => (
        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img className="w-full h-48 object-cover" src={property.image} alt={property.title} />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
            <div className="mt-2 flex flex-col gap-1">
              <span className="text-xl font-bold text-familyxp-primary">
                {property.price === 0 ? "Gratis" : `${property.price}€`}
              </span>
              <span className="text-sm text-gray-600">
                {formatDuration(property.duration || 0)}
              </span>
              {property.is_available ? (
                <span className="text-green-500 text-sm">Disponible</span>
              ) : (
                <span className="text-red-500 text-sm">No Disponible</span>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {filteredProperties.length === 0 && (
        <div className="col-span-3 text-center py-8">
          <p className="text-gray-600 text-lg">No se encontraron experiencias que coincidan con tus criterios.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;
