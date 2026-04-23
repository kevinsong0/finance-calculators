import type { Metadata } from 'next';
import { Suspense } from 'react';
import FinancialFreedomCalculator from '@/components/FinancialFreedomCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the FIRE number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FIRE number = Annual expenses x 25 (based on 4% withdrawal rule). Example: $40,000 annual expenses = $1,000,000 FIRE number. This allows withdrawing $40,000/year while portfolio grows enough to last 30+ years. 4% rule based on historical Trinity Study data."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate when I can retire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Steps: 1. Determine target annual expenses. 2. Calculate FIRE number (expenses x 25). 3. Assess current savings. 4. Estimate future contributions. 5. Project growth rate (6-7% typical). 6. Calculate years to reach FIRE number. Savings rate matters more than income - 50%+ savers reach FIRE faster."
      }
    },
    {
      "@type": "Question",
      "name": "What are the different types of FIRE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lean FIRE: Frugal lifestyle, smaller nest egg (~$500K). Regular FIRE: Typical middle-class lifestyle (~$1M). Fat FIRE: Luxurious lifestyle, larger nest egg (~$2M+). Barista FIRE: Semi-retirement with part-time work. Coast FIRE: Save early, let compound interest finish. Choose based on lifestyle goals."
      }
    },
    {
      "@type": "Question",
      "name": "Is the 4% withdrawal rule safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "4% rule historically succeeds 95% of 30-year periods in US markets. Success depends on market returns, inflation, timeline. Conservative: Use 3-3.5% for longer retirements. Adjust for market conditions. Consider flexible withdrawal strategies. May need adjustments for early/long retirements or poor markets."
      }
    },
    {
      "@type": "Question",
      "name": "How can I reach FIRE faster?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Increase savings rate: 50%+ savers reach FIRE fastest. Reduce expenses: Lower FIRE number, faster timeline. Increase income: Side hustles, career advancement. Optimize returns: Index funds, tax efficiency. Geographic arbitrage: Live in low-cost areas. House hack: Reduce housing costs. Time in market beats timing."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Financial Freedom Calculator - FIRE Timeline & Required Nest Egg',
  description: 'Calculate your FIRE timeline, required nest egg, and savings gap. Compare Lean, Regular, and Fat FIRE paths to financial independence.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FinancialFreedomCalculator />
    </Suspense>
  );
}