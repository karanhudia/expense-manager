"use client";

import { useState, useEffect } from "react";
import { useExpense } from "@/context/ExpenseContext";
import { CreateExpenseInput } from "@/types/expense";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { DatePicker } from "@/components/ui/date-picker";
import { TextField } from "@/components/forms/text-field";
import { expenseCategories } from "@/config/expense-categories";
import { expenseRemarks } from "@/config/expense-remarks";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

interface AddExpenseFormProps {
  expense?: (CreateExpenseInput & { id?: string });
  onSuccess?: () => void;
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return /Mobi|Android/i.test(window.navigator.userAgent);
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
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (expense && expense.id) {
        await updateExpense(expense.id, formData);
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
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value as typeof prev.category }))
          }
          required
          className="block w-full rounded-md border border-gray-300 px-4 py-2.5 pr-10 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200 appearance-none bg-white"
          style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M4 6l4 4 4-4\' stroke=\'%236B7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E") no-repeat right 0.75rem center/1.25rem 1.25rem' }}
        >
          <option value="">Select an option</option>
          {expenseCategories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Remark
        </label>
        <select
          value={formData.remark}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, remark: e.target.value as typeof prev.remark }))
          }
          className="block w-full rounded-md border border-gray-300 px-4 py-2.5 pr-10 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200 appearance-none bg-white"
          style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M4 6l4 4 4-4\' stroke=\'%236B7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E") no-repeat right 0.75rem center/1.25rem 1.25rem' }}
        >
          <option value="">Select an option</option>
          {expenseRemarks.map((rem) => (
            <option key={rem.value} value={rem.value}>{rem.label}</option>
          ))}
        </select>
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