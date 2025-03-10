
import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { user, loading, isAdmin } = useAuth();

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
                  <TabsTrigger value="payments">Pagos</TabsTrigger>
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
                        <Button variant="outline" className="w-full sm:w-auto mt-4">
                          Editar información
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Métodos de Pago</CardTitle>
                      <CardDescription>
                        Gestiona tus métodos de pago y revisa tu historial de transacciones.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-gray-500">No tienes métodos de pago guardados.</p>
                        <Button variant="outline" className="mt-4">
                          Añadir método de pago
                        </Button>
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
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <p className="text-sm font-medium">Contraseña</p>
                          <p className="text-sm text-gray-500">••••••••</p>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto mt-4">
                          Cambiar contraseña
                        </Button>
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
                      <p className="text-gray-500">
                        Las preferencias de notificaciones se implementarán próximamente.
                      </p>
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
