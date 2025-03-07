
import { useState, useEffect } from "react";
import { addDays, format, isSameDay, isWithinInterval, startOfDay, endOfDay, isSaturday, isSunday, startOfWeek, endOfWeek, isWeekend, isToday } from "date-fns";
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
}

const DateRangePicker = ({
  className = "",
  onChange,
  initialDateRange,
}: DateRangePickerProps) => {
  const [dateRange, setDateRange] = useState<DateRange>(
    initialDateRange ?? { from: undefined, to: undefined }
  );
  const [isOpen, setIsOpen] = useState(false);

  // Preset date range options
  const presets = [
    {
      name: "Fin de semana",
      getValue: () => {
        const today = new Date();
        const daysUntilFriday = (5 + 7 - today.getDay()) % 7;
        const friday = addDays(today, daysUntilFriday);
        const sunday = addDays(friday, 2);
        return { from: friday, to: sunday };
      },
    },
    {
      name: "Semana",
      getValue: () => {
        const today = new Date();
        const monday = startOfWeek(today, { weekStartsOn: 1 });
        const sunday = endOfWeek(today, { weekStartsOn: 1 });
        return { from: monday, to: sunday };
      },
    },
    {
      name: "Próxima semana",
      getValue: () => {
        const today = new Date();
        const nextMonday = addDays(startOfWeek(today, { weekStartsOn: 1 }), 7);
        const nextSunday = addDays(endOfWeek(today, { weekStartsOn: 1 }), 7);
        return { from: nextMonday, to: nextSunday };
      },
    },
    {
      name: "Mes",
      getValue: () => {
        const today = new Date();
        const firstDayNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        const lastDayCurrentMonth = new Date(firstDayNextMonth.getTime() - 86400000);
        return { from: today, to: lastDayCurrentMonth };
      },
    },
  ];

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

  const handlePresetSelect = (preset: typeof presets[0]) => {
    const range = preset.getValue();
    setDateRange(range);
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
          "h-9 w-9 p-0 font-normal",
          isSelected && "bg-primary text-primary-foreground",
          isRangeStart && "rounded-l-md",
          isRangeEnd && "rounded-r-md",
          isInRange && !isRangeStart && !isRangeEnd && "bg-familyxp-tertiary",
          isWeekendDay && "text-familyxp-primary font-semibold",
          isToday(day) && "border border-familyxp-primary"
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
          <div className="flex flex-col p-4 gap-2 md:flex-row md:gap-6">
            <div className="space-y-4">
              <h2 className="font-medium text-sm">Selección rápida</h2>
              <div className="flex flex-col space-y-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    className="text-sm justify-start font-normal"
                    onClick={() => handlePresetSelect(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  day_range_start: "day-range-start",
                  day_range_end: "day-range-end",
                  day_range_middle: "bg-familyxp-tertiary day-range-middle",
                }}
                components={{
                  IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
                  IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
                }}
              />
              
              <Calendar
                mode="range"
                defaultMonth={dateRange.from ? addDays(dateRange.from, 31) : undefined}
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
                className={cn("p-3 pointer-events-auto rounded-md border hidden md:block")}
                classNames={{
                  day_range_start: "day-range-start",
                  day_range_end: "day-range-end",
                  day_range_middle: "bg-familyxp-tertiary day-range-middle",
                }}
                components={{
                  IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
                  IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
                }}
              />
            </div>
          </div>
          
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
