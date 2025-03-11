
import React from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  
  console.log("ProfilePage: loading =", loading, "user =", user?.email || "null");

  return <ProfileLayout />;
};

export default ProfilePage;
