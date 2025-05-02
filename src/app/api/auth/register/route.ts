import { NextResponse } from "next/server";
import { CreateUserInput } from "@/types/user";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body: CreateUserInput = await request.json();

    // Validate input
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(body.password, 12);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
        companyId: "plan-international-india", // Default company for now
      },
    });

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
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 