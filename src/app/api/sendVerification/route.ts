// src/app/api/sendVerification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import connectMongoDB from '@/lib/mongoose';
import VerificationCode from '@/lib/models/VerificationCode';

const formatKoreanNumber = (number: string) =>
  number.startsWith('010') ? number.replace(/^010/, '+8210') : number;

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { phoneNumber } = await req.json();
    const formattedNumber = phoneNumber.startsWith('010')
      ? phoneNumber.replace(/^010/, '+8210')
      : phoneNumber;

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await client.messages.create({
      body: `TCAG Verification Code: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedNumber,
    });

    await VerificationCode.findOneAndUpdate(
      { phoneNumber: formattedNumber },
      { code, createdAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SEND VERIFICATION ERROR:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}