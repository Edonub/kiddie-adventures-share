
import React, { useState, useEffect } from "react";
import { User } from "@/contexts/AuthContext";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PersonalInfoTabProps {
  user: User;
}

const PersonalInfoTab = ({ user }: PersonalInfoTabProps) => {
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Initialize form values when user data loads
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setPhone(user.user_metadata?.phone || "");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone
        }
      });
      
      if (error) throw error;
      
      toast.success("Perfil actualizado con éxito");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error al actualizar el perfil");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    // Reset form values to current user values
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setPhone(user.user_metadata?.phone || "");
    }
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>
          Actualiza tu información personal y de contacto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {editing ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email" 
                value={user.email || ""}
                disabled 
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500">
                El correo electrónico no se puede cambiar.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input 
                id="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Introduce tu nombre completo"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Introduce tu número de teléfono"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleUpdateProfile} 
                disabled={isUpdating}
              >
                {isUpdating ? "Guardando..." : "Guardar cambios"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={isUpdating}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <p className="text-sm font-medium">Correo electrónico</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm font-medium">Nombre completo</p>
              <p className="text-sm text-gray-500">
                {user.user_metadata?.full_name || "No especificado"}
              </p>
            </div>
            <div className="grid gap-2">
              <p className="text-sm font-medium">Teléfono</p>
              <p className="text-sm text-gray-500">
                {user.user_metadata?.phone || "No especificado"}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto mt-4" 
              onClick={() => setEditing(true)}
            >
              Editar información
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
