"use client";

import { Button } from "./button";
import { FiPlus } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export function FloatingActionButton({
  onClick,
  className,
}: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 rounded-full p-4 shadow-lg md:hidden",
        className
      )}
    >
      <FiPlus className="h-6 w-6" />
    </Button>
  );
} 