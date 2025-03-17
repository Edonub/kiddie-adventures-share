
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "@/contexts/AuthContext";
import UserDropdown from "./UserDropdown";
import { Plane, Heart, GraduationCap, MessageSquare, Apple, HelpCircle } from "lucide-react";

interface DesktopNavProps {
  user: User | null;
  onSignOut: () => Promise<void>;
}

const DesktopNav = ({ user, onSignOut }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link to="/planes" className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-1">
        <Plane className="w-4 h-4" />
        <span>Planes</span>
      </Link>
      <Link to="/salud" className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-1">
        <Heart className="w-4 h-4" />
        <span>Salud</span>
      </Link>
      <Link to="/educacion" className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-1">
        <GraduationCap className="w-4 h-4" />
        <span>Educación</span>
      </Link>
      <Link to="/foro" className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-1">
        <MessageSquare className="w-4 h-4" />
        <span>Foro</span>
      </Link>
      <Link to="/alimentacion" className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-1">
        <Apple className="w-4 h-4" />
        <span>Alimentación</span>
      </Link>
      <Link to="/ayudas" className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-1">
        <HelpCircle className="w-4 h-4" />
        <span>Ayudas</span>
      </Link>
      
      {user ? (
        <UserDropdown user={user} onSignOut={onSignOut} />
      ) : (
        <Link to="/auth">
          <Button variant="default" size="sm">
            Iniciar sesión
          </Button>
        </Link>
      )}
    </div>
  );
};

export default DesktopNav;
