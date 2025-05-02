"use client";

import { useState } from "react";
import { useExpense } from "@/context/ExpenseContext";
import { CreateExpenseInput } from "@/types/expense";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { DatePicker } from "@/components/ui/DatePicker";
import { TextField } from "@/components/forms/text-field";
import { expenseCategories } from "@/config/expense-categories";
import { expenseRemarks } from "@/config/expense-remarks";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

interface AddExpenseFormProps {
  expense?: CreateExpenseInput;
  onSuccess?: () => void;
}

export default function AddExpenseForm({ expense, onSuccess }: AddExpenseFormProps) {
  const { addExpense, updateExpense } = useExpense();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateExpenseInput>({
    amount: expense?.amount || 0,
    category: expense?.category || "",
    remark: expense?.remark || "",
    date: expense?.date || new Date().toISOString().split("T")[0],
    imageUrl: expense?.imageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (expense) {
        await updateExpense(expense.id!, formData);
      } else {
        await addExpense(formData);
      }
      setFormData({
        amount: 0,
        category: "",
        remark: "",
        date: new Date().toISOString().split("T")[0],
        imageUrl: "",
      });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to add expense:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Amount (₹)"
        type="number"
        value={formData.amount}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            amount: parseFloat(e.target.value),
          }))
        }
        required
        min="0"
        step="0.01"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <Select
          value={formData.category}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
          options={expenseCategories}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Remark
        </label>
        <Select
          value={formData.remark}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, remark: value }))
          }
          options={expenseRemarks}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <DatePicker
          value={new Date(formData.date)}
          onChange={(date) =>
            setFormData((prev) => ({
              ...prev,
              date: date.toISOString().split("T")[0],
            }))
          }
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Receipt Image
        </label>
        <ImageUpload onUpload={handleImageUpload} />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Saving..." : expense ? "Update Expense" : "Add Expense"}
      </Button>
    </form>
  );
} 