import { NextRequest, NextResponse } from 'next/server';
import { runAIDecision } from '@/app/lib/ai';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = runAIDecision(body);

  return NextResponse.json({
    success: true,
    result
  });
}