import type { Metadata } from 'next';
import { Suspense } from 'react';
import NetWorthTracker from '@/components/NetWorthTracker';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate net worth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Net worth = Total Assets - Total Liabilities. Assets include cash, investments, real estate, vehicles, retirement accounts. Liabilities include mortgage, loans, credit card debt, student loans. Positive net worth means assets exceed debts; negative means debts exceed assets."
      }
    },
    {
      "@type": "Question",
      "name": "What is a healthy debt-to-asset ratio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt-to-asset ratio under 50% is generally healthy. Under 30% is excellent. Over 50% indicates high debt burden requiring attention. For homeowners with mortgage, 40-60% may be acceptable early in loan term. Ratio should decrease over time as assets grow and debts shrink."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I track net worth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Track net worth monthly for active monitoring, or quarterly for passive tracking. Annual review minimum. Monthly tracking catches trends early. Use same valuation method each time for consistency. Track progress toward financial goals rather than absolute numbers."
      }
    },
    {
      "@type": "Question",
      "name": "What counts as an asset for net worth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Assets: cash and savings, investment accounts (stocks, bonds, mutual funds), real estate equity (market value minus mortgage), vehicles (current market value), retirement accounts (401k, IRA), business ownership value, valuable collectibles. Use realistic current values, not purchase prices."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve negative net worth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus on debt reduction first: highest interest debts priority. Increase income through side work or career advancement. Build savings while paying debt. Avoid new debt. Track progress monthly. Negative net worth can become positive in 2-5 years with consistent effort."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Net Worth Tracker - Calculate Assets vs Liabilities',
  description: 'Calculate your net worth by tracking all assets and liabilities.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NetWorthTracker />
    </Suspense>
  );
}
