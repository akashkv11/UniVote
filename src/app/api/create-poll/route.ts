import { pollSchema } from "@/lib/validation/poll.schema";
import tryCatch from "@/utils/try-catch";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
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
    
     const parsed = pollSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ errors: z.flattenError(parsed.error) }, { status: 400 });
    }


  const { question, options, email } = body;

  if (!options || !Array.isArray(options) || options.length < 2) {
    return NextResponse.json(
      { message: "At least two options are required" },
      { status: 400 }
    );
  }
    const code = nanoid(6).toUpperCase(); // unique short poll code
    
    const pollCreationPromise = prisma.poll.create({
      data: {
        question: question || null,
        code,
        email: email || null,
        claimed: false,
        options: {
          create: options.map((text: string) => ({ text })),
        },
      },
      include: { options: true },
    })

  const { data: poll, error: pollError } = await tryCatch(pollCreationPromise);

  if (pollError) {
    console.error("Poll creation error:", pollError);
    return NextResponse.json(
      { message: "Failed to create poll" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Poll created",
    pollCode: code,
    claimPending: !email,
    poll,
  });
}
