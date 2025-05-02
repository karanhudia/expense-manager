import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Expense Manager
        </h1>
        <p className="text-center mb-8">
          Track your expenses and manage reimbursements efficiently
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
        </div>
      </main>
  );
}
