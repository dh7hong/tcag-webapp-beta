// src/app/api/upload-csv/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongoose';
import Product from '@/lib/models/Product';
import Papa from 'papaparse';

export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    const csvText = await file.text();
    const { data } = Papa.parse(csvText, { header: true });

    const products = data.map((item: any) => ({
      brandName: item.brandName.trim(),
      productId: item.productId.trim(),
      category: item.category.trim(),
      productName: item.productName.trim(),
      productPrice: item.productPrice.trim(),
      productImageUrl: item.productImageUrl.trim(),
    }));

    await Product.deleteMany({}); // clears existing data
    await Product.insertMany(products);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
