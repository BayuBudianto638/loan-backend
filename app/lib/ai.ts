interface DecisionInput {
  dukcapilValid: boolean;
  creditScore: number;
  payrollExists: boolean;
}

export function runAIDecision(input: DecisionInput) {
  if (!input.dukcapilValid) {
    return {
      status: 'REJECTED',
      reason: 'Dukcapil validation failed'
    };
  }

  if (!input.payrollExists) {
    return {
      status: 'NOT_APPROVED',
      reason: 'Payroll document missing'
    };
  }

  if (input.creditScore >= 550) {
    return {
      status: 'APPROVED',
      reason: 'Credit score passed AI rule'
    };
  }

  return {
    status: 'NOT_APPROVED',
    reason: 'Credit score below minimum threshold'
  };
}