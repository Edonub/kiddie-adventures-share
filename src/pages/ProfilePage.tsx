
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ProfilePage = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Debes iniciar sesión para acceder a esta página");
      navigate("/auth");
    }
  }, [user, loading, navigate]);
  
  // Initialize form values when user data loads
  React.useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setPhone(user.user_metadata?.phone || "");
      setAvatarUrl(user.user_metadata?.avatar_url || "");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone,
          avatar_url: avatarUrl
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
      setAvatarUrl(user.user_metadata?.avatar_url || "");
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando perfil...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
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
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                      <AvatarFallback className="text-xl bg-familyxp-primary text-white">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">
                      {user.user_metadata?.full_name || user.email}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    {isAdmin && (
                      <span className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                        Administrador
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1 md:col-span-3">
              <Tabs defaultValue="personal">
                <TabsList className="mb-6">
                  <TabsTrigger value="personal">Información Personal</TabsTrigger>
                  <TabsTrigger value="avatar">Avatar</TabsTrigger>
                  <TabsTrigger value="security">Seguridad</TabsTrigger>
                  <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
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
                </TabsContent>

                <TabsContent value="avatar">
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
                              onClick={handleUpdateProfile}
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
                          {[
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
                          ].map((url, index) => (
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
                </TabsContent>

                <TabsContent value="security">
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
                            onClick={async () => {
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
                            }}
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
                            onClick={async () => {
                              try {
                                const { error } = await supabase.auth.signOut({ scope: "others" });
                                
                                if (error) throw error;
                                
                                toast.success("Todas las demás sesiones han sido cerradas");
                              } catch (error) {
                                console.error("Error signing out others:", error);
                                toast.error("Error al cerrar otras sesiones");
                              }
                            }}
                          >
                            Cerrar todas las sesiones
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferencias de Notificaciones</CardTitle>
                      <CardDescription>
                        Configura cómo y cuándo quieres recibir notificaciones.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-500">
                          Las preferencias de notificaciones se implementarán próximamente.
                        </p>
                        <p className="text-sm text-gray-500">
                          Pronto podrás personalizar las notificaciones para nuevos temas en el foro, 
                          respuestas a tus comentarios, y actualizaciones de actividades.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
