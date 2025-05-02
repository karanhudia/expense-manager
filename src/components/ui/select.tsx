"use client";

import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
  className?: string;
}

export function Select({
  value,
  onChange,
  options,
  required,
  className,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "block w-full rounded-md border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm",
        "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
        "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
        "transition-colors duration-200",
        className
      )}
      required={required}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
} 