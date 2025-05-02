import { CreateExpenseInput, Expense, UpdateExpenseInput } from "@/types/expense";

const API_URL = "/api/expenses";

export const expenseService = {
  // Get all expenses
  async getExpenses(): Promise<Expense[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }
    const data = await response.json();
    return data.expenses;
  },

  // Create a new expense
  async createExpense(expense: CreateExpenseInput): Promise<Expense> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error("Failed to create expense");
    }
    const data = await response.json();
    return data.expense;
  },

  // Update an expense
  async updateExpense(id: string, expense: UpdateExpenseInput): Promise<Expense> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error("Failed to update expense");
    }
    const data = await response.json();
    return data.expense;
  },

  // Delete an expense
  async deleteExpense(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete expense");
    }
  },
}; 