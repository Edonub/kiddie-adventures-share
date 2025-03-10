
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Eye, Trash2 } from "lucide-react";

interface ExperienceCardProps {
  experience: {
    id: string;
    title: string;
    location: string;
    category: string;
    price: number;
    image_url: string;
    status: string;
    bookings: number;
  };
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img 
          src={experience.image_url} 
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        {experience.status === "draft" && (
          <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
            Borrador
          </div>
        )}
      </div>
      
      <CardContent className="pt-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg truncate">{experience.title}</h3>
          <p className="text-sm text-gray-500">{experience.location}</p>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium">
            {experience.price === 0 ? 'Gratis' : `${experience.price} €`}
          </span>
          {experience.status === "published" && (
            <span className="text-sm text-gray-500">
              {experience.bookings} {experience.bookings === 1 ? 'reserva' : 'reservas'}
            </span>
          )}
        </div>
        
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700"
            asChild
          >
            <Link to={`/actividad/${experience.id}`}>
              <Eye size={16} className="mr-1" />
              <span>Ver</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700"
            asChild
          >
            <Link to={`/editar-actividad/${experience.id}`}>
              <Edit size={16} className="mr-1" />
              <span>Editar</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-400 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} className="mr-1" />
            <span>Borrar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
