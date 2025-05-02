"use client";

import { cn } from "@/lib/utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export function TextField({
  label,
  error,
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        className={cn(
          "block w-full rounded-md border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm",
          "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
          "placeholder:text-gray-400",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
          "transition-colors duration-200",
          error && "border-red-300 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 