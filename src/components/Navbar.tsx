
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Plus, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import FamilyLogo from "./FamilyLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FamilyLogo />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-familyxp-primary font-medium">
              Experiencias
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-familyxp-primary font-medium"
            >
              Blog
            </Link>
            <Link
              to="/foro"
              className="text-gray-700 hover:text-familyxp-primary font-medium"
            >
              Foro
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-familyxp-primary text-white">
                        {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Mi Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/mis-experiencias" className="cursor-pointer">
                      <Bookmark className="mr-2 h-4 w-4" />
                      <span>Mis Experiencias</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/crear-actividad" className="cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Crear Experiencia</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user && user.app_metadata?.provider === "email" && (
                    <>
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar sesión</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <Link to="/perfil" className="mr-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-familyxp-primary text-white text-xs">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-familyxp-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-familyxp-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Experiencias
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-familyxp-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/foro"
                className="text-gray-700 hover:text-familyxp-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Foro
              </Link>
              {user ? (
                <>
                  <Link
                    to="/perfil"
                    className="text-gray-700 hover:text-familyxp-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/mis-experiencias"
                    className="text-gray-700 hover:text-familyxp-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mis Experiencias
                  </Link>
                  <Link
                    to="/crear-actividad"
                    className="text-gray-700 hover:text-familyxp-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Crear Experiencia
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
