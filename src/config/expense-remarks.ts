export const expenseRemarks = [
  {
    value: "swiggy",
    label: "Swiggy",
  },
  {
    value: "zomato",
    label: "Zomato",
  },
  {
    value: "flights",
    label: "Flights",
  },
  {
    value: "personal-car",
    label: "Personal Car",
  },
] as const;

export type ExpenseRemark = typeof expenseRemarks[number]["value"]; 