"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ExpenseProvider } from "@/context/ExpenseContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ExpenseProvider>{children}</ExpenseProvider>
    </AuthProvider>
  );
} 