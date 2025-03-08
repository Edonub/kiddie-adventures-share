
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import AirbnbSearchBar from "@/components/AirbnbSearchBar";
import PropertyCard from "@/components/PropertyCard";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Filter, Tag, MapPin, Calendar, Wallet, 
  CreditCard, Clock, Users 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Index = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingType, setBookingType] = useState<"all" | "free" | "paid">("all");
  const [priceRange, setPriceRange] = useState([200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId) 
        : [...prev, categoryId]
    );
  };

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
  }, [bookingType, priceRange, selectedCategories]);

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
            
            <div className="flex flex-wrap items-center justify-between mb-6">
              <CategoryTabs categories={categories} activeCategory="beach" />
              
              <div className="flex space-x-2 mt-4 sm:mt-0">
                {/* Booking Type Selector */}
                <div className="flex rounded-full border border-gray-300 p-1">
                  <Button
                    variant={bookingType === "all" ? "default" : "ghost"} 
                    className="rounded-full text-sm px-4"
                    onClick={() => setBookingType("all")}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={bookingType === "free" ? "default" : "ghost"} 
                    className="rounded-full text-sm px-4"
                    onClick={() => setBookingType("free")}
                  >
                    <Tag className="mr-2 h-4 w-4" />
                    Gratis
                  </Button>
                  <Button
                    variant={bookingType === "paid" ? "default" : "ghost"} 
                    className="rounded-full text-sm px-4"
                    onClick={() => setBookingType("paid")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Reservar
                  </Button>
                </div>
                
                {/* Filters Dropdown */}
                <DropdownMenu open={showFilters} onOpenChange={setShowFilters}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-4">
                    <DropdownMenuLabel>Filtros</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <div className="space-y-4">
                      {/* Price Range */}
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <Wallet className="mr-2 h-4 w-4" /> Precio
                        </h3>
                        <Slider
                          value={priceRange}
                          max={500}
                          step={10}
                          onValueChange={setPriceRange}
                          className="my-4"
                        />
                        <div className="flex justify-between text-sm">
                          <span>0€</span>
                          <span>{priceRange[0]}€</span>
                        </div>
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Categories */}
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <Tag className="mr-2 h-4 w-4" /> Categorías
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {categories.slice(0, 6).map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={() => toggleCategory(category.id)}
                              />
                              <Label htmlFor={`category-${category.id}`} className="text-sm">
                                {category.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Location */}
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <MapPin className="mr-2 h-4 w-4" /> Ubicación
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {['Madrid', 'Barcelona', 'Valencia', 'Sevilla'].map(location => (
                            <div key={location} className="flex items-center space-x-2">
                              <Checkbox id={`location-${location}`} />
                              <Label htmlFor={`location-${location}`} className="text-sm">
                                {location}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Duration */}
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <Clock className="mr-2 h-4 w-4" /> Duración
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {['< 1 hora', '1-3 horas', 'Medio día', 'Día completo'].map(duration => (
                            <div key={duration} className="flex items-center space-x-2">
                              <Checkbox id={`duration-${duration}`} />
                              <Label htmlFor={`duration-${duration}`} className="text-sm">
                                {duration}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Group Size */}
                      <div>
                        <h3 className="text-sm font-medium mb-2 flex items-center">
                          <Users className="mr-2 h-4 w-4" /> Tamaño del grupo
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {['Individual', 'Parejas', 'Pequeño grupo', 'Grupo grande'].map(size => (
                            <div key={size} className="flex items-center space-x-2">
                              <Checkbox id={`size-${size}`} />
                              <Label htmlFor={`size-${size}`} className="text-sm">
                                {size}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedCategories([]);
                        setPriceRange([200]);
                        setBookingType("all");
                      }}>
                        Limpiar
                      </Button>
                      <Button size="sm" onClick={() => setShowFilters(false)}>
                        Aplicar filtros
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
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
