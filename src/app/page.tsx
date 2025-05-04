"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiTrendingUp } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  if (!loading && user) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100 px-4 overflow-hidden">
      <div className="z-10 w-full max-w-md mx-auto p-8 rounded-3xl shadow-2xl bg-white/90 flex flex-col items-center animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full p-5 shadow-lg mb-4 animate-bounce-slow">
            <FiTrendingUp className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-2 tracking-tight drop-shadow-lg">
            Expense Manager
          </h1>
          <p className="text-lg text-gray-700 text-center mb-2 font-medium">
            Track your expenses, manage reimbursements, and stay in control of your finances.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full mt-4">
          <Link href="/auth/login" className="w-full sm:w-auto">
            <Button className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all">
              Login
            </Button>
          </Link>
          <Link href="/auth/register" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full py-3 text-lg font-semibold border-blue-600 text-blue-700 hover:bg-blue-50 shadow-md transition-all">
              Register
            </Button>
          </Link>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
      `}</style>
    </main>
  );
}
