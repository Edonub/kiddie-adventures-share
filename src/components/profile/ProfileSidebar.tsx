
import React from "react";
import { User } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileSidebarProps {
  user: User;
}

const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  console.log("ProfileSidebar rendering with user:", user?.email);
  
  // Verificar si is_admin está en user_metadata o directamente en user
  const isAdmin = user?.user_metadata?.is_admin || false;
  
  return (
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
  );
};

export default ProfileSidebar;
