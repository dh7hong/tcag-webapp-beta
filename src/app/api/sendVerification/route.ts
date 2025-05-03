// src/app/api/sendVerification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import connectMongoDB from '@/lib/mongoose';
import VerificationCode from '@/lib/models/VerificationCode';

const formatKoreanNumber = (number: string) =>
  number.startsWith('010') ? number.replace(/^010/, '+8210') : number;

export async function POST(req: NextRequest) {
  await connectMongoDB();
  const { phoneNumber } = await req.json();
  const formattedNumber = formatKoreanNumber(phoneNumber);
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await client.messages.create({
    body: `RetailAI Verification Code: ${code}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: formattedNumber,
  });

  await VerificationCode.findOneAndUpdate(
    { phoneNumber: formattedNumber },
    { code, createdAt: new Date() },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
}