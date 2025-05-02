"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Expense, CreateExpenseInput, UpdateExpenseInput } from "@/types/expense";
import { expenseService } from "@/services/expenseService";

interface ExpenseContextType {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  addExpense: (expense: CreateExpenseInput) => Promise<void>;
  updateExpense: (id: string, expense: UpdateExpenseInput) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  refreshExpenses: () => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await expenseService.getExpenses();
      setExpenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshExpenses();
  }, []);

  const addExpense = async (expense: CreateExpenseInput) => {
    try {
      setError(null);
      const newExpense = await expenseService.createExpense(expense);
      setExpenses((prev) => [newExpense, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create expense");
      throw err;
    }
  };

  const updateExpense = async (id: string, expense: UpdateExpenseInput) => {
    try {
      setError(null);
      const updatedExpense = await expenseService.updateExpense(id, expense);
      setExpenses((prev) =>
        prev.map((e) => (e.id === id ? updatedExpense : e))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update expense");
      throw err;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      setError(null);
      await expenseService.deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete expense");
      throw err;
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        addExpense,
        updateExpense,
        deleteExpense,
        refreshExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
} 