"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerFieldProps {
  label?: string;
  selectedDate: string | Date | undefined; 
  onDateChange: (dateString: string | undefined) => void; 
  open: boolean;
  setOpen: (v: boolean) => void
}

export function DatePickerField({
  label = "Date",
  selectedDate,
  onDateChange,
  open,
  setOpen
}: DatePickerFieldProps) {

  const dateValue = selectedDate ? new Date(selectedDate) : undefined;

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onDateChange(undefined);
      return;
    }
    const isoString = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12, 0, 0, 0 
    ).toISOString();

    onDateChange(isoString);
    setOpen(false)
  };

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 font-normal text-left"
          >
            <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            {dateValue
              ? format(dateValue, "PPP")
              : <span className="text-muted-foreground">Pick a date</span>
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            mode="single"
            defaultMonth={dateValue}
            selected={dateValue}
            onSelect={handleSelect}
            
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}