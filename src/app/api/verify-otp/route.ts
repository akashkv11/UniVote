import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json(
      { message: "Email and code required" },
      { status: 400 }
    );
  }

  const otpRecord = await prisma.otp.findFirst({
    where: { email, code },
    orderBy: { createdAt: "desc" }, // assuming you have `createdAt`
  });

  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    return NextResponse.json(
      { message: "Invalid or expired OTP" },
      { status: 400 }
    );
  }

  // OTP is valid: you can now authenticate or issue a token

  // Optional: Delete OTP after use
  await prisma.otp.deleteMany({
    where: { email },
  });

  return NextResponse.json({ message: "OTP verified successfully" });
}
