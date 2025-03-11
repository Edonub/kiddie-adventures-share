
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/hooks/useMyExperiences";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, User, Users } from "lucide-react";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";

interface BookingsTabContentProps {
  bookings: Booking[];
  isLoading: boolean;
}

const BookingsTabContent: React.FC<BookingsTabContentProps> = ({ bookings, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-5 w-1/4" />
                </div>
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
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
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {booking.activity_title}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <User size={14} /> {booking.user_name} ({booking.user_email})
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>Fecha de reserva: {new Date(booking.booking_date).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} />
                  <span>{booking.adults} adultos, {booking.children} niños</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={14} />
                  <span>Creada hace {formatDistance(new Date(booking.created_at), new Date(), { locale: es })}</span>
                </div>
                <div className="font-medium">
                  Total: {booking.total_price} €
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsTabContent;
