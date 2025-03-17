
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import type { Plan } from "@/components/plans/types";

const PodcastPage = () => {
  const [podcastEpisodes, setPodcastEpisodes] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPodcastEpisodes();
  }, []);

  const fetchPodcastEpisodes = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual API call in production
      setTimeout(() => {
        // Sample podcast episodes
        const samplePodcastEpisodes: Plan[] = [
          { 
            id: 1, 
            title: "Educación emocional en la familia", 
            category: "Desarrollo", 
            image_url: "https://images.unsplash.com/photo-1589903308904-1010c2294adc", 
            location: "Episodio 1",
            price: 0
          },
          { 
            id: 2, 
            title: "Límites y disciplina positiva", 
            category: "Crianza", 
            image_url: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618", 
            location: "Episodio 2",
            price: 0
          },
          { 
            id: 3, 
            title: "Alimentación saludable en familia", 
            category: "Salud", 
            image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", 
            location: "Episodio 3",
            price: 0
          },
          { 
            id: 4, 
            title: "Actividades de verano para niños", 
            category: "Ocio", 
            image_url: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef", 
            location: "Episodio 4",
            price: 0
          }
        ];
        setPodcastEpisodes(samplePodcastEpisodes);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching podcast episodes:', error);
      toast({
        title: "Error al cargar los episodios",
        description: "No se pudieron cargar los episodios. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
      setPodcastEpisodes([]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pb-12">
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-familyxp-primary mb-2">Podcast Familiar</h1>
          </div>
        </div>
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-familyxp-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {podcastEpisodes.map((episode) => (
                  <div key={episode.id}>
                    <PropertyCard 
                      id={episode.id.toString()}
                      title={episode.title}
                      images={[episode.image_url]}
                      location={episode.location || ""}
                      host={"Productor"}
                      dates={"Disponible ahora"}
                      price={0}
                      rating={4.5}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PodcastPage;
