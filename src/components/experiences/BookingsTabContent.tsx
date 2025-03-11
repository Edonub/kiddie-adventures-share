
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const BookingsTabContent: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            Aquí podrás ver las reservas que otros usuarios han hecho para tus experiencias.
          </p>
          <p className="text-gray-500">
            Actualmente no hay reservas para mostrar.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsTabContent;
