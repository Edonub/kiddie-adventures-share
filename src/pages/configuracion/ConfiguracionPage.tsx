
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDataTab from "./tabs/PersonalDataTab";
import SecurityTab from "./tabs/SecurityTab";
import ContactTab from "./tabs/ContactTab";
import BankAccountTab from "./tabs/BankAccountTab";
import { UserProfile } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

const ConfiguracionPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingAttempted, setLoadingAttempted] = useState(false);
  
  console.log("ConfiguracionPage - Auth loading:", authLoading, "User:", user?.id);
  
  // Handle navigation for unauthenticated users
  useEffect(() => {
    if (!authLoading && !user && loadingAttempted) {
      console.log("User not authenticated, redirecting to auth page");
      toast.error("Debes iniciar sesión para acceder a la configuración");
      navigate("/auth");
    }
  }, [user, authLoading, navigate, loadingAttempted]);
  
  // Load user profile only when authentication is complete
  useEffect(() => {
    if (!authLoading) {
      setLoadingAttempted(true);
      if (user) {
        console.log("Auth completed, loading profile for:", user.id);
        loadUserProfile();
      }
    }
  }, [user, authLoading]);
  
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

  console.log("Render state - Auth loading:", authLoading, "Profile loading:", isLoading, "Error:", error);

  // Show error state if there was an error loading the profile
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

  // Show loading spinner while auth state is being determined
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

  // If not authenticated, show message and redirect
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

  // Show skeleton loading while profile data is being loaded
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Configuración de cuenta</h1>
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
            <p>Cargando tu perfil...</p>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </>
    );
  }
  
  // Once everything is loaded, render the full page
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Configuración de cuenta</h1>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Datos personales</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            <TabsTrigger value="contacto">Contacto</TabsTrigger>
            <TabsTrigger value="bancaria">Cuenta bancaria</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <PersonalDataTab userProfile={userProfile} user={user} />
          </TabsContent>
          
          <TabsContent value="seguridad">
            <SecurityTab />
          </TabsContent>
          
          <TabsContent value="contacto">
            <ContactTab userProfile={userProfile} user={user} />
          </TabsContent>
          
          <TabsContent value="bancaria">
            <BankAccountTab userProfile={userProfile} user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ConfiguracionPage;
