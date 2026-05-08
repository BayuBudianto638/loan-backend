import axios from 'axios';

export async function askPhiAI(
  payload: any
) {
  const prompt = `
You are an AI loan approval officer.

RULES:
- Reject if Dukcapil invalid
- Reject if criminal record exists
- Approve if credit score >= 550
- Approve if SKCK valid
- Reject if score below 550

Applicant Data:
${JSON.stringify(payload, null, 2)}

Return ONLY JSON.

If approved:
{
  "decision": "APPROVED",
  "reason": "Applicant eligible",
  "riskLevel": "LOW"
}

If rejected:
{
  "decision": "REJECTED",
  "reason": "Applicant not eligible",
  "riskLevel": "HIGH"
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

    // CLEAN RESPONSE
    text = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed =
      JSON.parse(text);

    return {
      decision:
        parsed.decision ??
        'NOT_APPROVED',

      reason:
        parsed.reason ??
        'No reason',

      riskLevel:
        parsed.riskLevel ??
        'HIGH'
    };
  } catch (err: any) {
    console.log(
      'FINAL AI ERROR:',
      err.message
    );

    return {
      decision: 'NOT_APPROVED',

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
- "no crimes" = CLEAN
- "good citizen" = CLEAN
- "criminal record exists" = NOT CLEAN
- "robbery" = NOT CLEAN
- "fraud case" = NOT CLEAN

DOCUMENT:
${skckText}

Return ONLY JSON:

If clean:
{"valid":true,"reason":"clean record"}

If criminal history exists:
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

    return JSON.parse(text);
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