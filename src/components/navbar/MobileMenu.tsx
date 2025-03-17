
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/contexts/AuthContext";
import { Plane, Heart, GraduationCap, MessageSquare, Apple, HelpCircle } from "lucide-react";

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
        <Link
          to="/planes"
          className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-2"
          onClick={onClose}
        >
          <Plane className="w-4 h-4" /> Planes
        </Link>
        <Link
          to="/salud"
          className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-2"
          onClick={onClose}
        >
          <Heart className="w-4 h-4" /> Salud
        </Link>
        <Link
          to="/educacion"
          className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-2"
          onClick={onClose}
        >
          <GraduationCap className="w-4 h-4" /> Educación
        </Link>
        <Link
          to="/foro"
          className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-2"
          onClick={onClose}
        >
          <MessageSquare className="w-4 h-4" /> Foro
        </Link>
        <Link
          to="/alimentacion"
          className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-2"
          onClick={onClose}
        >
          <Apple className="w-4 h-4" /> Alimentación
        </Link>
        <Link
          to="/ayudas"
          className="text-gray-700 hover:text-familyxp-primary font-medium flex items-center gap-2"
          onClick={onClose}
        >
          <HelpCircle className="w-4 h-4" /> Ayudas
        </Link>
        
        {user ? (
          <>
            <Link
              to="/perfil"
              className="text-gray-700 hover:text-familyxp-primary font-medium"
              onClick={onClose}
            >
              Mi Perfil
            </Link>
            <Link
              to="/mis-experiencias"
              className="text-gray-700 hover:text-familyxp-primary font-medium"
              onClick={onClose}
            >
              Mis Experiencias
            </Link>
            <Link
              to="/crear-actividad"
              className="text-gray-700 hover:text-familyxp-primary font-medium"
              onClick={onClose}
            >
              Crear Experiencia
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
