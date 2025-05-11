// src/app/api/update-coordinates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function POST(request: NextRequest) {
  try {
    const coordinates = await request.json(); // Data sent from frontend

    const csv = Papa.unparse(coordinates, {
      header: true,
      columns: ["product", "x", "y"],
    });

    // Make sure this directory exists in your project
    const filePath = path.join(process.cwd(), 'public/assets/data/coordinates.csv');

    fs.writeFileSync(filePath, csv, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}