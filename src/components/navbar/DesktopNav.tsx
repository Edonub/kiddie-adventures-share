
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "@/contexts/AuthContext";
import UserDropdown from "./UserDropdown";
import { Plane, Heart, GraduationCap, MessageSquare, Podcast, HelpCircle } from "lucide-react";

interface DesktopNavProps {
  user: User | null;
  onSignOut: () => Promise<void>;
}

const DesktopNav = ({ user, onSignOut }: DesktopNavProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="hidden md:flex items-center space-x-1">
      <NavLink to="/planes" active={isActive("/planes")}>
        <Plane className="w-4 h-4" />
        <span>Planes</span>
      </NavLink>
      
      <NavLink to="/salud" active={isActive("/salud")}>
        <Heart className="w-4 h-4" />
        <span>Salud</span>
      </NavLink>
      
      <NavLink to="/educacion" active={isActive("/educacion")}>
        <GraduationCap className="w-4 h-4" />
        <span>Educación</span>
      </NavLink>
      
      <NavLink to="/foro" active={isActive("/foro")}>
        <MessageSquare className="w-4 h-4" />
        <span>Foro</span>
      </NavLink>
      
      <NavLink to="/podcast" active={isActive("/podcast")}>
        <Podcast className="w-4 h-4" />
        <span>Podcast</span>
      </NavLink>
      
      <NavLink to="/ayudas" active={isActive("/ayudas")}>
        <HelpCircle className="w-4 h-4" />
        <span>Ayudas</span>
      </NavLink>
      
      {user ? (
        <UserDropdown user={user} onSignOut={onSignOut} />
      ) : (
        <Link to="/auth">
          <Button variant="default" size="sm" className="ml-2">
            Iniciar sesión
          </Button>
        </Link>
      )}
    </div>
  );
};

// Helper component for navigation links
const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-colors ${
      active 
        ? "bg-gray-100 text-familyxp-primary"
        : "text-gray-700 hover:bg-gray-50 hover:text-familyxp-primary"
    }`}
  >
    {children}
  </Link>
);

export default DesktopNav;
