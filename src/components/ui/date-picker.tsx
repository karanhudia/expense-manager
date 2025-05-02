"use client";

import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  className?: string;
}

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  return (
    <input
      type="date"
      value={value.toISOString().split("T")[0]}
      onChange={(e) => {
        const date = new Date(e.target.value);
        onChange(date);
      }}
      className={cn(
        "w-full h-10 px-4 py-2",
        "border border-gray-300 rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "appearance-none bg-white",
        className
      )}
    />
  );
} 