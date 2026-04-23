import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator (2026) - Payoff Date & Interest Savings',
  description: 'Calculate debt-free date, total interest, and savings from extra monthly payments for credit cards, personal loans, and mixed debt.',
  openGraph: {
    title: 'Debt Payoff Calculator (2026) - Payoff Date & Interest Savings',
    description: 'Calculate debt-free date, total interest, and savings from extra monthly payments for credit cards, personal loans, and mixed debt.',
    type: 'website',
  },
};

export default function DebtPayoffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
