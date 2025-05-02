import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// This is a temporary in-memory storage for users
// In a real application, you would use a database
const users: { [key: string]: any } = {};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user-email")?.value;

    if (!userEmail) {
      return NextResponse.json({ isAuthenticated: false });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        email: true,
        name: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ isAuthenticated: false });
    }

    return NextResponse.json({ isAuthenticated: true, user });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 