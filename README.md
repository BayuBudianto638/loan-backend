This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Below are the picture and result from the API

<img width="1821" height="897" alt="image" src="https://github.com/user-attachments/assets/670423b1-4380-4474-acb9-fd52acc5430b" />

<img width="1825" height="977" alt="image" src="https://github.com/user-attachments/assets/c63c6f6c-02fc-41dd-b0df-1aa91d8f3af3" />

And this is the JSON Result from the API

# API Response Example

This file contains an example JSON response returned by the API.

```json
{
  "success": true,
  "data": {
    "id": "e1f9d4c4-e385-4a7c-a246-ba2a6ad06de5",
    "nik": "320101010101",
    "ktpFile": "1778199647724-KTP.txt",
    "npwpFile": "1778199647727-NPWP.txt",
    "skckFile": "1778199647729-SKCK.txt",
    "dukcapil": {
      "nik": "320101010101",
      "valid": true,
      "name": "Bayu Pratama"
    },
    "creditScore": 626,
    "skckAnalysis": {
      "valid": false,
      "reason": "criminal record found"
    },
    "aiDecision": "NOT_APPROVED",
    "aiReason": "AI parse failed",
    "riskLevel": "HIGH",
    "status": "NOT_APPROVED",
    "createdAt": "2026-05-08T00:24:49.884Z"
  }
}
```

# Challenge for implementing the system
1. Multiple ID Card, there are known that people in Indonesia have multiple ID Card
2. Unintegrated system between Dukcapil, Credit Score and Criminal Records or Banking Statements
3. Infrastructures for the system to run in Indonesia is still far away from other countries
