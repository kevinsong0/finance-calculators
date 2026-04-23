import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refinance Calculator - Break-Even & Payment Comparison',
  description: 'Compare current mortgage with refinance options. Estimate payment change, total interest savings, and break-even months.',
  keywords: ['refinance calculator', 'mortgage refinance calculator', 'refinance break even calculator', 'loan refinance savings'],
  openGraph: {
    title: 'Refinance Calculator - Break-Even & Payment Comparison',
    description: 'Estimate refinance savings and break-even timeline before applying.',
    type: 'website',
  },
}

export default function RefinanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

