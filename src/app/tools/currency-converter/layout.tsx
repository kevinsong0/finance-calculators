import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Currency Converter - Free Exchange Rate Calculator',
  description: 'Convert between USD, EUR, GBP, JPY, CNY and 10+ currencies. Free online currency converter with live exchange rates.',
  keywords: ['currency converter', 'exchange rate calculator', 'USD converter', 'EUR converter', 'foreign exchange', '汇率换算', '货币转换'],
  openGraph: {
    title: 'Currency Converter - Free Exchange Rate Calculator',
    description: 'Free currency converter supporting USD, EUR, GBP, JPY, CNY and more. Convert currencies instantly.',
    type: 'website',
  },
}

export default function CurrencyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}