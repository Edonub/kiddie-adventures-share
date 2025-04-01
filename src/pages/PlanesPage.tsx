
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import PlanCategories from "@/components/plans/PlanCategories";
import { samplePlans } from "@/components/plans/types";
import type { Plan } from "@/components/plans/types";
import AirbnbSearchBar from "@/components/AirbnbSearchBar";
import { Plane } from "lucide-react";
import CategorySelector from "@/components/CategorySelector";

const categories = [
  { id: 1, name: "Planes", icon: <Plane className="w-4 h-4 mr-1.5" /> },
  { id: 2, name: "Todos" },
  { id: 3, name: "Al aire libre" },
  { id: 4, name: "Cultural" },
  { id: 5, name: "Interior" },
  { id: 6, name: "Comida y bebida" },
];

const PlanesPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-1 w-full overflow-x-hidden">
        <div className="px-2 mt-0.5">
          <div className="max-w-screen-xl mx-auto">
            <div className="py-1 px-2 bg-white rounded-xl shadow-sm mb-1.5">
              <AirbnbSearchBar />
            </div>
            
            {/* Category Selection using the reusable CategorySelector component */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <CategorySelector 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(id) => setSelectedCategory(Number(id))}
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4">
              <PlanCategories 
                isLoading={isLoading} 
                recentPlans={plans} 
                plans={plans} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlanesPage;
