
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

const ConfiguracionPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Debes iniciar sesión para acceder a la configuración");
      navigate("/auth");
      return;
    }
    
    if (user) {
      loadUserProfile();
    }
  }, [user, loading, navigate]);
  
  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setUserProfile(data);
        }
      }
    } catch (error) {
      console.error("Error cargando el perfil:", error);
      toast.error("Error al cargar tu perfil. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 py-8">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </>
    );
  }
  
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
