
import React from "react";
import { Link } from "react-router-dom";
import { User } from "@/contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSignOut: () => Promise<void>;
}

const MobileMenu = ({ isOpen, onClose, user, onSignOut }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 border-t pt-4">
      <div className="flex flex-col space-y-3">
        <Link
          to="/"
          className="text-gray-700 hover:text-familyxp-primary font-medium"
          onClick={onClose}
        >
          Experiencias
        </Link>
        <Link
          to="/foro"
          className="text-gray-700 hover:text-familyxp-primary font-medium"
          onClick={onClose}
        >
          Foro
        </Link>
        <Link
          to="/blog"
          className="text-gray-700 hover:text-familyxp-primary font-medium"
          onClick={onClose}
        >
          Blog
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
              onClick={() => {
                onSignOut();
                onClose();
              }}
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
