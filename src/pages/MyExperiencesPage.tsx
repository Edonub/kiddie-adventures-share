
import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import ExperienceList from "@/components/experiences/ExperienceList";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define the experience type
interface Experience {
  id: string;
  title: string;
  location: string;
  category: string;
  price: number;
  image_url: string;
  status: string;
  bookings: number;
}

const MyExperiencesPage = () => {
  const { user, loading } = useAuth();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        
        // Fetch experiences from Supabase
        const { data, error } = await supabase
          .from("activities")
          .select("*")
          .eq("creator_id", user.id);
        
        if (error) throw error;
        
        // Transform the data to match our expected format
        const transformedData = data.map(item => ({
          id: item.id,
          title: item.title,
          location: item.location,
          category: item.category,
          price: item.price,
          image_url: item.image_url || "https://placehold.co/600x400",
          status: item.is_published ? "published" : "draft",
          bookings: item.booking_count || 0
        }));
        
        setExperiences(transformedData);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        toast.error("Error al cargar tus experiencias");
        
        // Fallback to mock data if there's an error
        setExperiences([
          {
            id: "1",
            title: "Paseo en bici por Madrid Río",
            location: "Madrid",
            category: "outdoor",
            price: 15,
            image_url: "https://placehold.co/600x400",
            status: "published",
            bookings: 12
          },
          {
            id: "2",
            title: "Clase de cocina española",
            location: "Barcelona",
            category: "food",
            price: 45,
            image_url: "https://placehold.co/600x400",
            status: "published",
            bookings: 8
          },
          {
            id: "3",
            title: "Tour de fotografía",
            location: "Valencia",
            category: "culture",
            price: 0,
            image_url: "https://placehold.co/600x400",
            status: "draft",
            bookings: 0
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && !loading) {
      fetchExperiences();
    }
  }, [user, loading]);
  
  const handleDeleteExperience = async (id: string) => {
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from("activities")
        .delete()
        .eq("id", id)
        .eq("creator_id", user?.id);
      
      if (error) throw error;
      
      // Update local state
      setExperiences(experiences.filter(exp => exp.id !== id));
      toast.success("Experiencia eliminada con éxito");
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("No se pudo eliminar la experiencia");
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando experiencias...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mis Experiencias</h1>
              <p className="text-gray-600">Gestiona tus experiencias y reservas</p>
            </div>
            <Link to="/crear-actividad">
              <Button className="flex items-center gap-2">
                <PlusCircle size={18} />
                <span>Crear experiencia</span>
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Publicadas</TabsTrigger>
              <TabsTrigger value="drafts">Borradores</TabsTrigger>
              <TabsTrigger value="bookings">Reservas</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <ExperienceList 
                experiences={experiences} 
                status="published" 
                onDeleteExperience={handleDeleteExperience}
              />
            </TabsContent>

            <TabsContent value="drafts">
              <ExperienceList 
                experiences={experiences} 
                status="draft" 
                onDeleteExperience={handleDeleteExperience}
              />
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      Aquí podrás ver las reservas que otros usuarios han hecho para tus experiencias.
                    </p>
                    <p className="text-gray-500">
                      Actualmente no hay reservas para mostrar.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyExperiencesPage;
