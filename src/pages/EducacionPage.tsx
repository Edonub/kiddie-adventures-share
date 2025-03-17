
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import PlanCategories from "@/components/plans/PlanCategories";
import type { Plan } from "@/components/plans/types";

const EducacionPage = () => {
  const [educationPlans, setEducationPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEducationPlans();
  }, []);

  const fetchEducationPlans = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual API call in production
      setTimeout(() => {
        // Sample education-related plans
        const sampleEducationPlans: Plan[] = [
          { 
            id: 1, 
            title: "Taller de matemáticas para niños", 
            category: "Académico", 
            image_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", 
            location: "Centro Educativo Municipal",
            price: 15
          },
          { 
            id: 2, 
            title: "Club de lectura infantil", 
            category: "Literatura", 
            image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", 
            location: "Biblioteca Pública",
            price: 0
          },
          { 
            id: 3, 
            title: "Programación para adolescentes", 
            category: "Tecnología", 
            image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", 
            location: "Centro Tecnológico",
            price: 25
          },
          { 
            id: 4, 
            title: "Taller de ciencias experimentales", 
            category: "Ciencias", 
            image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475", 
            location: "Museo de Ciencias",
            price: 12
          }
        ];
        setEducationPlans(sampleEducationPlans);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching education plans:', error);
      toast({
        title: "Error al cargar los planes educativos",
        description: "No se pudieron cargar los planes. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
      setEducationPlans([]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pb-12">
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-familyxp-primary mb-2">Educación Familiar</h1>
            <p className="text-gray-600">Recursos y actividades educativas para toda la familia</p>
          </div>
        </div>
        
        <PlanCategories 
          isLoading={isLoading} 
          recentPlans={educationPlans} 
          plans={educationPlans} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default EducacionPage;
