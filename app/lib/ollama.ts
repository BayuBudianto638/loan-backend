import axios from 'axios';

export async function askPhiAI(
  payload: any
) {
  const prompt = `
You are a strict loan approval AI.

You MUST follow these rules EXACTLY:

APPROVE ONLY IF:
- dukcapil.valid = true
- skckAnalysis.valid = true
- creditScore >= 550

REJECT IF:
- dukcapil.valid = false
- skckAnalysis.valid = false
- creditScore < 550

Applicant Data:
${JSON.stringify(payload, null, 2)}

IMPORTANT:
- Follow the rules strictly
- Do not invent reasons
- Return ONLY JSON
- No markdown
- No explanation outside JSON

Approved example:
{
  "decision":"APPROVED",
  "reason":"Applicant eligible",
  "riskLevel":"LOW"
}

Rejected example:
{
  "decision":"REJECTED",
  "reason":"Applicant not eligible",
  "riskLevel":"HIGH"
}
`;

  try {
    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'gemma3:270m',
        prompt,
        stream: false,
        format: 'json'
      }
    );

    let text =
      response.data.response;

    console.log(
      'FINAL AI RAW:',
      text
    );

    text = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed =
      JSON.parse(text);

    return parsed;
  } catch (err: any) {
    console.log(
      'AI ERROR:',
      err.message
    );

    return {
      decision: 'REJECTED',
      reason: 'AI parse failed',
      riskLevel: 'HIGH'
    };
  }
}

export async function analyzeSKCK(
  skckText: string
) {
  const prompt = `
You are a classifier.

TASK:
Determine whether the document contains criminal history.

IMPORTANT:
- "no criminal records" = CLEAN
- "good citizen" = CLEAN
- "criminal history exists" = NOT CLEAN
- "robbery case" = NOT CLEAN

DOCUMENT:
${skckText}

Return ONLY JSON.

If clean:
{"valid":true,"reason":"clean record"}

If criminal:
{"valid":false,"reason":"criminal record found"}
`;

  try {
    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'gemma3:270m',

        prompt,

        stream: false,

        format: 'json'
      }
    );

    let text =
      response.data.response;

    console.log(
      'RAW AI RESPONSE:',
      text
    );

    text = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed =
      JSON.parse(text);

    const reason =
      String(parsed.reason || '')
        .toLowerCase();

    let valid =
      Boolean(parsed.valid);

    // SAFETY NORMALIZATION
    if (
      reason.includes('criminal')
    ) {
      valid = false;
    }

    if (
      reason.includes('clean')
    ) {
      valid = true;
    }

    return {
      valid,

      reason: parsed.reason
    };
  } catch (err: any) {
    console.log(
      'SKCK AI ERROR:',
      err.message
    );

    return {
      valid: false,

      reason: 'AI parse failed'
    };
  }
}