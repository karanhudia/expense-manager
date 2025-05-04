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
        "fixed bottom-6 right-6 rounded-full p-8 shadow-2xl md:hidden z-50",
        className
      )}
    >
      <FiPlus className="h-14 w-14" />
    </Button>
  );
} 