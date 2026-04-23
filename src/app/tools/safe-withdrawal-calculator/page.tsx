import type { Metadata } from 'next';
import { Suspense } from 'react';
import SafeWithdrawalCalculator from '@/components/SafeWithdrawalCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 4% withdrawal rule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 4% rule suggests withdrawing 4% of your portfolio in year one of retirement, then adjusting that amount for inflation annually. Based on Trinity Study data, this withdrawal rate historically sustained portfolios for 30+ years across various market conditions."
      }
    },
    {
      "@type": "Question",
      "name": "Why is 4% considered safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 4% rate was determined from historical data showing this withdrawal level never depleted a diversified portfolio over any 30-year period since 1926. It survived the Great Depression, 1970s stagflation, and 2008 financial crisis. The worst-case scenario left positive balance after 30 years."
      }
    },
    {
      "@type": "Question",
      "name": "Is the 4% rule still valid today?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recent studies suggest lower rates (3-3.5%) may be safer due to lower expected returns, longer retirement periods for early retirees, and rising healthcare costs. However, 4% remains a reasonable baseline for traditional 30-year retirement with diversified portfolio."
      }
    },
    {
      "@type": "Question",
      "name": "What are flexible withdrawal strategies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flexible withdrawal strategies adjust spending based on portfolio performance. Guardrails approach: withdraw less after market declines. Percentage-of-portfolio method: withdraw fixed percentage annually. Ceiling/floor method: cap withdrawals at certain percentages. These reduce risk compared to fixed 4%."
      }
    },
    {
      "@type": "Question",
      "name": "How does inflation affect withdrawal rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inflation increases annual withdrawals over time. 3% inflation means year 20 withdrawal is 80% higher than year one. Portfolio must grow faster than inflation-adjusted withdrawal. Real return (nominal return minus inflation) determines sustainability. High inflation periods stress withdrawal strategies."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Safe Withdrawal Rate Calculator - Retirement Income Sustainability',
  description: 'Test retirement withdrawal sustainability with inflation-adjusted projections.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SafeWithdrawalCalculator />
    </Suspense>
  );
}
