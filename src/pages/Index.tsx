
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
    { id: "beach", name: "A pie de playa", icon: "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg", slug: "playa" },
    { id: "iconic", name: "Iconos", icon: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg", slug: "iconos" },
    { id: "castles", name: "Castillos", icon: "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg", slug: "castillos" },
    { id: "tiny", name: "Minicasas", icon: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg", slug: "minicasas" },
    { id: "famous", name: "Ciudades famosas", icon: "https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg", slug: "ciudades-famosas" },
    { id: "piano", name: "Pianos de cola", icon: "https://a0.muscache.com/pictures/8eccb972-4bd6-43c5-ac83-27822c0d3dcd.jpg", slug: "pianos" },
    { id: "rural", name: "Casas rurales", icon: "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg", slug: "rural" },
    { id: "cabins", name: "Cabañas", icon: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg", slug: "cabanas" },
    { id: "mansions", name: "Mansiones", icon: "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg", slug: "mansiones" },
    { id: "dome", name: "Casas domo", icon: "https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg", slug: "domo" },
    { id: "tree", name: "Casas del árbol", icon: "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg", slug: "arbol" },
    { id: "unique", name: "Singulares", icon: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg", slug: "singulares" },
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
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2075&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2070&q=80"
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

  // Sample properties with better images for illustration if no data is available
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
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=2070&q=80"
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
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2075&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2070&q=80"
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
        "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=2127&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2070&q=80"
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
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2071&q=80",
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=2070&q=80"
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
