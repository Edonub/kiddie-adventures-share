
import { Tag, Calendar, ListFilter } from "lucide-react";
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
    <div className="bg-gray-100 rounded-full p-1 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-full h-8 px-2.5 transition-all ${bookingType === "all" ? "bg-white text-familyxp-primary shadow-sm" : "text-gray-600 hover:text-familyxp-primary"}`}
          onClick={() => setBookingType("all")}
        >
          <ListFilter className="w-4 h-4 mr-1.5" />
          <span className="text-xs font-medium">Todos</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-full h-8 px-2.5 transition-all ${bookingType === "free" ? "bg-white text-familyxp-primary shadow-sm" : "text-gray-600 hover:text-familyxp-primary"}`}
          onClick={() => setBookingType("free")}
        >
          <Tag className="w-4 h-4 mr-1.5" />
          <span className="text-xs font-medium">Gratis</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-full h-8 px-2.5 transition-all ${bookingType === "paid" ? "bg-white text-familyxp-primary shadow-sm" : "text-gray-600 hover:text-familyxp-primary"}`}
          onClick={() => setBookingType("paid")}
        >
          <Calendar className="w-4 h-4 mr-1.5" />
          <span className="text-xs font-medium">Reservar</span>
        </Button>
      </div>
    </div>
  );
};

export default BookingTypeSelector;
