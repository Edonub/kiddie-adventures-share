
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
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Only attempt to load the user profile when authentication is complete
    if (!authLoading) {
      if (!user) {
        toast.error("Debes iniciar sesión para acceder a la configuración");
        navigate("/auth");
        return;
      }
      
      // Load user profile when we have a user
      loadUserProfile();
    }
  }, [user, authLoading, navigate]);
  
  const loadUserProfile = async () => {
    if (!user) return; // Ensure we have a user before attempting to load profile
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error("Error loading profile:", error);
        throw error;
      }
      
      setUserProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Error al cargar tu perfil. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

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

  // If not authenticated, this will redirect - should never render
  if (!user) {
    return null;
  }

  // Show skeleton loading while profile data is being loaded
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Configuración de cuenta</h1>
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
