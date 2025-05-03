// src/app/api/verifyCode/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongoose';
import VerificationCode from '@/lib/models/VerificationCode';

const formatKoreanNumber = (number: string) =>
  number.startsWith('010') ? number.replace(/^010/, '+8210') : number;

export async function POST(req: NextRequest) {
  await connectMongoDB();
  const { phoneNumber, code } = await req.json();
  const formattedNumber = formatKoreanNumber(phoneNumber);

  const existingRecord = await VerificationCode.findOne({ phoneNumber: formattedNumber });

  if (existingRecord && existingRecord.code === code) {
    await VerificationCode.deleteOne({ phoneNumber: formattedNumber });
    return NextResponse.json({ verified: true });
  }

  return NextResponse.json({ verified: false }, { status: 400 });
}