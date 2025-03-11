
import React, { useEffect } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { useAuth } from "@/contexts/AuthContext";
import LoadingExperience from "@/components/experiences/LoadingExperience";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  
  console.log("ProfilePage: loading =", loading, "user =", user?.email || "null");

  useEffect(() => {
    // Verificamos el estado de autenticación cuando cambie
    if (!loading && !user) {
      toast.error("Debes iniciar sesión para acceder a esta página");
    }
  }, [user, loading]);

  if (loading) {
    return <LoadingExperience />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <ProfileLayout />;
};

export default ProfilePage;
