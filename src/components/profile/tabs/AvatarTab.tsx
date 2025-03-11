
import React, { useState } from "react";
import { User } from "@/contexts/AuthContext";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AvatarTabProps {
  user: User;
}

const AvatarTab = ({ user }: AvatarTabProps) => {
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata?.avatar_url || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateAvatar = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          avatar_url: avatarUrl
        }
      });
      
      if (error) throw error;
      
      toast.success("Avatar actualizado con éxito");
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Error al actualizar el avatar");
    } finally {
      setIsUpdating(false);
    }
  };

  const PREDEFINED_AVATARS = [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Milo",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Jasper",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Bella",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Lucy",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Max",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Avatar de Perfil</CardTitle>
        <CardDescription>
          Personaliza tu avatar para los foros y comentarios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={avatarUrl || ""} />
              <AvatarFallback className="text-3xl bg-familyxp-primary text-white">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-gray-500 text-center">
              Vista previa de tu avatar
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="avatarUrl">URL de imagen (opcional)</Label>
              <Input 
                id="avatarUrl" 
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://ejemplo.com/tu-imagen.jpg"
              />
              <p className="text-xs text-gray-500">
                Introduce la URL de la imagen que quieres usar como avatar.
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={handleUpdateAvatar}
                disabled={isUpdating}
              >
                {isUpdating ? "Actualizando..." : "Actualizar avatar"}
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Avatares predefinidos</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {PREDEFINED_AVATARS.map((url, index) => (
              <button
                key={index}
                className={`p-1 rounded-lg transition-all ${
                  avatarUrl === url ? "ring-2 ring-familyxp-primary" : "hover:bg-gray-100"
                }`}
                onClick={() => setAvatarUrl(url)}
              >
                <Avatar className="h-16 w-16">
                  <AvatarImage src={url} />
                  <AvatarFallback className="bg-gray-200" />
                </Avatar>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvatarTab;
