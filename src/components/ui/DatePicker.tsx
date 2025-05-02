"use client";

import { Calendar } from "lucide-react";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <div className="relative">
      <input
        type="date"
        value={value.toISOString().split("T")[0]}
        onChange={(e) => onChange(new Date(e.target.value))}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
} 