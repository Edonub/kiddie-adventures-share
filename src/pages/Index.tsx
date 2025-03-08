
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import AirbnbSearchBar from "@/components/AirbnbSearchBar";
import PropertyCard from "@/components/PropertyCard";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "beach", name: "A pie de playa", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "playa" },
    { id: "iconic", name: "Iconos", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "iconos" },
    { id: "castles", name: "Castillos", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "castillos" },
    { id: "tiny", name: "Minicasas", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "minicasas" },
    { id: "famous", name: "Ciudades famosas", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "ciudades-famosas" },
    { id: "piano", name: "Pianos de cola", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "pianos" },
    { id: "rural", name: "Casas rurales", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "rural" },
    { id: "cabins", name: "Cabañas", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "cabanas" },
    { id: "mansions", name: "Mansiones", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "mansiones" },
    { id: "dome", name: "Casas domo", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "domo" },
    { id: "tree", name: "Casas del árbol", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "arbol" },
    { id: "unique", name: "Singulares", icon: "/lovable-uploads/48a3679d-a4b8-45a3-8799-59c0c9cb234d.png", slug: "singulares" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch activities from Supabase to use as mock "properties"
        const { data, error } = await supabase
          .from("activities")
          .select("*")
          .order('created_at', { ascending: false });

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
          images: [
            "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFkcmlkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          ]
        }));
        
        setProperties(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sample properties for illustration if no data is available
  const sampleProperties = [
    {
      id: "1",
      title: "Platja de Nules",
      location: "España",
      host: "María Del Carmen",
      dates: "8-13 mar",
      price: 231,
      rating: 4.92,
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      ]
    },
    {
      id: "2",
      title: "El Puig de Santa Maria",
      location: "España",
      host: "Ellen",
      dates: "16-21 mar",
      price: 188,
      rating: 4.9,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      ]
    },
    {
      id: "3",
      title: "Valencia",
      location: "España",
      host: "Elena",
      dates: "8-13 mar",
      price: 175,
      rating: 4.91,
      images: [
        "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      ]
    },
    {
      id: "4",
      title: "Casablanca",
      location: "España",
      host: "Angeles",
      dates: "10-15 mar",
      price: 114,
      rating: 5.0,
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      ]
    }
  ];

  const displayProperties = properties.length > 0 ? properties : sampleProperties;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="pt-4 pb-8 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="pt-4 pb-8">
              <AirbnbSearchBar />
            </div>
            
            <CategoryTabs categories={categories} activeCategory="beach" />
            
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
