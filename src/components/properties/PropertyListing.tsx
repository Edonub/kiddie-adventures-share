
import React from "react";
import { Property } from "@/data/properties";
import { properties } from "@/data/properties";

interface Child {
  id: number;
  age: number;
}

interface PropertyListingProps {
  bookingType: "all" | "free" | "paid";
  priceRange: number[];
  selectedCategories: string[];
  adults?: number;
  childrenDetails?: Child[];
}

const PropertyListing = ({ 
  bookingType, 
  priceRange,
  selectedCategories,
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
      
      // Filter by capacity for adults
      const adultsCapacity = property.adults_capacity || 2; // Default to 2 if not specified
      if (adults > adultsCapacity) return false;
      
      // Filter by capacity for children
      const childrenCapacity = property.children_capacity || 0; // Default to 0 if not specified
      if (childrenDetails.length > childrenCapacity) return false;
      
      return true;
    });
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map(property => (
        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img className="w-full h-48 object-cover" src={property.image} alt={property.title} />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xl font-bold text-familyxp-primary">
                {property.price === 0 ? "Gratis" : `${property.price}€/noche`}
              </span>
              {property.is_available ? (
                <span className="text-green-500">Disponible</span>
              ) : (
                <span className="text-red-500">No Disponible</span>
              )}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span>Capacidad: {property.adults_capacity} adultos, {property.children_capacity} niños</span>
            </div>
          </div>
        </div>
      ))}
      
      {filteredProperties.length === 0 && (
        <div className="col-span-3 text-center py-8">
          <p className="text-gray-600 text-lg">No se encontraron propiedades que coincidan con tus criterios.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;
