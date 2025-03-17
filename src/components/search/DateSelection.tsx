
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

interface DateSelectionProps {
  activeTab: string;
  setActiveTab: (tab: "destination" | "dates" | "guests") => void;
  dateFrom: Date | undefined;
  setDateFrom: (date: Date | undefined) => void;
  dateTo: Date | undefined;
  setDateTo: (date: Date | undefined) => void;
}

const DateSelection = ({ 
  activeTab, 
  setActiveTab, 
  dateFrom, 
  setDateFrom, 
  dateTo, 
  setDateTo 
}: DateSelectionProps) => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<DateRange | undefined>({
    from: dateFrom,
    to: dateTo
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    setDateFrom(range?.from);
    setDateTo(range?.to);
  };

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex justify-between items-center w-full h-9 px-2 py-1 bg-white">
            <CalendarIcon size={16} className="text-gray-500 mr-1" />
            <span className="flex-1 text-left text-xs text-gray-500 truncate">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd MMM")} - {format(date.to, "dd MMM")}
                  </>
                ) : (
                  format(date.from, "dd MMM")
                )
              ) : (
                "Fechas"
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="p-3 pointer-events-auto"
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div 
          className={`p-2 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer ${activeTab === "dates" ? "bg-gray-50" : ""}`}
          onClick={() => setActiveTab("dates")}
        >
          <div className="px-1">
            <div className="text-xs font-bold">Fecha</div>
            <div className="flex items-center">
              <CalendarIcon size={14} className="text-gray-500 mr-1" />
              <div className="text-xs text-gray-500">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd MMM")} - {format(date.to, "dd MMM")}
                    </>
                  ) : (
                    format(date.from, "dd MMM")
                  )
                ) : (
                  "Seleccionar fechas"
                )}
              </div>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          className="p-3 pointer-events-auto"
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelection;
