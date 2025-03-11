
import React from "react";
import { User } from "@/contexts/AuthContext";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SecurityTabProps {
  user: User;
}

const SecurityTab = ({ user }: SecurityTabProps) => {
  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        user.email || "",
        { redirectTo: window.location.origin + "/perfil" }
      );
      
      if (error) throw error;
      
      toast.success("Enlace de recuperación enviado a tu correo electrónico");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error al enviar el enlace de recuperación");
    }
  };

  const handleSignOutOtherSessions = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: "others" });
      
      if (error) throw error;
      
      toast.success("Todas las demás sesiones han sido cerradas");
    } catch (error) {
      console.error("Error signing out others:", error);
      toast.error("Error al cerrar otras sesiones");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguridad de la Cuenta</CardTitle>
        <CardDescription>
          Gestiona tu contraseña y la seguridad de tu cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Cambiar contraseña</h3>
            <p className="text-sm text-gray-500 mb-4">
              Te enviaremos un enlace a tu correo electrónico para que puedas cambiar tu contraseña de forma segura.
            </p>
            <Button 
              variant="outline" 
              onClick={handlePasswordReset}
            >
              Enviar enlace de recuperación
            </Button>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Sesiones activas</h3>
            <p className="text-sm text-gray-500 mb-4">
              Si sospechas que alguien ha accedido a tu cuenta, puedes cerrar todas las sesiones activas.
            </p>
            <Button 
              variant="destructive"
              onClick={handleSignOutOtherSessions}
            >
              Cerrar todas las sesiones
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
