"use client";

import { useState } from "react";
import { Expense } from "@/types/expense";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useExpense } from "@/context/ExpenseContext";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { expenseCategories } from "@/config/expense-categories";
import { expenseRemarks } from "@/config/expense-remarks";

interface ExpenseListProps {
  expenses: Expense[];
  className?: string;
  onEdit?: (expense: Expense) => void;
}

export default function ExpenseList({ expenses, className, onEdit }: ExpenseListProps) {
  const { deleteExpense } = useExpense();
  const [expandedExpense, setExpandedExpense] = useState<string | null>(null);

  const getCategoryLabel = (category: string) => {
    const foundCategory = expenseCategories.find(c => c.value === category);
    return foundCategory ? foundCategory.label : category;
  };

  const getRemarkLabel = (remark: string) => {
    const foundRemark = expenseRemarks.find(r => r.value === remark);
    return foundRemark ? foundRemark.label : remark;
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
      } catch (error) {
        console.error("Failed to delete expense:", error);
      }
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex flex-col gap-2 rounded-lg border p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => setExpandedExpense(expandedExpense === expense.id ? null : expense.id)}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium">{getCategoryLabel(expense.category)}</h3>
              <p className="text-sm text-gray-500">{getRemarkLabel(expense.remark)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₹{expense.amount}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(expense.date), "MMM dd, yyyy")}
              </p>
            </div>
          </div>

          {expandedExpense === expense.id && (
            <div className="mt-2 pt-2 border-t flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(expense);
                }}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(expense.id);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          )}

          {expense.imageUrl && (
            <div className="mt-2">
              <img
                src={expense.imageUrl}
                alt="Expense receipt"
                className="max-h-32 w-auto rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 