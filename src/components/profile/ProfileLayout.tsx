
import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import LoadingExperience from "@/components/experiences/LoadingExperience";

const ProfileLayout = () => {
  const { user, loading } = useAuth();
  
  // Adding debug logs to track loading state and user
  console.log("ProfileLayout: loading =", loading, "user =", user?.email || "null");

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <LoadingExperience />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    toast.error("Debes iniciar sesión para acceder a esta página");
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu cuenta y configura tus preferencias</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <ProfileSidebar user={user} />
            </div>

            <div className="col-span-1 md:col-span-3">
              <ProfileTabs user={user} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
