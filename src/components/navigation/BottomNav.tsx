
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Calendar, MessageSquare, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const routes = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Explorar", path: "/explorar", icon: Search },
    { name: "Experiencias", path: "/crear-actividad", icon: Calendar },
    { name: "Foro", path: "/foro", icon: MessageSquare },
    { name: "Perfil", path: "/configuracion", icon: User },
    { name: "Más", path: "/grupos", icon: Menu },
  ];

  return (
    <div className="fixed bottom-0 w-full border-t border-gray-200 bg-white py-2 md:hidden z-50">
      <div className="flex justify-around items-center">
        {routes.map((route) => {
          const isActive = location.pathname === route.path;
          const Icon = route.icon;
          
          return (
            <Link 
              key={route.path} 
              to={route.path} 
              className="flex flex-col items-center"
            >
              <div 
                className={cn(
                  "p-1 rounded-full",
                  isActive ? "text-familyxp-primary" : "text-gray-500"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-xs",
                isActive ? "text-familyxp-primary font-medium" : "text-gray-500"
              )}>
                {route.name}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Adding padding at the bottom for iOS devices with home indicator */}
      <div className="h-safe-area-bottom bg-white" />
    </div>
  );
};

export default BottomNav;
