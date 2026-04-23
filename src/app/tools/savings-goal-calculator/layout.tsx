import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Savings Goal Calculator - Monthly Contribution Planner',
  description: 'Calculate required monthly savings to reach your target amount within your chosen timeline.',
  openGraph: {
    title: 'Savings Goal Calculator - Monthly Contribution Planner',
    description: 'Plan your monthly savings and compare against your target timeline.',
    type: 'website',
  },
};

export default function SavingsGoalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}

