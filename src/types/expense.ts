import { ExpenseCategory } from "@/config/expense-categories";
import { ExpenseRemark } from "@/config/expense-remarks";

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  remark: ExpenseRemark;
  date: Date;
  imageUrl: string | null;
  userId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  isReimbursed: boolean;
}

export interface CreateExpenseInput {
  amount: number;
  category: ExpenseCategory;
  remark: ExpenseRemark;
  date: Date;
  imageUrl: string | null;
}

export interface UpdateExpenseInput extends Partial<CreateExpenseInput> {
  id: string;
} 