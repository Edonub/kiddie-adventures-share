
import { Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingTypeSelectorProps {
  bookingType: "all" | "free" | "paid";
  setBookingType: (type: "all" | "free" | "paid") => void;
}

const BookingTypeSelector = ({
  bookingType,
  setBookingType
}: BookingTypeSelectorProps) => {
  return (
    <div className="flex rounded-full border border-gray-300 p-1">
      <Button
        variant={bookingType === "all" ? "default" : "ghost"} 
        className="rounded-full text-sm px-4"
        onClick={() => setBookingType("all")}
      >
        Todos
      </Button>
      <Button
        variant={bookingType === "free" ? "default" : "ghost"} 
        className="rounded-full text-sm px-4"
        onClick={() => setBookingType("free")}
      >
        <Tag className="mr-2 h-4 w-4" />
        Gratis
      </Button>
      <Button
        variant={bookingType === "paid" ? "default" : "ghost"} 
        className="rounded-full text-sm px-4"
        onClick={() => setBookingType("paid")}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Reservar
      </Button>
    </div>
  );
};

export default BookingTypeSelector;
