
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
    <div className="md:hidden mt-0.5 border-t pt-0.5 pb-0.5 animate-accordion-down">
      {user ? (
        <Collapsible
          open={isUserMenuOpen}
          onOpenChange={setIsUserMenuOpen}
          className="w-full px-1"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full px-2 py-0.5 text-left rounded-md hover:bg-gray-100 transition-colors">
            <span className="font-medium text-gray-700 text-sm">Mi cuenta</span>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                isUserMenuOpen ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-0.5 mt-0.5">
            <Link
              to="/configuracion"
              className="block px-3 py-0.5 text-gray-700 hover:bg-gray-100 hover:text-familyxp-primary rounded-md transition-colors text-xs"
              onClick={onClose}
            >
              Configuración
            </Link>
            <Link
              to="/mis-posts"
              className="block px-3 py-0.5 text-gray-700 hover:bg-gray-100 hover:text-familyxp-primary rounded-md transition-colors text-xs"
              onClick={onClose}
            >
              Mis posts
            </Link>
            <button
              onClick={handleSignOut}
              className="text-left w-full px-3 py-0.5 text-gray-700 hover:bg-gray-100 hover:text-familyxp-primary rounded-md transition-colors text-xs"
            >
              Cerrar sesión
            </button>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="flex justify-end mx-1">
          <Link
            to="/auth"
            className="px-3 py-0.5 text-gray-700 font-medium bg-gray-50 hover:bg-gray-100 rounded-md transition-colors hover:text-familyxp-primary text-xs"
            onClick={onClose}
          >
            Iniciar sesión
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
