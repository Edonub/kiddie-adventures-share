
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

interface ExperienceEmptyStateProps {
  type: "published" | "draft";
}

const ExperienceEmptyState: React.FC<ExperienceEmptyStateProps> = ({ type }) => {
  const message = type === "published" 
    ? "No tienes experiencias publicadas."
    : "No tienes borradores de experiencias.";

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 mb-4">{message}</p>
          <Link to="/crear-actividad">
            <Button variant="outline" className="flex items-center gap-2">
              <PlusCircle size={18} />
              <span>Crear experiencia</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceEmptyState;
