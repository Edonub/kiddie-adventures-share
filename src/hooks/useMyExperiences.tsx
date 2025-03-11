
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Experience {
  id: string;
  title: string;
  location: string;
  category: string;
  price: number;
  image_url: string;
  status: string;
  bookings: number;
}

export const useMyExperiences = (userId: string | undefined) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from("activities")
          .select("*")
          .eq("creator_id", userId);
        
        if (error) throw error;
        
        const transformedData = data.map(item => ({
          id: item.id,
          title: item.title,
          location: item.location,
          category: item.category,
          price: item.price,
          image_url: item.image_url || "https://placehold.co/600x400",
          status: item.is_premium ? "published" : "draft",
          bookings: item.review_count || 0
        }));
        
        setExperiences(transformedData);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        toast.error("Error al cargar tus experiencias");
        setExperiences([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchExperiences();
    }
  }, [userId]);

  const handleDeleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from("activities")
        .delete()
        .eq("id", id)
        .eq("creator_id", userId);
      
      if (error) throw error;
      
      setExperiences(experiences.filter(exp => exp.id !== id));
      toast.success("Experiencia eliminada con éxito");
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("No se pudo eliminar la experiencia");
    }
  };

  return { experiences, isLoading, handleDeleteExperience };
};
