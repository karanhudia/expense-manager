import { Company } from "@/config/companies";

export interface User {
  id: string;
  email: string;
  name: string;
  companyId: Company;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
