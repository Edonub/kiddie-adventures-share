
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/contexts/AuthContext";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import SecurityTab from "./tabs/SecurityTab";
import NotificationsTab from "./tabs/NotificationsTab";
import AvatarTab from "./tabs/AvatarTab";

interface ProfileTabsProps {
  user: User;
}

const ProfileTabs = ({ user }: ProfileTabsProps) => {
  console.log("ProfileTabs rendering with user:", user?.email);
  
  return (
    <Tabs defaultValue="personal-info" className="w-full">
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
  );
};

export default ProfileTabs;
