import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Investment Growth Calculator',
  description: 'Calculate compound interest growth with monthly contributions. Visualize how your investments grow over time. Free compound interest calculator.',
  keywords: ['compound interest calculator', 'investment calculator', 'interest growth', 'savings calculator', 'annual return calculator', '复利计算器', '投资收益'],
  openGraph: {
    title: 'Compound Interest Calculator - See Your Money Grow',
    description: 'Free compound interest calculator. Calculate investment growth with different frequencies and monthly contributions.',
    type: 'website',
  },
}

export default function CompoundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}