
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { useExperienceData } from "@/hooks/useExperienceData";
import ExperienceFormWrapper from "@/components/experiences/ExperienceFormWrapper";
import LoadingExperience from "@/components/experiences/LoadingExperience";

const CrearActividadPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  // Use custom hook to fetch experience data
  const { data, loading } = useExperienceData(id, user?.id);
  
  if (!user) {
    navigate("/auth");
    return null;
  }
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-6 max-w-3xl">
          <LoadingExperience />
        </div>
      </>
    );
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
