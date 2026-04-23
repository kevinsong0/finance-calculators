import type { Metadata } from 'next';
import { Suspense } from 'react';
import FinancialLiteracyGuide from '@/components/FinancialLiteracyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is compound interest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compound interest: interest earned on previous interest, exponential growth. Formula: A = P(1 + r/n)^(nt). Example: $10,000 at 7% for 30 years = $76,123. Works both ways - grows savings, grows debt. Key factors: rate (higher = faster growth), time (longer = more compounding), frequency (more frequent = better). Start investing early to maximize compounding years. Avoid debt with compound interest (credit cards). Compound interest = most powerful force in finance."
      }
    },
    {
      "@type": "Question",
      "name": "What is the 50/30/20 budget rule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "50/30/20 budget: 50% of income for Needs (rent, utilities, groceries, insurance, minimum debt payments). 30% for Wants (entertainment, dining out, hobbies, subscriptions). 20% for Savings/Debt Payoff (emergency fund, retirement, extra debt payments). Adjust based on circumstances - high debt may need more savings %. Steps: Calculate after-tax income, categorize expenses, adjust allocation. Benefits: simple framework, ensures savings, balanced spending. Starting point - customize for your situation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I start investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start investing: 1. Build emergency fund first (3-6 months expenses). 2. Pay off high-interest debt (credit cards > 15%). 3. Maximize employer match (401k free money). 4. Open investment account (brokerage, Roth IRA). 5. Choose investments (index funds, ETFs for beginners - diversified, low cost). 6. Start small, increase gradually. 7. Invest regularly (monthly contributions). 8. Don&apos;t panic on dips (long-term focus). Beginner strategy: broad market index fund (S&P 500), automate contributions, time in market > timing market."
      }
    },
    {
      "@type": "Question",
      "name": "What is the debt avalanche vs snowball method?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debt payoff methods: Avalanche (pay highest interest rate debt first) - mathematically optimal, saves most interest. Example: Credit card 20% > Car loan 8% > Student loan 5%. Snowball (pay smallest balance first) - psychological benefit, quick wins, motivation. Example: $500 debt > $2000 debt > $10000 debt. Avalanche = saves money, Snowball = builds momentum. Choose: Avalanche if numbers-driven, Snowball if motivation-driven. Either method works - key is consistent extra payments on one debt while minimums on others."
      }
    },
    {
      "@type": "Question",
      "name": "Why is financial literacy important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial literacy importance: Make informed decisions (budgeting, debt, investing). Avoid costly mistakes (high-interest debt, predatory loans). Build wealth over time (compound interest, early investing). Achieve financial goals (home, retirement, education). Reduce stress (financial security). Navigate complex products (insurance, loans, investments). Studies show literate people: save more, invest better, avoid debt, weather emergencies. Start early - financial decisions compound over lifetime. Free resources: government sites, calculators, courses."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Financial Literacy Guide - Core Concepts, Budgeting & Investing',
  description: 'Core financial concepts, budgeting methods, investment types, and debt management.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FinancialLiteracyGuide />
    </Suspense>
  );
}