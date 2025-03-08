
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { format } from "date-fns";

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
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div 
            className={`p-3 md:p-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer ${activeTab === "dates" ? "bg-gray-50" : ""}`}
            onClick={() => setActiveTab("dates")}
          >
            <div className="px-2">
              <div className="text-xs font-bold">Llegada</div>
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <div className="text-sm text-gray-500">
                  {dateFrom ? format(dateFrom, "dd MMM") : "Seleccionar fecha"}
                </div>
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={dateFrom}
            onSelect={setDateFrom}
            initialFocus
            className="p-2 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <div 
            className={`p-3 md:p-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200 cursor-pointer ${activeTab === "dates" ? "bg-gray-50" : ""}`}
            onClick={() => setActiveTab("dates")}
          >
            <div className="px-2">
              <div className="text-xs font-bold">Salida</div>
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <div className="text-sm text-gray-500">
                  {dateTo ? format(dateTo, "dd MMM") : "Seleccionar fecha"}
                </div>
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={dateTo}
            onSelect={setDateTo}
            initialFocus
            className="p-2 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DateSelection;
