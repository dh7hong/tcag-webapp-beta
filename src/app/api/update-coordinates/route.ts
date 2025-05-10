import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const csvFilePath = path.join(process.cwd(), 'public/assets/data/coordinates.csv');

export async function POST(req: NextRequest) {
  const newData = await req.json();

  const csv = Papa.unparse(newData);

  fs.writeFileSync(csvFilePath, csv, 'utf8');

  return NextResponse.json({ success: true });
}