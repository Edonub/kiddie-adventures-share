import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ActivityCard from "@/components/ActivityCard";
import MapView from "@/components/map/MapView";
import ViewToggle from "@/components/map/ViewToggle";
import { Filter, MapPin, Sliders, Tag, Users, CalendarDays, DollarSign } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ExplorarPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    locations: [],
    ages: [],
    maxPrice: 100,
    freeOnly: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState("relevancia");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  
  const itemsPerPage = 9;
  
  useEffect(() => {
    // Extract category from query params if present
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
    
    fetchActivities();
  }, [location.search, page, sorting, filters]);
  
  const fetchActivities = async () => {
    setLoading(true);
    try {
      console.log("Fetching activities with filters:", filters);
      
      let query = supabase
        .from("activities")
        .select("*", { count: "exact" });
      
      // Apply filters
      if (filters.categories.length > 0) {
        query = query.in("category", filters.categories);
      }
      
      if (filters.locations.length > 0) {
        query = query.in("location", filters.locations);
      }
      
      if (filters.freeOnly) {
        query = query.eq("price", 0);
      } else if (filters.maxPrice < 100) {
        query = query.lte("price", filters.maxPrice);
      }
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      // Apply sorting
      switch (sorting) {
        case "precio-asc":
          query = query.order("price", { ascending: true });
          break;
        case "precio-desc":
          query = query.order("price", { ascending: false });
          break;
        case "valoracion":
          query = query.order("rating", { ascending: false });
          break;
        default:
          query = query.order("created_at", { ascending: false });
      }
      
      // Pagination
      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      
      const { data, error, count } = await query
        .range(from, to);
      
      if (error) {
        console.error("Error fetching activities:", error);
        throw error;
      }
      
      console.log("Activities fetched:", data);
      setActivities(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error("Error al cargar las actividades");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page on new search
  };
  
  const toggleCategory = (category) => {
    setFilters(prev => {
      const updatedCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories: updatedCategories
      };
    });
    setPage(1); // Reset to first page on filter change
  };
  
  const toggleLocation = (location) => {
    setFilters(prev => {
      const updatedLocations = prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location];
      
      return {
        ...prev,
        locations: updatedLocations
      };
    });
    setPage(1);
  };
  
  const toggleAge = (age) => {
    setFilters(prev => {
      const updatedAges = prev.ages.includes(age)
        ? prev.ages.filter(a => a !== age)
        : [...prev.ages, age];
      
      return {
        ...prev,
        ages: updatedAges
      };
    });
    setPage(1);
  };
  
  const handlePriceChange = (value) => {
    setFilters(prev => ({
      ...prev,
      maxPrice: value[0]
    }));
  };
  
  const toggleFreeOnly = () => {
    setFilters(prev => ({
      ...prev,
      freeOnly: !prev.freeOnly
    }));
    setPage(1);
  };
  
  const handleSortChange = (e) => {
    setSorting(e.target.value);
    setPage(1);
  };
  
  const handleViewChange = (view: "list" | "map") => {
    setViewMode(view);
  };
  
  const handleActivitySelect = (id: string) => {
    navigate(`/actividad/${id}`);
  };
  
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  
  const renderPagination = () => {
    const pages = [];
    
    // Previous button
    pages.push(
      <Button 
        key="prev" 
        variant="outline" 
        className="mx-1"
        disabled={page === 1} 
        onClick={() => setPage(p => Math.max(1, p - 1))}
      >
        Anterior
      </Button>
    );
    
    // Page numbers
    const maxVisiblePages = 3;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button 
          key={i} 
          className="mx-1"
          variant={i === page ? "default" : "outline"}
          onClick={() => setPage(i)}
        >
          {i}
        </Button>
      );
    }
    
    // Next button
    pages.push(
      <Button 
        key="next" 
        variant="outline" 
        className="mx-1"
        disabled={page === totalPages} 
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
      >
        Siguiente
      </Button>
    );
    
    return pages;
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-6">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              {loading ? 'Cargando actividades...' : `${totalCount} ${totalCount === 1 ? 'experiencia encontrada' : 'experiencias encontradas'}`}
            </h1>
            
            <ViewToggle view={viewMode} onViewChange={handleViewChange} />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <SearchBar 
              className="w-full lg:w-2/3" 
              onSearch={handleSearch}
              initialValue={searchQuery}
            />
            
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline" 
              className="flex items-center gap-2 lg:hidden"
            >
              <Filter size={16} />
              Filtros
            </Button>
            
            <div className="flex-1 flex justify-end">
              <select 
                className="p-2 rounded-md border border-gray-300 bg-white"
                value={sorting}
                onChange={handleSortChange}
              >
                <option value="relevancia">Ordenar por: Recomendados</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="valoracion">Mejor valorados</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtros en escritorio */}
            <aside className="w-full lg:w-1/4 hidden lg:block">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Filter size={18} /> Filtros
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Tag size={16} /> Categorías
                    </h4>
                    <div className="space-y-2">
                      {["Aventura", "Gastronomía", "Cultural", "Educativo", "Naturaleza", "Arte", "Acuático"].map(category => (
                        <div key={category} className="flex items-center gap-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={filters.categories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <Label htmlFor={`category-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <MapPin size={16} /> Ubicación
                    </h4>
                    <div className="space-y-2">
                      {["Madrid", "Barcelona", "Valencia", "Sevilla"].map(location => (
                        <div key={location} className="flex items-center gap-2">
                          <Checkbox 
                            id={`location-${location}`} 
                            checked={filters.locations.includes(location)}
                            onCheckedChange={() => toggleLocation(location)}
                          />
                          <Label htmlFor={`location-${location}`}>{location}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Users size={16} /> Edad
                    </h4>
                    <div className="space-y-2">
                      {[
                        { id: "0-3", label: "Hasta 3 años" },
                        { id: "4-7", label: "4 a 7 años" },
                        { id: "8-12", label: "8 a 12 años" },
                        { id: "13+", label: "13+ años" },
                        { id: "todas", label: "Todas las edades" }
                      ].map(age => (
                        <div key={age.id} className="flex items-center gap-2">
                          <Checkbox 
                            id={`age-${age.id}`} 
                            checked={filters.ages.includes(age.id)}
                            onCheckedChange={() => toggleAge(age.id)}
                          />
                          <Label htmlFor={`age-${age.id}`}>{age.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <DollarSign size={16} /> Precio (€)
                    </h4>
                    <div className="space-y-4">
                      <Slider 
                        defaultValue={[filters.maxPrice]} 
                        max={100} 
                        step={1} 
                        onValueChange={handlePriceChange}
                      />
                      <div className="flex justify-between">
                        <span className="text-sm">0€</span>
                        <span className="text-sm">{filters.maxPrice}€</span>
                        <span className="text-sm">100€</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="gratis" 
                          checked={filters.freeOnly}
                          onCheckedChange={toggleFreeOnly}
                        />
                        <Label htmlFor="gratis">Solo gratis</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Filtros en móvil */}
            {showFilters && (
              <div className="fixed inset-0 z-50 lg:hidden bg-white overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Filter size={18} /> Filtros
                    </h3>
                    <Button variant="ghost" onClick={() => setShowFilters(false)}>
                      Cerrar
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[calc(100vh-120px)]">
                    <div className="space-y-6 pr-4">
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                          <Tag size={16} /> Categorías
                        </h4>
                        <div className="space-y-2">
                          {["Aventura", "Gastronomía", "Cultural", "Educativo", "Naturaleza", "Arte", "Acuático"].map(category => (
                            <div key={`m-${category}`} className="flex items-center gap-2">
                              <Checkbox 
                                id={`m-category-${category}`} 
                                checked={filters.categories.includes(category)}
                                onCheckedChange={() => toggleCategory(category)}
                              />
                              <Label htmlFor={`m-category-${category}`}>{category}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                          <MapPin size={16} /> Ubicación
                        </h4>
                        <div className="space-y-2">
                          {["Madrid", "Barcelona", "Valencia", "Sevilla"].map(location => (
                            <div key={`m-${location}`} className="flex items-center gap-2">
                              <Checkbox 
                                id={`m-location-${location}`} 
                                checked={filters.locations.includes(location)}
                                onCheckedChange={() => toggleLocation(location)}
                              />
                              <Label htmlFor={`m-location-${location}`}>{location}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                          <Users size={16} /> Edad
                        </h4>
                        <div className="space-y-2">
                          {[
                            { id: "0-3", label: "Hasta 3 años" },
                            { id: "4-7", label: "4 a 7 años" },
                            { id: "8-12", label: "8 a 12 años" },
                            { id: "13+", label: "13+ años" },
                            { id: "todas", label: "Todas las edades" }
                          ].map(age => (
                            <div key={`m-${age.id}`} className="flex items-center gap-2">
                              <Checkbox 
                                id={`m-age-${age.id}`} 
                                checked={filters.ages.includes(age.id)}
                                onCheckedChange={() => toggleAge(age.id)}
                              />
                              <Label htmlFor={`m-age-${age.id}`}>{age.label}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                          <DollarSign size={16} /> Precio (€)
                        </h4>
                        <div className="space-y-4">
                          <Slider 
                            defaultValue={[filters.maxPrice]} 
                            max={100} 
                            step={1} 
                            onValueChange={handlePriceChange}
                          />
                          <div className="flex justify-between">
                            <span className="text-sm">0€</span>
                            <span className="text-sm">{filters.maxPrice}€</span>
                            <span className="text-sm">100€</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox 
                              id="m-gratis" 
                              checked={filters.freeOnly}
                              onCheckedChange={toggleFreeOnly}
                            />
                            <Label htmlFor="m-gratis">Solo gratis</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  
                  <div className="sticky bottom-0 bg-white pt-4">
                    <Button 
                      onClick={() => setShowFilters(false)}
                      className="w-full bg-familyxp-primary hover:bg-familyxp-secondary"
                    >
                      Aplicar filtros
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Lista o Mapa de actividades */}
            <div className="w-full lg:w-3/4">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
                  ))}
                </div>
              ) : activities.length > 0 ? (
                viewMode === "list" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.map((activity) => (
                      <ActivityCard key={activity.id} {...activity} />
                    ))}
                  </div>
                ) : (
                  <MapView activities={activities} onActivitySelect={handleActivitySelect} />
                )
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No se encontraron actividades</h3>
                  <p className="text-gray-500">Intenta modificar los filtros de búsqueda</p>
                </div>
              )}
              
              {viewMode === "list" && totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  {renderPagination()}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExplorarPage;
