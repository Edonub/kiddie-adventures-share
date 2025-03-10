
import React from "react";
import { Property } from "@/data/properties";
import { properties } from "@/data/properties";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyListingProps {
  bookingType: "all" | "free" | "paid";
  priceRange: number[];
  selectedCategories: string[];
  durationRange: number[];
}

const PropertyListing = ({ 
  bookingType, 
  priceRange,
  selectedCategories,
  durationRange
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
      
      // Duration filtering - assume default duration if not specified
      // Note: This is a temporary fix - the Property type should be updated 
      // to include duration as a proper field
      const propertyDuration = 
        'duration' in property ? (property as any).duration : 120; // Default to 2h if not specified
      if (propertyDuration > durationRange[0]) return false;
      
      return true;
    });
  
  const formatDuration = (minutes: number | undefined) => {
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
        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="relative">
            <img className="w-full h-48 object-cover" src={property.image} alt={property.title} />
            <Badge className="absolute top-3 left-3 bg-white/90 text-familyxp-primary hover:bg-white">
              {property.category}
            </Badge>
            {property.price === 0 && (
              <Badge className="absolute top-3 right-3 bg-familyxp-success text-white">
                Gratis
              </Badge>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{property.title}</h3>
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin size={14} className="mr-1" />
              <p className="text-sm">{property.location}</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                {property.price > 0 && (
                  <span className="text-xl font-bold text-familyxp-primary">{property.price}€</span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={14} className="mr-1" />
                {formatDuration('duration' in property ? (property as any).duration : undefined)}
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              {property.is_available ? (
                <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">Disponible</Badge>
              ) : (
                <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">No Disponible</Badge>
              )}
              <button className="text-familyxp-primary hover:text-familyxp-secondary font-medium text-sm flex items-center">
                Ver detalles <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {filteredProperties.length === 0 && (
        <div className="col-span-3 text-center py-12 px-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg">No se encontraron experiencias que coincidan con tus criterios.</p>
          <p className="text-gray-500 mt-2">Prueba a ajustar los filtros para ver más opciones.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;
