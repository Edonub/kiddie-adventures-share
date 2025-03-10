import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import ExperienceList from "@/components/experiences/ExperienceList";

// Mock data for example purposes
const mockExperiences = [
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
];

const MyExperiencesPage = () => {
  const { user, loading } = useAuth();
  const [experiences] = useState(mockExperiences);

  if (loading) {
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
              <ExperienceList experiences={experiences} status="published" />
            </TabsContent>

            <TabsContent value="drafts">
              <ExperienceList experiences={experiences} status="draft" />
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
