
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserIcon, LogOutIcon, Menu, Globe, SearchIcon } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import FamilyLogo from "./FamilyLogo";

const Navbar = () => {
  const { user, signOut, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="w-full py-4 px-4 sm:px-8 flex justify-between items-center bg-white border-b border-gray-200">
      {isMobile && (
        <div className="md:hidden flex items-center gap-2 w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden p-1">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <div className="py-4">
                <div className="flex flex-col space-y-4 mt-6">
                  <Link 
                    to="/" 
                    className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Experiencias
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
                  {/* Removed standalone "Crear Experiencia" link from mobile menu */}
                  {!user && (
                    <>
                      <Link 
                        to="/auth" 
                        className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        Iniciar sesión
                      </Link>
                      <Link 
                        to="/auth?signup=true" 
                        className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center">
              <FamilyLogo showText={true} size="md" variant="default" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/explorar">
              <Button variant="ghost" size="icon" className="p-1">
                <SearchIcon size={22} />
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full flex items-center border border-gray-300 shadow-sm hover:shadow-md transition-all p-1 h-auto">
                    <Avatar className="h-8 w-8 bg-gray-200">
                      <AvatarImage 
                        src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=User&background=random"} 
                        alt="Profile" 
                      />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/perfil">Mi Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/mis-actividades">Mis Experiencias</Link>
                  </DropdownMenuItem>
                  {/* Added "Crear Experiencia" as a prominent option in the user dropdown */}
                  <DropdownMenuItem asChild className="font-medium text-familea-primary">
                    <Link to="/crear-actividad">Crear Experiencia</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Panel de Admin</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/super-admin">Super Admin</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-500">
                    <LogOutIcon size={16} className="mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full flex items-center border border-gray-300 shadow-sm hover:shadow-md transition-all p-1 h-auto">
                    <Avatar className="h-8 w-8 bg-gray-200">
                      <AvatarFallback><UserIcon size={18} /></AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/auth">Iniciar sesión</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/auth?signup=true">Registrarse</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/centro-ayuda">Centro de ayuda</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      )}

      {!isMobile && (
        <>
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <FamilyLogo showText={true} size="md" variant="default" />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-gray-800 hover:text-familea-primary transition-colors">Experiencias</Link>
            <Link to="/foro" className="font-medium text-gray-800 hover:text-familea-primary transition-colors">Foro</Link>
            <Link to="/blog" className="font-medium text-gray-800 hover:text-familea-primary transition-colors">Blog</Link>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            {/* Removed standalone "Crear Experiencia" button from desktop view */}
            
            <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
              <Globe size={20} />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2 border border-gray-300 shadow-sm hover:shadow-md transition-all p-1 h-auto">
                    <Menu size={18} />
                    <Avatar className="h-6 w-6 bg-gray-200">
                      <AvatarImage 
                        src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=User&background=random"} 
                        alt="Profile" 
                      />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/perfil">Mi Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/mis-actividades">Mis Experiencias</Link>
                  </DropdownMenuItem>
                  {/* Added "Crear Experiencia" as a prominent option in the user dropdown */}
                  <DropdownMenuItem asChild className="font-medium text-familea-primary">
                    <Link to="/crear-actividad">Crear Experiencia</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Panel de Admin</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/super-admin">Super Admin</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-500">
                    <LogOutIcon size={16} className="mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2 border border-gray-300 shadow-sm hover:shadow-md transition-all p-1 h-auto">
                    <Menu size={18} />
                    <Avatar className="h-6 w-6 bg-gray-200">
                      <AvatarFallback><UserIcon size={14} /></AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/auth">Iniciar sesión</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/auth?signup=true">Registrarse</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/centro-ayuda">Centro de ayuda</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
