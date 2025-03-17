
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import PlanCategories from "@/components/plans/PlanCategories";
import { samplePlans } from "@/components/plans/types";
import type { Plan } from "@/components/plans/types";
import { Sun, Landmark, Home, Music, Utensils } from "lucide-react";

const PlanesPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual API call in production
      setTimeout(() => {
        setPlans(samplePlans);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Error al cargar los planes",
        description: "No se pudieron cargar los planes. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
      setPlans(samplePlans);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pb-12">
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-familyxp-primary">Planes</h1>
          </div>
        </div>
        
        <PlanCategories 
          isLoading={isLoading} 
          recentPlans={plans} 
          plans={plans} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default PlanesPage;
