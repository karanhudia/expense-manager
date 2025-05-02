import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// PUT update an expense
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user-email")?.value;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { amount, category, remark, date, imageUrl, isReimbursed } = body;

    // Validate required fields
    if (!amount || !category || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the expense belongs to the user
    const existingExpense = await prisma.expense.findUnique({
      where: { id: params.id },
    });

    if (!existingExpense || existingExpense.userId !== user.id) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    const expense = await prisma.expense.update({
      where: { id: params.id },
      data: {
        amount,
        category,
        remark: remark || "",
        date: new Date(date),
        imageUrl,
        isReimbursed: isReimbursed ?? existingExpense.isReimbursed,
      },
    });

    return NextResponse.json({ expense });
  } catch (error) {
    console.error("Error updating expense:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE an expense
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user-email")?.value;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if the expense belongs to the user
    const existingExpense = await prisma.expense.findUnique({
      where: { id: params.id },
    });

    if (!existingExpense || existingExpense.userId !== user.id) {
      return NextResponse.json(
        { error: "Expense not found" },
        { status: 404 }
      );
    }

    await prisma.expense.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 