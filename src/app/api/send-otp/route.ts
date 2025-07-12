// /app/api/send-otp/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const oAuth2Client = new google.auth.OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH_TOKEN,
});

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    const accessToken = (await oAuth2Client.getAccessToken()).token || "";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    await prisma.otp.create({
      data: { email, code: otp, expiresAt },
    });

    return NextResponse.json({ message: "OTP sent" });
  } catch (err) {
    console.error("Send OTP error:", err);
    return NextResponse.json(
      { message: "Failed to send OTP", error: String(err) },
      { status: 500 }
    );
  }
}
