import { NextResponse } from 'next/server';

export async function GET() {
  const score =
    Math.floor(Math.random() * (700 - 300 + 1)) + 300;

  return NextResponse.json({
    success: true,
    score
  });
}