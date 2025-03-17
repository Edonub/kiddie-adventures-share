
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/contexts/AuthContext";
import { ChevronDown } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSignOut: () => Promise<void>;
}

const MobileMenu = ({ isOpen, onClose, user, onSignOut }: MobileMenuProps) => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
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
    <div className="md:hidden mt-2 border-t pt-3 pb-2 animate-accordion-down">
      {user ? (
        <Collapsible
          open={isUserMenuOpen}
          onOpenChange={setIsUserMenuOpen}
          className="w-full px-1"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full px-3 py-2.5 text-left rounded-md hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700">Mi cuenta</span>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                isUserMenuOpen ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            <Link
              to="/configuracion"
              className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-familyxp-primary rounded-md transition-colors"
              onClick={onClose}
            >
              Configuración
            </Link>
            <Link
              to="/mis-posts"
              className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-familyxp-primary rounded-md transition-colors"
              onClick={onClose}
            >
              Mis posts
            </Link>
            <button
              onClick={handleSignOut}
              className="text-left w-full px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-familyxp-primary rounded-md transition-colors"
            >
              Cerrar sesión
            </button>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Link
          to="/auth"
          className="block mx-1 px-4 py-3 text-gray-700 font-medium bg-gray-50 hover:bg-gray-100 rounded-md transition-colors hover:text-familyxp-primary"
          onClick={onClose}
        >
          Iniciar sesión
        </Link>
      )}
    </div>
  );
};

export default MobileMenu;
