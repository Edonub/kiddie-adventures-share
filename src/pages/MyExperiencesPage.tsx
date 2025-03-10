
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences
                  .filter(exp => exp.status === "published")
                  .map(experience => (
                    <ExperienceCard 
                      key={experience.id} 
                      experience={experience} 
                    />
                  ))}
                
                {experiences.filter(exp => exp.status === "published").length === 0 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-gray-500 mb-4">No tienes experiencias publicadas.</p>
                        <Link to="/crear-actividad">
                          <Button variant="outline" className="flex items-center gap-2">
                            <PlusCircle size={18} />
                            <span>Crear experiencia</span>
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="drafts">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences
                  .filter(exp => exp.status === "draft")
                  .map(experience => (
                    <ExperienceCard 
                      key={experience.id} 
                      experience={experience} 
                    />
                  ))}
                
                {experiences.filter(exp => exp.status === "draft").length === 0 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="text-gray-500 mb-4">No tienes borradores de experiencias.</p>
                        <Link to="/crear-actividad">
                          <Button variant="outline" className="flex items-center gap-2">
                            <PlusCircle size={18} />
                            <span>Crear experiencia</span>
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
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

interface ExperienceCardProps {
  experience: {
    id: string;
    title: string;
    location: string;
    category: string;
    price: number;
    image_url: string;
    status: string;
    bookings: number;
  };
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img 
          src={experience.image_url} 
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        {experience.status === "draft" && (
          <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
            Borrador
          </div>
        )}
      </div>
      
      <CardContent className="pt-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg truncate">{experience.title}</h3>
          <p className="text-sm text-gray-500">{experience.location}</p>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium">
            {experience.price === 0 ? 'Gratis' : `${experience.price} €`}
          </span>
          {experience.status === "published" && (
            <span className="text-sm text-gray-500">
              {experience.bookings} {experience.bookings === 1 ? 'reserva' : 'reservas'}
            </span>
          )}
        </div>
        
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700"
            asChild
          >
            <Link to={`/actividad/${experience.id}`}>
              <Eye size={16} className="mr-1" />
              <span>Ver</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700"
            asChild
          >
            <Link to={`/editar-actividad/${experience.id}`}>
              <Edit size={16} className="mr-1" />
              <span>Editar</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-400 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} className="mr-1" />
            <span>Borrar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyExperiencesPage;
