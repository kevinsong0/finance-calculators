import type { Metadata } from 'next';
import { Suspense } from 'react';
import TermLifeInsuranceCalculator from '@/components/TermLifeInsuranceCalculator';

const faqs = [
  {
    q: "How much term life insurance coverage do I need?",
    a: "Common recommendations: 10-15 times your annual income, or enough to cover debts plus 5-10 years of income replacement. Consider mortgage balance, children's education costs, and family living expenses. A $500,000 policy for a $50,000 income earner provides 10 years of income replacement."
  },
  {
    q: "What factors affect term life insurance premiums?",
    a: "Premiums are based on age (older = higher), health class (excellent health = lowest rates), gender (women typically pay 15-30% less), term length (longer terms cost more), coverage amount, smoking status, occupation, and lifestyle factors. Term insurance is much cheaper than whole life for the same coverage."
  },
  {
    q: "What is the difference between health classes?",
    a: "Health classes determine your premium tier: Preferred Plus (best rates, excellent health, no family history), Preferred (very good health), Standard Plus (average health with minor conditions), Standard (typical health). Moving from Standard to Preferred can reduce premiums by 25-40%."
  },
  {
    q: "Should I choose a 10, 20, or 30-year term?",
    a: "Match term to your financial obligations. 10-year suits young families with limited budget. 20-year covers raising children through adulthood. 30-year protects long-term debts like mortgages. Longer terms lock in lower rates but cost more overall. Consider level premium policies for rate stability."
  },
  {
    q: "What happens when my term life insurance expires?",
    a: "When term expires, coverage ends with no payout if you're still alive. You can: convert to permanent insurance (often without new medical exam), renew at higher age-based rates, or purchase new coverage. Most people no longer need coverage after term expires if debts are paid and dependents are independent."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata: Metadata = {
  title: 'Term Life Insurance Calculator | Estimate Your Premium',
  description: 'Calculate term life insurance premiums based on age, health class, gender, coverage amount, and term length. Compare health classes and get instant estimates.',
  alternates: { canonical: '/tools/term-life-insurance-calculator' },
  openGraph: {
    title: 'Term Life Insurance Calculator',
    description: 'Estimate your term life insurance premium based on age, health, and coverage needs. Compare health classes instantly.',
    url: '/tools/term-life-insurance-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Term Life Insurance Calculator',
    description: 'Estimate your term life insurance premium based on age, health, and coverage needs.',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading calculator...</div>}>
          <TermLifeInsuranceCalculator />
        </Suspense>
      </main>
    </>
  );
}