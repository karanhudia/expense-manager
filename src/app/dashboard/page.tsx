"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useExpense } from "@/context/ExpenseContext";
import { Button } from "@/components/ui/button";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { companies } from "@/config/companies";
import AddExpenseForm from "@/components/expenses/AddExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";
import { Plus } from "lucide-react";
import { Expense } from "@/types/expense";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const { expenses, loading: expensesLoading } = useExpense();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getCompanyName = (companyId: string) => {
    const company = companies.find(c => c.value === companyId);
    return company ? company.label : companyId;
  };

  const pendingExpenses = expenses.filter(expense => !expense.isReimbursed);
  const totalPendingAmount = pendingExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="whitespace-nowrap">
            Logout
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Welcome, {user.name}!</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Company: {getCompanyName(user.companyId)}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold">Pending Reimbursements</h2>
                <p className="text-sm text-gray-500">
                  {pendingExpenses.length} expenses pending
                </p>
              </div>
              <Button 
                className="hidden md:flex items-center gap-2"
                onClick={() => {
                  setEditingExpense(null);
                  setIsAddExpenseOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </div>
            <p className="text-2xl font-bold">₹{totalPendingAmount.toFixed(2)}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
            {expensesLoading ? (
              <p className="text-gray-500">Loading expenses...</p>
            ) : expenses.length === 0 ? (
              <p className="text-gray-500">No expenses yet</p>
            ) : (
              <ExpenseList 
                expenses={expenses.slice(0, 5)} 
                onEdit={(expense) => {
                  setEditingExpense(expense);
                  setIsAddExpenseOpen(true);
                }}
              />
            )}
          </div>
        </div>

        <FloatingActionButton onClick={() => {
          setEditingExpense(null);
          setIsAddExpenseOpen(true);
        }} />

        <BottomSheet isOpen={isAddExpenseOpen} onClose={() => {
          setIsAddExpenseOpen(false);
          setEditingExpense(null);
        }}>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {editingExpense ? "Edit Expense" : "Add New Expense"}
            </h2>
          </div>
          <AddExpenseForm 
            expense={editingExpense}
            onSuccess={() => {
              setIsAddExpenseOpen(false);
              setEditingExpense(null);
            }} 
          />
        </BottomSheet>
      </div>
    </div>
  );
} 