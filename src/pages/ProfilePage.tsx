
import React from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  // No need for additional loading state here since ProfileLayout handles it
  return <ProfileLayout />;
};

export default ProfilePage;
