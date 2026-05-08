import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const valid = body.nik?.length >= 10;

  return NextResponse.json({
    success: true,
    data: {
      nik: body.nik,
      name: 'Bayu Pratama',
      address: 'Bandung',
      valid
    }
  });
}