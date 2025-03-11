
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

export interface Booking {
  id: string;
  activity_id: string;
  user_id: string;
  booking_date: string;
  status: string;
  adults: number;
  children: number;
  total_price: number;
  created_at: string;
  activity_title: string;
  user_name: string;
  user_email: string;
}

export const useMyExperiences = (userId: string | undefined) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

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

    const fetchBookings = async () => {
      if (!userId) return;

      try {
        setIsLoadingBookings(true);
        
        // This is a mock fetch for now - in a real app, you would fetch actual booking data
        // from a bookings table related to the user's activities
        const mockBookings: Booking[] = [];
        
        // For each experience, create a few sample bookings
        for (const exp of experiences) {
          // Only add bookings for published experiences
          if (exp.status === 'published') {
            const randomBookingsCount = Math.floor(Math.random() * 3);
            for (let i = 0; i < randomBookingsCount; i++) {
              mockBookings.push({
                id: `booking-${exp.id}-${i}`,
                activity_id: exp.id,
                user_id: `user-${i}`,
                booking_date: new Date(Date.now() + i * 86400000).toISOString(),
                status: ['confirmado', 'pendiente', 'cancelado'][Math.floor(Math.random() * 3)],
                adults: Math.floor(Math.random() * 3) + 1,
                children: Math.floor(Math.random() * 2),
                total_price: exp.price * (Math.floor(Math.random() * 3) + 1),
                created_at: new Date().toISOString(),
                activity_title: exp.title,
                user_name: `Usuario ${i + 1}`,
                user_email: `usuario${i + 1}@example.com`
              });
            }
          }
        }
        
        setBookings(mockBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Error al cargar las reservas");
        setBookings([]);
      } finally {
        setIsLoadingBookings(false);
      }
    };

    if (userId) {
      fetchExperiences();
    }
    
    // Fetch bookings after experiences are loaded
    if (experiences.length > 0) {
      fetchBookings();
    }
  }, [userId, experiences.length === 0]);

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

  return { 
    experiences, 
    bookings,
    isLoading, 
    isLoadingBookings,
    handleDeleteExperience 
  };
};
