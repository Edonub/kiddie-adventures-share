
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import PlanCategories from "@/components/plans/PlanCategories";
import type { Plan } from "@/components/plans/types";

const SaludPage = () => {
  const [healthPlans, setHealthPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchHealthPlans();
  }, []);

  const fetchHealthPlans = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual API call in production
      setTimeout(() => {
        // Sample health-related plans
        const sampleHealthPlans: Plan[] = [
          { 
            id: 1, 
            title: "Taller de nutrición infantil", 
            category: "Nutrición", 
            image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", 
            location: "Centro de Salud Familiar",
            price: 15
          },
          { 
            id: 2, 
            title: "Yoga para familias", 
            category: "Bienestar", 
            image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", 
            location: "Parque Central",
            price: 10
          },
          { 
            id: 3, 
            title: "Charla sobre primeros auxilios", 
            category: "Seguridad", 
            image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", 
            location: "Hospital Comunitario",
            price: 0
          },
          { 
            id: 4, 
            title: "Taller de salud emocional", 
            category: "Bienestar", 
            image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", 
            location: "Centro Cultural",
            price: 20
          }
        ];
        setHealthPlans(sampleHealthPlans);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching health plans:', error);
      toast({
        title: "Error al cargar los planes de salud",
        description: "No se pudieron cargar los planes. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
      setHealthPlans([]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pb-12">
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Salud Familiar</h1>
            <p className="text-gray-600">Recursos y actividades para cuidar la salud de toda la familia</p>
          </div>
        </div>
        
        <PlanCategories 
          isLoading={isLoading} 
          recentPlans={healthPlans} 
          plans={healthPlans} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default SaludPage;
