import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, containerClassName, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <Input
          ref={ref}
          className={cn(
            "w-full",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField }; 