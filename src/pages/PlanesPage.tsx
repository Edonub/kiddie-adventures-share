
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import PlanCategories from "@/components/plans/PlanCategories";
import { samplePlans } from "@/components/plans/types";
import type { Plan } from "@/components/plans/types";
import CategoryTabs from "@/components/CategoryTabs";
import { planCategories } from "@/components/plans/types";
import { Beach, Mountain, Camera, Music, Utensils } from "lucide-react";

const PlanesPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Create categories with icons for the CategoryTabs component
  const planCategoriesWithIcons = [
    { id: "todos", name: "Todos", icon: "/placeholder.svg", slug: "todos" },
    { id: "aire-libre", name: "Al aire libre", icon: "/placeholder.svg", slug: "al-aire-libre" },
    { id: "cultural", name: "Cultural", icon: "/placeholder.svg", slug: "cultural" },
    { id: "interior", name: "Interior", icon: "/placeholder.svg", slug: "interior" },
    { id: "comida", name: "Comida y bebida", icon: "/placeholder.svg", slug: "comida-y-bebida" },
  ];

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
            <h1 className="text-3xl font-bold text-familyxp-primary mb-2">Planes para toda la familia</h1>
            <p className="text-gray-600">Descubre experiencias únicas para disfrutar en familia</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 my-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <CategoryTabs categories={planCategoriesWithIcons} activeCategory="todos" />
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
