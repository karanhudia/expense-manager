"use client";

import { useAuth } from "@/context/auth/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <p>Company: {user.companyId}</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Pending Reimbursements</h2>
          <p className="text-2xl font-bold">₹0.00</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          <p className="text-gray-500">No expenses yet</p>
        </div>
      </div>
    </div>
  );
} 