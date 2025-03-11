
import React, { useEffect } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { useAuth } from "@/contexts/AuthContext";
import LoadingExperience from "@/components/experiences/LoadingExperience";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  
  console.log("ProfilePage: loading =", loading, "user =", user?.email || "null");

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Debes iniciar sesión para acceder a esta página");
    }
  }, [user, loading]);

  // Show loading screen with navbar while checking auth
  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingExperience />
      </>
    );
  }

  // Redirect to auth if no user
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Only render the profile layout when we have a user
  return <ProfileLayout />;
};

export default ProfilePage;
