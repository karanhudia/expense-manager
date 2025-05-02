import { ExpenseCategory } from "@/config/expense-categories";
import { ExpenseRemark } from "@/config/expense-remarks";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  remark: ExpenseRemark;
  date: Date;
  imageUrl?: string;
  isReimbursed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface CreateExpenseInput {
  amount: number;
  category: ExpenseCategory;
  remark: ExpenseRemark;
  date: string;
  imageUrl?: string;
}

export interface UpdateExpenseInput extends CreateExpenseInput {
  isReimbursed?: boolean;
}
