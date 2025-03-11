
import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExperienceList from "@/components/experiences/ExperienceList";
import MyExperiencesLoading from "@/components/experiences/MyExperiencesLoading";
import MyExperiencesHeader from "@/components/experiences/MyExperiencesHeader";
import BookingsTabContent from "@/components/experiences/BookingsTabContent";
import { useMyExperiences } from "@/hooks/useMyExperiences";

const MyExperiencesPage = () => {
  const { user, loading } = useAuth();
  const { experiences, isLoading, handleDeleteExperience } = useMyExperiences(user?.id);

  if (loading || isLoading) {
    return <MyExperiencesLoading />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <MyExperiencesHeader />

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
              <BookingsTabContent />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyExperiencesPage;
