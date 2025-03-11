
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { useExperienceData } from "@/hooks/useExperienceData";
import ExperienceFormWrapper from "@/components/experiences/ExperienceFormWrapper";
import LoadingExperience from "@/components/experiences/LoadingExperience";
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
          <LoadingExperience />
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
