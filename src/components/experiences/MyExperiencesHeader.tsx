
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const MyExperiencesHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Mis Experiencias</h1>
        <p className="text-gray-600">Gestiona tus experiencias y reservas</p>
      </div>
      <Link to="/crear-actividad">
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          <span>Crear experiencia</span>
        </Button>
      </Link>
    </div>
  );
};

export default MyExperiencesHeader;
