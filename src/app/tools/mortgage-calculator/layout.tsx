import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Free Home Loan Payment Calculator',
  description: 'Calculate your mortgage monthly payment, total interest, and early repayment options. Compare equal payment vs equal principal methods. Free online mortgage calculator.',
  keywords: ['mortgage calculator', 'home loan calculator', 'mortgage payment calculator', 'loan interest calculator', 'early repayment calculator', '房贷计算器', '月供计算'],
  openGraph: {
    title: 'Mortgage Calculator - Calculate Home Loan Payments',
    description: 'Free mortgage calculator with early repayment analysis. Calculate monthly payments, total interest, and compare repayment methods.',
    type: 'website',
  },
}

export default function MortgageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}