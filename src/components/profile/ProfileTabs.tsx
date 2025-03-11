
import React from "react";
import { User } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import AvatarTab from "./tabs/AvatarTab";
import SecurityTab from "./tabs/SecurityTab";
import NotificationsTab from "./tabs/NotificationsTab";

interface ProfileTabsProps {
  user: User;
}

const ProfileTabs = ({ user }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="personal">
      <TabsList className="mb-6">
        <TabsTrigger value="personal">Información Personal</TabsTrigger>
        <TabsTrigger value="avatar">Avatar</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
        <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <PersonalInfoTab user={user} />
      </TabsContent>

      <TabsContent value="avatar">
        <AvatarTab user={user} />
      </TabsContent>

      <TabsContent value="security">
        <SecurityTab user={user} />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
