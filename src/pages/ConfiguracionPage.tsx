
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ConfiguracionPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  
  // Loading states
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingContact, setIsUpdatingContact] = useState(false);
  const [isUpdatingBank, setIsUpdatingBank] = useState(false);
  
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Debes iniciar sesión para acceder a la configuración");
      navigate("/auth");
      return;
    }
    
    if (user) {
      loadUserProfile();
      // Pre-fill email from user object
      setEmail(user.email || "");
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
          setFirstName(data.first_name || "");
          setLastName(data.last_name || "");
          setAvatarUrl(data.avatar_url || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
          setBankAccount(data.bank_account || "");
        }
      }
    } catch (error) {
      console.error("Error cargando el perfil:", error);
      toast.error("Error al cargar tu perfil. Inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async () => {
    try {
      setIsUpdatingProfile(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          avatar_url: avatarUrl,
          updated_at: new Date()
        })
        .eq('id', user?.id);
        
      if (error) throw error;
      
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error actualizando el perfil:", error);
      toast.error("Error al actualizar el perfil. Inténtalo de nuevo más tarde.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };
  
  const updatePassword = async () => {
    try {
      setIsUpdatingPassword(true);
      
      if (newPassword !== confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success("Contraseña actualizada correctamente");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error actualizando la contraseña:", error);
      toast.error("Error al actualizar la contraseña. Verifica que la contraseña actual sea correcta.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };
  
  const updateContact = async () => {
    try {
      setIsUpdatingContact(true);
      
      // Update email in auth
      if (email !== user?.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: email
        });
        
        if (authError) throw authError;
      }
      
      // Update phone & address in profile
      const { error } = await supabase
        .from('profiles')
        .update({
          phone,
          address,
          updated_at: new Date()
        })
        .eq('id', user?.id);
        
      if (error) throw error;
      
      toast.success("Datos de contacto actualizados correctamente");
    } catch (error) {
      console.error("Error actualizando los datos de contacto:", error);
      toast.error("Error al actualizar los datos de contacto. Inténtalo de nuevo más tarde.");
    } finally {
      setIsUpdatingContact(false);
    }
  };
  
  const updateBankAccount = async () => {
    try {
      setIsUpdatingBank(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          bank_account: bankAccount,
          updated_at: new Date()
        })
        .eq('id', user?.id);
        
      if (error) throw error;
      
      toast.success("Datos bancarios actualizados correctamente");
    } catch (error) {
      console.error("Error actualizando los datos bancarios:", error);
      toast.error("Error al actualizar los datos bancarios. Inténtalo de nuevo más tarde.");
    } finally {
      setIsUpdatingBank(false);
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
          
          {/* Pestaña de Datos Personales */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Datos personales</CardTitle>
                <CardDescription>
                  Actualiza tu información personal y foto de perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback className="bg-familyxp-primary text-white text-xl">
                        {firstName ? firstName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">Cambiar foto</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <h4 className="font-medium">URL de la imagen</h4>
                          <Input 
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="https://ejemplo.com/avatar.jpg"
                          />
                          <p className="text-xs text-muted-foreground">
                            Ingresa la URL de tu imagen de perfil. Pronto añadiremos soporte para subir imágenes.
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellidos</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Tus apellidos"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={updateProfile} 
                    disabled={isUpdatingProfile}
                  >
                    {isUpdatingProfile ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pestaña de Seguridad */}
          <TabsContent value="seguridad">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>
                  Cambia tu contraseña y configura opciones de seguridad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña actual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva contraseña</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={updatePassword} 
                    disabled={isUpdatingPassword || !newPassword || !confirmPassword}
                  >
                    {isUpdatingPassword ? "Actualizando..." : "Actualizar contraseña"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pestaña de Contacto */}
          <TabsContent value="contacto">
            <Card>
              <CardHeader>
                <CardTitle>Datos de contacto</CardTitle>
                <CardDescription>
                  Actualiza tu email y datos de contacto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Si cambias tu email, recibirás un correo de verificación en la nueva dirección.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Tu dirección"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={updateContact} 
                    disabled={isUpdatingContact}
                  >
                    {isUpdatingContact ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pestaña de Cuenta Bancaria */}
          <TabsContent value="bancaria">
            <Card>
              <CardHeader>
                <CardTitle>Datos bancarios</CardTitle>
                <CardDescription>
                  Configura tus datos bancarios para recibir pagos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankAccount">IBAN / Número de cuenta</Label>
                    <Input
                      id="bankAccount"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder="ES00 0000 0000 0000 0000 0000"
                    />
                    <p className="text-xs text-muted-foreground">
                      Esta información se usará para procesar pagos. Tus datos bancarios están seguros.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={updateBankAccount} 
                    disabled={isUpdatingBank}
                  >
                    {isUpdatingBank ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ConfiguracionPage;
