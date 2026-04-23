import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmergencyFundCalculator from '@/components/EmergencyFundCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much should I have in an emergency fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial experts recommend saving 3-6 months of living expenses as a minimum emergency fund. For greater security, aim for 9-12 months. The exact amount depends on your job stability, income variability, and family situation."
      }
    },
    {
      "@type": "Question",
      "name": "Where should I keep my emergency fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keep your emergency fund in a high-yield savings account or money market account. It should be separate from daily spending accounts, easily accessible within 1-2 days, but not too easy to spend impulsively. Avoid investing it in stocks due to volatility."
      }
    },
    {
      "@type": "Question",
      "name": "What counts as an emergency for using this fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "True emergencies include: unexpected job loss, major medical expenses, car repairs needed for work, home repairs (leaks, broken furnace), or essential appliance replacement. Vacations, wants, or non-urgent expenses should not come from your emergency fund."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly should I build my emergency fund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start small: aim for $1,000-2,000 as a mini emergency fund first. Then build toward 3 months, then 6 months. If your budget allows 20% savings rate, you can reach a 6-month fund in about 2-3 years. Prioritize this before aggressive investing."
      }
    },
    {
      "@type": "Question",
      "name": "Should I pay off debt or build emergency fund first?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Build a small emergency fund ($1,000-2,000) first, then focus on paying off high-interest debt (above 7%). Once high-interest debt is cleared, resume building your full emergency fund to 3-6 months before tackling lower-interest debt."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Emergency Fund Calculator - How Much Should You Save?',
  description: 'Calculate how much emergency fund you need based on monthly expenses. Plan savings timeline to reach your goal.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmergencyFundCalculator />
    </Suspense>
  );
}