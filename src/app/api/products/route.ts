import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongoose';
import Product from '@/lib/models/Product';

export async function GET() {
  await connectMongoDB();
  const products = await Product.find({});
  return NextResponse.json({ products });
}