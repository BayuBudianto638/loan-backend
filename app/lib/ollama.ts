import axios from 'axios';

export async function askPhiAI(
  payload: any
) {
  const prompt = `
You are an AI loan approval officer.

Analyze all applicant data carefully.

Rules:
- Reject if Dukcapil invalid
- Reject if criminal record exists
- Approve if credit score >= 550
- Analyze all risks

Applicant Data:
${JSON.stringify(payload, null, 2)}

Return ONLY valid JSON.

Example:
{
  "decision": "APPROVED",
  "reason": "Good applicant",
  "riskLevel": "LOW"
}
`;

  const response = await axios.post(
    'http://localhost:11434/api/generate',
    {
      model: 'phi',
      prompt,
      stream: false
    }
  );

  const text = response.data.response;

  try {
    return JSON.parse(text);
  } catch {
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
You are an AI criminal record detector.

Analyze this SKCK document.

If criminal history exists return:
{
  "valid": false,
  "reason": "criminal record found"
}

If clean return:
{
  "valid": true,
  "reason": "clean record"
}

SKCK:
${skckText}

Return ONLY JSON.
`;

  const response = await axios.post(
    'http://localhost:11434/api/generate',
    {
      model: 'phi',
      prompt,
      stream: false
    }
  );

  try {
    return JSON.parse(
      response.data.response
    );
  } catch {
    return {
      valid: false,
      reason: 'AI parse failed'
    };
  }
}