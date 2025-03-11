
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ExperienceData {
  title: string;
  description: string;
  location: string;
  category: string;
  price: string;
  imageUrl: string;
  ageRange: string;
  isPremium: boolean;
}

const initialData: ExperienceData = {
  title: "",
  description: "",
  location: "",
  category: "",
  price: "0",
  imageUrl: "",
  ageRange: "",
  isPremium: false
};

export const useExperienceData = (experienceId: string | undefined, userId: string | undefined) => {
  const [data, setData] = useState<ExperienceData>(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExperienceData = async () => {
      if (!userId || !experienceId) return;

      setLoading(true);
      try {
        const { data: experienceData, error } = await supabase
          .from("activities")
          .select("*")
          .eq("id", experienceId)
          .eq("creator_id", userId)
          .single();

        if (error) {
          toast.error("No se pudo cargar la experiencia");
          return;
        }

        if (experienceData) {
          setData({
            title: experienceData.title || "",
            description: experienceData.description || "",
            location: experienceData.location || "",
            category: experienceData.category || "",
            price: experienceData.price ? experienceData.price.toString() : "0",
            imageUrl: experienceData.image_url || "",
            ageRange: experienceData.age_range || "",
            isPremium: experienceData.is_premium || false,
          });
        }
      } catch (error) {
        console.error("Error fetching experience:", error);
        toast.error("Error al cargar la experiencia");
      } finally {
        setLoading(false);
      }
    };

    if (experienceId) {
      fetchExperienceData();
    }
  }, [experienceId, userId]);

  return { data, loading };
};
