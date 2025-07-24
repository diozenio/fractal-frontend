"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/ui/primitives/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/primitives/popover";
import { Calendar } from "@/ui/primitives/calendar";

interface DatePickerProps {
  defaultDate?: string | null;
}

export function DatePicker({ defaultDate }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultDate ? new Date(defaultDate) : undefined
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-fit justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP", { locale: ptBR })
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          formatters={{
            formatMonthCaption: (date, options) =>
              date.toLocaleString("pt-BR", { month: "long", ...options }),
            formatWeekdayName: (date, options) =>
              date.toLocaleString("pt-BR", { weekday: "narrow", ...options }),
          }}
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
