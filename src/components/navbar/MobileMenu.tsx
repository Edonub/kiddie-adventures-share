
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/contexts/AuthContext";
import { Plane, Heart, GraduationCap, MessageSquare, Podcast, HelpCircle } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSignOut: () => Promise<void>;
}

const MobileMenu = ({ isOpen, onClose, user, onSignOut }: MobileMenuProps) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleSignOut = async () => {
    try {
      await onSignOut();
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="md:hidden mt-4 border-t pt-4">
      <div className="flex flex-col space-y-3">
        {user ? (
          <>
            <Link
              to="/configuracion"
              className="text-gray-700 hover:text-familyxp-primary font-medium"
              onClick={onClose}
            >
              Configuración
            </Link>
            <Link
              to="/mis-posts"
              className="text-gray-700 hover:text-familyxp-primary font-medium"
              onClick={onClose}
            >
              Mis posts
            </Link>
            <button
              onClick={handleSignOut}
              className="text-left text-gray-700 hover:text-familyxp-primary font-medium"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="text-gray-700 hover:text-familyxp-primary font-medium"
            onClick={onClose}
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
