export const expenseCategories = [
  {
    value: "intercity-travel",
    label: "Intercity Travel",
  },
  {
    value: "food",
    label: "Food",
  },
  {
    value: "local-travel",
    label: "Local Travel",
  },
] as const;

export type ExpenseCategory = typeof expenseCategories[number]["value"]; 