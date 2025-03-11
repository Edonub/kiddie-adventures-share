
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const NotificationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias de Notificaciones</CardTitle>
        <CardDescription>
          Configura cómo y cuándo quieres recibir notificaciones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-500">
            Las preferencias de notificaciones se implementarán próximamente.
          </p>
          <p className="text-sm text-gray-500">
            Pronto podrás personalizar las notificaciones para nuevos temas en el foro, 
            respuestas a tus comentarios, y actualizaciones de actividades.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
