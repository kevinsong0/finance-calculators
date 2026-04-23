import type { Metadata } from 'next';
import { Suspense } from 'react';
import FIRECalculator from '@/components/FIRECalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the FIRE movement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FIRE stands for Financial Independence, Retire Early. It's a lifestyle movement focused on aggressive saving and investing to achieve financial independence decades before traditional retirement age. Followers aim to accumulate enough assets to live off investment returns permanently."
      }
    },
    {
      "@type": "Question",
      "name": "How is the FIRE number calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FIRE number = Annual expenses × 25. This is based on the 4% safe withdrawal rule from the Trinity Study. If your annual expenses are $40,000, your FIRE number is $1 million (40,000 × 25). This assumes withdrawing 4% annually provides sustainable income for 30+ years."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Lean FIRE and Fat FIRE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lean FIRE targets minimal annual expenses (typically $20,000-40,000), requiring smaller portfolio (500k-1M). Fat FIRE aims for comfortable lifestyle with higher expenses (100k+), requiring larger portfolio (2.5M+). Choose based on your desired lifestyle and location."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to reach FIRE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Time to FIRE depends on savings rate. Saving 50% of income typically takes 15-17 years. Saving 70% can achieve FIRE in 8-10 years. Higher savings rate dramatically shortens timeline due to both faster accumulation and lower required FIRE number."
      }
    },
    {
      "@type": "Question",
      "name": "Is FIRE realistic for most people?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FIRE requires high income, low expenses, and consistent saving. Most FIRE followers earn above average incomes and practice extreme frugality. Key factors: maximize income, minimize housing/transportation costs, avoid lifestyle inflation, invest consistently, and maintain low-cost lifestyle post-FIRE."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'FIRE Calculator - Financial Independence Retire Early',
  description: 'Calculate your FIRE number and timeline to achieve financial independence and early retirement.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FIRECalculator />
    </Suspense>
  );
}
