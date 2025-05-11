import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongoose';
import Product from '@/lib/models/Product';

export async function POST(request: NextRequest) {
  await connectMongoDB();
  
  const { productId, xCoordinate, yCoordinate, floorNum } = await request.json();

  try {
    await Product.findOneAndUpdate(
      { productId },
      { xCoordinate, yCoordinate, floorNum },
      { new: true, upsert: false }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
