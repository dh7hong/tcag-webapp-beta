// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongoose';
import User from '@/lib/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const userData = await req.json();

    const existingUser = await User.findOne({ phoneNumber: userData.phoneNumber });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    await User.create(userData);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}