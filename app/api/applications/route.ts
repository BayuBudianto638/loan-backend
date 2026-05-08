import {
  NextRequest,
  NextResponse
} from 'next/server';

import fs from 'fs';

import path from 'path';

import { applications } from '@/app/lib/db';

import {
  askPhiAI,
  analyzeSKCK
} from '@/app/lib/ollama';

import { readTextFile } from '@/app/lib/file-reader';

export async function POST(
  req: NextRequest
) {
  try {
    const formData =
      await req.formData();

    const ktp =
      formData.get('ktp') as File;

    const npwp =
      formData.get('npwp') as File;

    const skck =
      formData.get('skck') as File;

    if (!ktp || !npwp || !skck) {
      return NextResponse.json(
        {
          success: false,
          message:
            'All files required'
        },
        {
          status: 400
        }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      'uploads'
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    async function saveFile(
      file: File
    ) {
      const bytes =
        await file.arrayBuffer();

      const buffer = Buffer.from(
        bytes
      );

      const filename = `${Date.now()}-${
        file.name
      }`;

      fs.writeFileSync(
        path.join(uploadDir, filename),
        buffer
      );

      return filename;
    }

    const ktpFile =
      await saveFile(ktp);

    const npwpFile =
      await saveFile(npwp);

    const skckFile =
      await saveFile(skck);

    const ktpText =
      await readTextFile(ktp);

    const npwpText =
      await readTextFile(npwp);

    const skckText =
      await readTextFile(skck);

    const nik =
      ktpText.trim();

    const validNik =
      nik === '320101010101';

    const dukcapil = {
      nik,

      valid: validNik,

      name: validNik
        ? 'Bayu Pratama'
        : null
    };

    const creditScore =
      Math.floor(
        Math.random() *
          (700 - 300 + 1)
      ) + 300;

    console.log(skckText);
    const skckAnalysis =
      await analyzeSKCK(skckText);

    const aiResult =
      await askPhiAI({
        nik,
        dukcapil,
        creditScore,
        skckAnalysis,
        documents: {
          ktpUploaded: true,
          npwpUploaded: true,
          skckUploaded: true
        }
      });

      const shouldApprove =
  dukcapil.valid &&
  skckAnalysis.valid &&
  creditScore >= 550;

  if (
    shouldApprove &&
    aiResult.decision !==
      'APPROVED'
  ) {
    aiResult.decision =
      'APPROVED';

    aiResult.reason =
      'AI corrected by consistency validator';

    aiResult.riskLevel =
      'LOW';
  }

  if (
    !shouldApprove &&
    aiResult.decision ===
      'APPROVED'
  ) {
    aiResult.decision =
      'REJECTED';

    aiResult.reason =
      'AI corrected by consistency validator';

    aiResult.riskLevel =
      'HIGH';
  }

    const app = {
      id: crypto.randomUUID(),
      nik,
      ktpFile,
      npwpFile,
      skckFile,
      dukcapil,
      creditScore,
      skckAnalysis,
      aiDecision:
        aiResult.decision,

      aiReason:
        aiResult.reason,

      riskLevel:
        aiResult.riskLevel,

      status:
        aiResult.decision,

      createdAt:
        new Date().toISOString()
    };

    applications.push(app);

    return NextResponse.json({
      success: true,

      data: app
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,

        message: err.message
      },
      {
        status: 500
      }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,

    data: applications
  });
}