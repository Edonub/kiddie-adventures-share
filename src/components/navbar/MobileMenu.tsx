
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/contexts/AuthContext";
import { ChevronDown, Plane, Heart, GraduationCap, MessageSquare, Podcast, HelpCircle } from "lucide-react";
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

  const navigationLinks = [
    { path: "/planes", icon: <Plane className="w-4 h-4" />, label: "Planes" },
    { path: "/salud", icon: <Heart className="w-4 h-4" />, label: "Salud" },
    { path: "/educacion", icon: <GraduationCap className="w-4 h-4" />, label: "Educación" },
    { path: "/foro", icon: <MessageSquare className="w-4 h-4" />, label: "Foro" },
    { path: "/podcast", icon: <Podcast className="w-4 h-4" />, label: "Podcast" },
    { path: "/ayudas", icon: <HelpCircle className="w-4 h-4" />, label: "Ayudas" }
  ];

  return (
    <div className="md:hidden mt-0.5 pt-0.5 pb-2 animate-accordion-down bg-white rounded-b-xl shadow-lg">
      <div className="space-y-1 px-2">
        {navigationLinks.map((link) => (
          <Link 
            key={link.path}
            to={link.path}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-familyxp-primary rounded-lg transition-colors"
            onClick={onClose}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="border-t my-2"></div>
      
      {user ? (
        <Collapsible
          open={isUserMenuOpen}
          onOpenChange={setIsUserMenuOpen}
          className="w-full px-2"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full px-3 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-700 text-sm flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-familyxp-primary text-white flex items-center justify-center text-xs overflow-hidden">
                {user.email ? user.email.charAt(0).toUpperCase() : "U"}
              </div>
              <span>Mi cuenta</span>
            </span>
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                isUserMenuOpen ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1 pl-8">
            <Link
              to="/configuracion"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-familyxp-primary rounded-lg transition-colors text-sm"
              onClick={onClose}
            >
              Configuración
            </Link>
            <Link
              to="/mis-posts"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-familyxp-primary rounded-lg transition-colors text-sm"
              onClick={onClose}
            >
              Mis posts
            </Link>
            <button
              onClick={handleSignOut}
              className="text-left w-full px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-familyxp-primary rounded-lg transition-colors text-sm"
            >
              Cerrar sesión
            </button>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="px-2">
          <Link
            to="/auth"
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-familyxp-primary hover:bg-familyxp-primary/90 rounded-lg transition-colors"
            onClick={onClose}
          >
            Iniciar sesión o registrarse
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
