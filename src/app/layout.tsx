import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'Finance Calculators - Free Mortgage, Compound Interest & Currency Tools',
  description: 'Professional financial calculators for mortgage payments, compound interest, and currency conversion. Free online tools for smart financial decisions.',
  keywords: ['mortgage calculator', 'compound interest calculator', 'currency converter', 'loan calculator', 'interest rate calculator', 'financial calculator', 'mortgage payment', 'early repayment', 'investment calculator'],
  authors: [{ name: 'Finance Calculators' }],
  openGraph: {
    title: 'Finance Calculators - Free Mortgage & Investment Tools',
    description: 'Calculate mortgage payments, compound interest, and currency conversions. Bank-grade accuracy, instant results.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}