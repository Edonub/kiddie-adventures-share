
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ActivityCard from "@/components/ActivityCard";
import { Filter, MapPin, Sliders, Tag, Users, CalendarDays, DollarSign } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const activities = [
  {
    id: "1",
    title: "Taller de cocina familiar: ¡Ricos churros!",
    location: "Madrid",
    category: "Gastronomía",
    price: 15,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1626803775151-61d756612f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2h1cnJvc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    ageRange: "4-12 años",
  },
  {
    id: "2",
    title: "Aventura en el bosque: Escapada del tesoro",
    location: "Barcelona",
    category: "Aventura",
    price: 0,
    rating: 4.9,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    ageRange: "Todas las edades",
  },
  {
    id: "3",
    title: "Visita guiada: Museo interactivo para niños",
    location: "Valencia",
    category: "Cultural",
    price: 12,
    rating: 4.7,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1468131965815-992b740c51c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoaWxkcmVuJTIwbXVzZXVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    ageRange: "3-12 años",
  },
  {
    id: "4",
    title: "Taller de ciencia: Experimentos asombrosos",
    location: "Sevilla",
    category: "Educativo",
    price: 20,
    rating: 4.9,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2NpZW5jZSUyMGV4cGVyaW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    ageRange: "5-14 años",
    isPremium: true,
  },
  {
    id: "5",
    title: "Excursión al lago para familias",
    location: "Madrid",
    category: "Naturaleza",
    price: 8,
    rating: 4.5,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFrZSUyMGZhbWlseXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    ageRange: "Todas las edades",
  },
  {
    id: "6",
    title: "Clase de yoga para padres e hijos",
    location: "Barcelona",
    category: "Deporte",
    price: 18,
    rating: 4.6,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW9nYSUyMGNoaWxkcmVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    ageRange: "4-12 años",
  },
  {
    id: "7",
    title: "Taller de pintura: Crea tu obra maestra",
    location: "Valencia",
    category: "Arte",
    price: 15,
    rating: 4.9,
    reviewCount: 65,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbGRyZW4lMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    ageRange: "3-12 años",
  },
  {
    id: "8",
    title: "Aventura de escalada en árbol para familias",
    location: "Madrid",
    category: "Aventura",
    price: 25,
    rating: 4.8,
    reviewCount: 73,
    image: "https://images.unsplash.com/photo-1502418606274-177739f6eaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xpbWJpbmclMjB0cmVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    ageRange: "6+ años",
    isPremium: true,
  },
];

const ExplorarPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-6">
        <div className="container px-4 mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            8 experiencias encontradas
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <SearchBar className="w-full lg:w-2/3" />
            
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline" 
              className="flex items-center gap-2 lg:hidden"
            >
              <Filter size={16} />
              Filtros
            </Button>
            
            <div className="flex-1 flex justify-end">
              <select className="p-2 rounded-md border border-gray-300 bg-white">
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
                      <div className="flex items-center gap-2">
                        <Checkbox id="aventura" />
                        <Label htmlFor="aventura">Aventura</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="gastronomia" />
                        <Label htmlFor="gastronomia">Gastronomía</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="cultural" />
                        <Label htmlFor="cultural">Cultural</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="educativo" />
                        <Label htmlFor="educativo">Educativo</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="naturaleza" />
                        <Label htmlFor="naturaleza">Naturaleza</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="arte" />
                        <Label htmlFor="arte">Arte</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <MapPin size={16} /> Ubicación
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="madrid" />
                        <Label htmlFor="madrid">Madrid</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="barcelona" />
                        <Label htmlFor="barcelona">Barcelona</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="valencia" />
                        <Label htmlFor="valencia">Valencia</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="sevilla" />
                        <Label htmlFor="sevilla">Sevilla</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <Users size={16} /> Edad
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="0-3" />
                        <Label htmlFor="0-3">Hasta 3 años</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="4-7" />
                        <Label htmlFor="4-7">4 a 7 años</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="8-12" />
                        <Label htmlFor="8-12">8 a 12 años</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="13+" />
                        <Label htmlFor="13+">13+ años</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="todas" />
                        <Label htmlFor="todas">Todas las edades</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                      <DollarSign size={16} /> Precio (€)
                    </h4>
                    <div className="space-y-4">
                      <Slider defaultValue={[35]} max={100} step={1} />
                      <div className="flex justify-between">
                        <span className="text-sm">0€</span>
                        <span className="text-sm">35€</span>
                        <span className="text-sm">100€</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="gratis" />
                        <Label htmlFor="gratis">Solo gratis</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Button className="w-full bg-familyxp-primary hover:bg-familyxp-secondary">
                      Aplicar filtros
                    </Button>
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
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-aventura" />
                            <Label htmlFor="m-aventura">Aventura</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-gastronomia" />
                            <Label htmlFor="m-gastronomia">Gastronomía</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-cultural" />
                            <Label htmlFor="m-cultural">Cultural</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-educativo" />
                            <Label htmlFor="m-educativo">Educativo</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-naturaleza" />
                            <Label htmlFor="m-naturaleza">Naturaleza</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-arte" />
                            <Label htmlFor="m-arte">Arte</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                          <MapPin size={16} /> Ubicación
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-madrid" />
                            <Label htmlFor="m-madrid">Madrid</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-barcelona" />
                            <Label htmlFor="m-barcelona">Barcelona</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-valencia" />
                            <Label htmlFor="m-valencia">Valencia</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-sevilla" />
                            <Label htmlFor="m-sevilla">Sevilla</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                          <Users size={16} /> Edad
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-0-3" />
                            <Label htmlFor="m-0-3">Hasta 3 años</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-4-7" />
                            <Label htmlFor="m-4-7">4 a 7 años</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-8-12" />
                            <Label htmlFor="m-8-12">8 a 12 años</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-13+" />
                            <Label htmlFor="m-13+">13+ años</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-todas" />
                            <Label htmlFor="m-todas">Todas las edades</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
                          <DollarSign size={16} /> Precio (€)
                        </h4>
                        <div className="space-y-4">
                          <Slider defaultValue={[35]} max={100} step={1} />
                          <div className="flex justify-between">
                            <span className="text-sm">0€</span>
                            <span className="text-sm">35€</span>
                            <span className="text-sm">100€</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="m-gratis" />
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
            
            {/* Lista de actividades */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} {...activity} />
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mx-2">Anterior</Button>
                <Button className="mx-2 bg-familyxp-primary hover:bg-familyxp-secondary">1</Button>
                <Button variant="outline" className="mx-2">2</Button>
                <Button variant="outline" className="mx-2">3</Button>
                <Button variant="outline" className="mx-2">Siguiente</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExplorarPage;
