import { NextRequest, NextResponse } from "next/server";
import { signToken, verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Simple validation (in production, verify against your database)
    if (email === "admin@example.com" && password === "admin123") {
      const token = signToken();
      
      const response = NextResponse.json({ success: true });
      response.cookies.set("authToken", token, {
        httpOnly: true,
        maxAge: 86400, // 1 day
      });
      
      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}