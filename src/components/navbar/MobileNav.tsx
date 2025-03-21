
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/contexts/AuthContext";

interface MobileNavProps {
  user: User | null;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileNav = ({ user, isMenuOpen, toggleMenu }: MobileNavProps) => {
  return (
    <div className="md:hidden flex items-center">
      {user && (
        <Link to="/perfil" className="mr-2">
          <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-familyxp-primary text-white text-xs">
              {user.email ? user.email.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </Link>
      )}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default MobileNav;
