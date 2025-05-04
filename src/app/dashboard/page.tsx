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
import { FiPlus } from "react-icons/fi";
import { Expense } from "@/types/expense";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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

  // Prevent back navigation to login from dashboard (PWA/mobile)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // If on dashboard root, try to close the app or do nothing
      if (window.location.pathname === "/dashboard") {
        e.preventDefault();
        // Try to close the app (works in some PWA contexts)
        window.close();
        // If window.close() doesn't work, push the state back
        window.history.pushState(null, "", window.location.pathname);
      }
    };
    window.addEventListener("popstate", handlePopState);
    // Push a new state so the first back press triggers popstate
    if (window.location.pathname === "/dashboard") {
      window.history.pushState(null, "", window.location.pathname);
    }
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner className="min-h-screen" />;
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
      <div className="w-full bg-white flex justify-between items-center py-4 px-4 border-b border-blue-100">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="whitespace-nowrap border-blue-600 text-blue-700 hover:bg-blue-50"
        >
          Logout
        </Button>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-6 pb-8">
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow border border-blue-100 mb-2">
            <h2 className="text-xl font-semibold mb-2 text-blue-900">Welcome, {user.name}!</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
              <span className="hidden sm:inline-block h-4 w-px bg-gray-300 mx-2" />
              <p className="text-gray-700"><span className="font-medium">Company:</span> {getCompanyName(user.companyId)}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow border border-yellow-100 mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-200 text-yellow-800 rounded-full p-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-yellow-900">Pending Reimbursements</h2>
                <p className="text-sm text-yellow-700">
                  {pendingExpenses.length} expense{pendingExpenses.length !== 1 && 's'} pending
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-3xl font-extrabold text-yellow-900">₹{totalPendingAmount.toFixed(2)}</p>
              <Button 
                className="hidden md:flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-semibold border-none"
                onClick={() => {
                  setEditingExpense(null);
                  setIsAddExpenseOpen(true);
                }}
              >
                <FiPlus className="h-5 w-5" />
                Add Expense
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h3m-7 6h7a2 2 0 002-2v-5a2 2 0 00-2-2h-3a4 4 0 00-4 4v2m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2" /></svg>
              Recent Expenses
            </h2>
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