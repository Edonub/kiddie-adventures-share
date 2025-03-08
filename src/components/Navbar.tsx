
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { UserIcon, PlusIcon, LogOutIcon, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import FamilyLogo from "./FamilyLogo";

const Navbar = () => {
  const { user, signOut, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-4 sm:px-8 flex justify-between items-center bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center">
          <FamilyLogo showText={true} size="md" variant="default" />
        </Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-familyxp-dark hover:text-familyxp-primary transition-colors font-medium">Inicio</Link>
        <Link to="/explorar" className="text-familyxp-dark hover:text-familyxp-primary transition-colors font-medium">Explorar</Link>
        <Link to="/foro" className="text-familyxp-dark hover:text-familyxp-primary transition-colors font-medium">Foro</Link>
        <Link to="/blog" className="text-familyxp-dark hover:text-familyxp-primary transition-colors font-medium">Blog</Link>
        {isAdmin && (
          <Link to="/admin" className="text-familyxp-dark hover:text-familyxp-primary transition-colors font-medium">Admin</Link>
        )}
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        {user ? (
          <>
            <Link to="/crear-actividad" className="hidden md:block">
              <Button variant="ghost" className="hidden md:flex items-center gap-1">
                <PlusIcon size={16} />
                <span>Crear actividad</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer bg-familyxp-tertiary text-familyxp-primary">
                  <AvatarFallback><UserIcon size={18} /></AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Panel de Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/super-admin">Super Admin</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/perfil">Mi Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/mis-actividades">Mis Actividades</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="md:hidden" asChild>
                  <Link to="/crear-actividad">Crear Actividad</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-500">
                  <LogOutIcon size={16} className="mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link to="/auth">
            <Button>Iniciar Sesión</Button>
          </Link>
        )}
        
        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <div className="py-4">
              <div className="flex flex-col space-y-4 mt-6">
                <Link 
                  to="/" 
                  className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Inicio
                </Link>
                <Link 
                  to="/explorar" 
                  className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Explorar
                </Link>
                <Link 
                  to="/foro" 
                  className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Foro
                </Link>
                <Link 
                  to="/blog" 
                  className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Blog
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                {user && (
                  <Link 
                    to="/crear-actividad" 
                    className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Crear Actividad
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
