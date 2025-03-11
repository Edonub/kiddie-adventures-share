
import React from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { useAuth } from "@/contexts/AuthContext";
import LoadingExperience from "@/components/experiences/LoadingExperience";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  
  console.log("ProfilePage: loading =", loading, "user =", user?.email || "null");

  if (loading) {
    return <LoadingExperience />;
  }

  if (!user) {
    toast.error("Debes iniciar sesión para acceder a esta página");
    return <Navigate to="/auth" replace />;
  }

  return <ProfileLayout />;
};

export default ProfilePage;
