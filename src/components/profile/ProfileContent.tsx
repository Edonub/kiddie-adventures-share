
import React, { useState } from "react";
import { User } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import SecurityTab from "./tabs/SecurityTab";
import NotificationsTab from "./tabs/NotificationsTab";
import AvatarTab from "./tabs/AvatarTab";

interface ProfileContentProps {
  user: User;
}

const ProfileContent = ({ user }: ProfileContentProps) => {
  const [activeTab, setActiveTab] = useState("personal-info");
  
  // Verificar si is_admin está en user_metadata o directamente en user
  const isAdmin = user?.user_metadata?.is_admin || false;
  
  return (
    <main className="flex-1 py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
        <p className="text-gray-600 mb-8">Gestiona tu cuenta y configura tus preferencias</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar con información del usuario */}
          <div className="col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                    <AvatarFallback className="text-xl bg-familyxp-primary text-white">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">
                    {user?.user_metadata?.full_name || user?.email}
                  </h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  {isAdmin && (
                    <span className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                      Administrador
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contenido de las pestañas */}
          <div className="col-span-1 md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="personal-info">Información Personal</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
                <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                <TabsTrigger value="avatar">Avatar</TabsTrigger>
              </TabsList>

              <TabsContent value="personal-info">
                <PersonalInfoTab user={user} />
              </TabsContent>

              <TabsContent value="security">
                <SecurityTab user={user} />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationsTab user={user} />
              </TabsContent>

              <TabsContent value="avatar">
                <AvatarTab user={user} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileContent;
