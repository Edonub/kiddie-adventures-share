
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import PropertyCard from "@/components/PropertyCard";

interface Property {
  id: string;
  title: string;
  location: string;
  host: string;
  dates: string;
  price: number;
  rating: number;
  images: string[];
  adults_capacity?: number;
  children_capacity?: number;
}

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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Build query with filters
        let query = supabase
          .from("activities")
          .select("*")
          .order('created_at', { ascending: false });
        
        // Apply booking type filter
        if (bookingType === "free") {
          query = query.eq("price", 0);
        } else if (bookingType === "paid") {
          query = query.gt("price", 0);
        }
        
        // Apply price range filter if not free only
        if (bookingType !== "free") {
          query = query.lte("price", priceRange[0]);
        }
        
        // Apply category filter if any selected
        if (selectedCategories.length > 0) {
          query = query.in("category", selectedCategories);
        }
        
        // Apply adults capacity filter if specified
        if (adults > 1) {
          query = query.gte("adults_capacity", adults);
        }
        
        // Apply children capacity filter if any children
        if (childrenDetails.length > 0) {
          query = query.gte("children_capacity", childrenDetails.length);
        }
        
        const { data, error } = await query;

        if (error) throw error;
        
        // Transform the data to match what we need for PropertyCard
        const transformedData = data.map(item => ({
          id: item.id,
          title: item.title || "Alojamiento en la playa",
          location: item.location || "España",
          host: item.creator_name || "María Del Carmen",
          dates: "8-13 mar",
          price: item.price || Math.floor(Math.random() * 200) + 100,
          rating: item.rating || (4 + Math.random()),
          adults_capacity: item.adults_capacity || Math.floor(Math.random() * 6) + 1,
          children_capacity: item.children_capacity || Math.floor(Math.random() * 4),
          images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2075&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2070&q=80"
          ]
        }));
        
        // Additional client-side filtering for specific children ages
        let filteredData = transformedData;
        
        // If we have children with specific ages, we should filter properties that can accommodate them
        // This would normally be done in the database, but we're simulating it client-side
        if (childrenDetails.length > 0) {
          // For this example, we'll just filter based on the number of children
          // In a real application, you might have age ranges for each property
          filteredData = filteredData.filter(property => 
            property.children_capacity !== undefined && 
            property.children_capacity >= childrenDetails.length
          );
        }
        
        setProperties(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingType, priceRange, selectedCategories, adults, childrenDetails]);

  // Sample properties with better images for illustration if no data is available
  const sampleProperties = [
    {
      id: "1",
      title: "Villa de lujo con piscina",
      location: "Marbella, España",
      host: "María",
      dates: "8-13 mar",
      price: 231,
      rating: 4.92,
      adults_capacity: 4,
      children_capacity: 2,
      images: [
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2064&q=80"
      ]
    },
    {
      id: "2",
      title: "Apartamento con vistas al mar",
      location: "Valencia, España",
      host: "Ellen",
      dates: "16-21 mar",
      price: 188,
      rating: 4.9,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2075&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2070&q=80"
      ]
    },
    {
      id: "3",
      title: "Casa histórica en el centro",
      location: "Sevilla, España",
      host: "Elena",
      dates: "8-13 mar",
      price: 175,
      rating: 4.91,
      images: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2084&q=80",
        "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=2013&q=80"
      ]
    },
    {
      id: "4",
      title: "Cabaña junto al lago",
      location: "Asturias, España",
      host: "Angeles",
      dates: "10-15 mar",
      price: 114,
      rating: 5.0,
      images: [
        "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=2070&q=80"
      ]
    }
  ];

  // Apply filters to sample properties if needed
  let displayProperties = properties.length > 0 ? properties : sampleProperties.filter(property => {
    // Apply adult capacity filter
    if (adults > 1 && (!property.adults_capacity || property.adults_capacity < adults)) {
      return false;
    }
    
    // Apply children filter
    if (childrenDetails.length > 0 && (!property.children_capacity || property.children_capacity < childrenDetails.length)) {
      return false;
    }
    
    return true;
  });

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-xl mb-3"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      )}
    </>
  );
};

export default PropertyListing;
