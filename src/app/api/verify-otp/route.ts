import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import tryCatch from "@/utils/try-catch";
import {
  VerifyOtpInput,
  verifyOtpSchema,
} from "@/lib/validation-schema/verify-otp.schema";
import z from "zod";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { data: body, error: bodyError } = await tryCatch(req.json());

  if (bodyError) {
    console.error("Request body parsing error:", bodyError);
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = verifyOtpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: z.flattenError(parsed.error) },
      { status: 400 }
    );
  }
  const { email, otp, code }: VerifyOtpInput = body;

  const { data: otpRecord, error: otpError } = await tryCatch(
    prisma.otp.findFirst({
      where: { email, code: otp },
      orderBy: { createdAt: "desc" },
    })
  );

  if (otpError) {
    console.error("Database error:", otpError);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    return NextResponse.json(
      { message: "Invalid or expired OTP" },
      { status: 400 }
    );
  }

  // OTP is valid: you can now authenticate or issue a token

  const { error: deleteError } = await tryCatch(
    prisma.otp.deleteMany({
      where: { email },
    })
  );

  if (deleteError) {
    console.error("Error deleting OTP records:", deleteError);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

  const { error: pollError } = await tryCatch(
    prisma.poll.update({ where: { code }, data: { claimed: true, email } })
  );
  if (pollError) {
    console.error("Error updating poll:", pollError);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "OTP verified successfully" });
}
