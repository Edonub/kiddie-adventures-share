
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileContent from "@/components/profile/ProfileContent";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    // Display a log to debug issues
    console.log("ProfilePage: loading =", loading, "user =", user?.email);
    
    if (!loading && !user) {
      toast.error("Debes iniciar sesión para acceder a esta página");
    }
  }, [user, loading]);

  // Mostrar pantalla de carga mientras verifica la autenticación
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando perfil...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Redirigir a la página de autenticación si no hay usuario
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Renderizar la página de perfil cuando tenemos un usuario
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ProfileContent user={user} />
      <Footer />
    </div>
  );
};

export default ProfilePage;
