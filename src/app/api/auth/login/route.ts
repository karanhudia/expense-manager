import { NextResponse } from "next/server";
import { LoginInput } from "@/types/user";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";

// This is a temporary in-memory storage for users
// In a real application, you would use a database
const users: { [key: string]: any } = {};

export async function POST(request: Request) {
  try {
    const body: LoginInput = await request.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    // Check if user exists and password matches
    if (!user || !(await compare(body.password, user.password))) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;

    // Set cookie with user's email
    const cookieStore = await cookies();
    cookieStore.set("user-email", user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 