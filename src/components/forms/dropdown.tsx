import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FiChevronDown } from "react-icons/fi";

interface DropdownProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function Dropdown<T extends string>({
  value,
  onChange,
  options,
  label,
  placeholder = "Select an option",
  error,
  className,
}: DropdownProps<T>) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between",
              error && "border-red-500 focus:ring-red-500"
            )}
          >
            {selectedOption?.label || placeholder}
            <FiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
} 