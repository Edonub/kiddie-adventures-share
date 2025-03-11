
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { useExperienceData } from "@/hooks/useExperienceData";
import ExperienceFormWrapper from "@/components/experiences/ExperienceFormWrapper";
import { toast } from "sonner";

const CrearActividadPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  // Use custom hook to fetch experience data
  const { data, loading: dataLoading } = useExperienceData(id, user?.id);
  
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Debes iniciar sesión para crear o editar experiencias");
      navigate("/auth");
    }
  }, [user, loading, navigate]);
  
  if (loading || dataLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-6 max-w-3xl">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando experiencia...</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  if (!user) {
    return null;
  }
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 max-w-3xl">
        <ExperienceFormWrapper 
          isEditMode={isEditMode}
          initialData={data}
          experienceId={id}
          userId={user.id}
        />
      </div>
    </>
  );
};

export default CrearActividadPage;
