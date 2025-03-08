
import { useState, useEffect } from "react";
import { format, addDays, isSameDay, isWithinInterval, startOfDay, endOfDay, isSaturday, isSunday, startOfWeek, endOfWeek, isWeekend, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "./ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

interface DateRangePickerProps {
  className?: string;
  onChange?: (dateRange: DateRange) => void;
  initialDateRange?: DateRange;
  showDirect?: boolean;
}

const DateRangePicker = ({
  className = "",
  onChange,
  initialDateRange,
  showDirect = false,
}: DateRangePickerProps) => {
  const [dateRange, setDateRange] = useState<DateRange>(
    initialDateRange ?? { from: undefined, to: undefined }
  );
  const [isOpen, setIsOpen] = useState(showDirect);

  useEffect(() => {
    if (onChange && (dateRange.from || dateRange.to)) {
      onChange(dateRange);
    }
  }, [dateRange, onChange]);

  const handleSelect = (day: Date | undefined) => {
    if (!day) return;

    setDateRange((prev) => {
      // If no date is selected or both dates are selected, start a new range
      if (!prev.from || (prev.from && prev.to)) {
        return { from: day, to: undefined };
      }

      // If start date is selected, complete the range
      if (prev.from && !prev.to && day >= prev.from) {
        return { from: prev.from, to: day };
      }

      // If selected date is before start date, make it the new start date
      return { from: day, to: undefined };
    });
  };

  // Custom day renderer for the calendar
  const dayRenderer = (day: Date, modifiers: any = {}) => {
    const isSelected = modifiers.selected;
    const isRangeStart = dateRange.from && isSameDay(day, dateRange.from);
    const isRangeEnd = dateRange.to && isSameDay(day, dateRange.to);
    const isInRange =
      dateRange.from &&
      dateRange.to &&
      isWithinInterval(day, {
        start: startOfDay(dateRange.from),
        end: endOfDay(dateRange.to),
      });
    const isWeekendDay = isWeekend(day);

    return (
      <div
        className={cn(
          "h-7 w-8 p-0 font-normal text-xs", // Smaller height and text
          isSelected && "bg-primary text-primary-foreground",
          isRangeStart && "rounded-l-md",
          isRangeEnd && "rounded-r-md",
          isInRange && !isRangeStart && !isRangeEnd && "bg-familea-tertiary",
          isWeekendDay && "text-familea-primary font-semibold",
          isToday(day) && "border border-familea-primary"
        )}
      >
        {format(day, "d")}
      </div>
    );
  };

  const dateDisplay = () => {
    if (!dateRange.from) return "Selecciona fechas";
    
    const fromFormatted = format(dateRange.from, "dd MMM", { locale: es });
    
    if (!dateRange.to) return `Desde ${fromFormatted}`;
    
    const toFormatted = format(dateRange.to, "dd MMM", { locale: es });
    return `${fromFormatted} - ${toFormatted}`;
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal py-6 border",
              !dateRange.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{dateDisplay()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange.from}
            selected={{
              from: dateRange.from,
              to: dateRange.to,
            }}
            onSelect={(range) => {
              if (range?.from) {
                setDateRange({ from: range.from, to: range.to });
              }
            }}
            numberOfMonths={1}
            locale={es}
            className={cn("p-3 pointer-events-auto rounded-md border")}
            classNames={{
              month: "space-y-2", // Reduced spacing
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100" // Smaller buttons
              ),
              day_range_start: "day-range-start",
              day_range_end: "day-range-end",
              day_range_middle: "bg-familea-tertiary day-range-middle",
              table: "w-full border-collapse space-y-0.5", // Reduced spacing
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.7rem]", // Smaller text
              row: "flex w-full mt-1", // Reduced spacing
              cell: "h-7 w-8 text-center text-sm p-0 relative", // Smaller cells
              day: "h-7 w-8 p-0 font-normal text-xs aria-selected:opacity-100" // Smaller height and text
            }}
            components={{
              IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
              IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
            }}
          />
          
          <div className="flex items-center justify-between p-4 border-t">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Aplicar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
