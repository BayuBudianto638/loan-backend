export type ApplicationStatus =
  | 'SUBMITTED'
  | 'PROCESSING'
  | 'APPROVED'
  | 'NOT_APPROVED'
  | 'REJECTED';

export interface LoanApplication {
  id: string;

  nik: string;

  ktpFile: string;

  payrollFile: string;

  dukcapilValid?: boolean;

  creditScore?: number;

  aiDecision?: string;

  aiReason?: string;

  riskLevel?: string;

  status: ApplicationStatus;

  createdAt: string;
}