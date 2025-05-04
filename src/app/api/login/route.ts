// src/app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongoose';
import User from '@/lib/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { phoneNumber, password } = await req.json();

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    // Optionally, implement sessions or JWT here.

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
