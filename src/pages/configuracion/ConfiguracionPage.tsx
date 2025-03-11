
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import ConfigTabs from "@/components/configuration/ConfigTabs";
import LoadingState from "@/components/configuration/LoadingState";
import { UserProfile } from "@/components/configuration/types";

const ConfiguracionPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingAttempted, setLoadingAttempted] = useState(false);
  
  console.log("ConfiguracionPage - Auth loading:", authLoading, "User:", user?.id);
  
  useEffect(() => {
    // Si la autenticación ha terminado y no hay usuario, redirigir
    if (!authLoading && !user) {
      console.log("User not authenticated, redirecting to auth page");
      toast.error("Debes iniciar sesión para acceder a la configuración");
      navigate("/auth");
      return;
    }
    
    // Si la autenticación ha terminado y hay usuario, cargar el perfil
    if (!authLoading && user && !isLoading && !loadingAttempted) {
      console.log("Auth completed, loading profile for:", user.id);
      setLoadingAttempted(true);
      loadUserProfile();
    }
  }, [user, authLoading, navigate]);
  
  const loadUserProfile = async () => {
    if (!user) {
      console.log("No user found, cannot load profile");
      return;
    }
    
    try {
      setIsLoading(true);
      console.log("Fetching profile data for user ID:", user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); 
        
      if (error) {
        console.error("Error loading profile:", error.message);
        setError("Error al cargar el perfil");
        throw error;
      }
      
      console.log("Profile data received:", data);
      setUserProfile(data);
    } catch (error: any) {
      console.error("Error loading profile:", error);
      setError(error.message || "Error al cargar tu perfil");
      toast.error("Error al cargar tu perfil. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 py-8">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="ml-2">Verificando sesión...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 py-8">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
            <p>Redirigiendo a la página de inicio de sesión...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 py-8">
          <div className="flex flex-col justify-center items-center h-40">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                setLoadingAttempted(false);
                window.location.reload();
              }} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Configuración de cuenta</h1>
          <LoadingState />
        </div>
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Configuración de cuenta</h1>
        <ConfigTabs userProfile={userProfile} user={user} />
      </div>
    </>
  );
};

export default ConfiguracionPage;
