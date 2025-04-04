
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Plane, Heart, GraduationCap, MessageSquare, Podcast } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  
  const routes = [
    { name: "Planes", path: "/planes", icon: Plane },
    { name: "Salud", path: "/salud", icon: Heart },
    { name: "Educación", path: "/educacion", icon: GraduationCap },
    { name: "Foro", path: "/foro", icon: MessageSquare },
    { name: "Podcast", path: "/podcast", icon: Podcast },
    { name: "Viajes", path: "/viajes", icon: Plane }, // Using Plane icon again for Viajes
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

export default BottomNavigation;
