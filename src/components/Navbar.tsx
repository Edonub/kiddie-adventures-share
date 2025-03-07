import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { UserIcon, PlusIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FamilyLogo from "./FamilyLogo";

const Navbar = () => {
  const { user, signOut, isAdmin } = useAuth();

  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center">
          <FamilyLogo />
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
      
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link to="/crear-actividad">
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
                  <Link to="/perfil">Mi Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/mis-actividades">Mis Actividades</Link>
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
      </div>
    </nav>
  );
};

export default Navbar;
