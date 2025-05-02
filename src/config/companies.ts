export const companies = [
  {
    value: "plan-international-india",
    label: "Plan International - India Chapter",
  },
] as const;

export type Company = typeof companies[number]["value"]; 