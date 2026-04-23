import type { Metadata } from 'next';
import { Suspense } from 'react';
import HomeAffordabilityCalculator from '@/components/HomeAffordabilityCalculator';

const faqs = [
  {
    q: "How much house can I afford?",
    a: "Follow the 28/36 rule: housing costs should not exceed 28% of gross income, and total debts should not exceed 36%. For $80,000 income, you can afford about $250,000-300,000 home with $50,000 down payment. Lenders also consider credit score, employment history, and reserves."
  },
  {
    q: "What is the 28/36 rule?",
    a: "The 28/36 rule is a lending guideline. 28% means your mortgage payment (PITI: principal, interest, taxes, insurance) should not exceed 28% of monthly gross income. 36% means all debts (mortgage, car, credit cards) should not exceed 36%. This ensures affordable payments."
  },
  {
    q: "How much down payment do I need?",
    a: "Minimum down payments: FHA loans 3.5%, conventional loans 3-5%, VA loans 0% for veterans. However, 20% down payment avoids PMI (private mortgage insurance), saving $50-200 monthly. Larger down payment reduces loan amount, monthly payment, and total interest."
  },
  {
    q: "What costs beyond mortgage should I budget?",
    a: "Additional costs: property taxes (1-2% of home value annually), homeowners insurance ($1,000-2,000/year), HOA fees ($100-500/month), maintenance (1% of value annually), utilities, and closing costs (2-5% of purchase price). Budget $3,000-5,000 monthly for total homeownership costs on a $300,000 home."
  },
  {
    q: "Can I afford a house with student loans?",
    a: "Yes, but student loans affect your debt-to-income ratio. Lenders count student loan payments in the 36% total debt limit. Income-driven repayment plans may help qualify if the calculated payment is lower. High student debt may require higher income or lower home price target."
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
  title: 'Home Affordability Calculator - How Much House Can I Buy?',
  description: 'Calculate how much home you can afford based on income, down payment, debts, and interest rate. Follow the 28/36 rule.',
  alternates: { canonical: '/tools/home-affordability-calculator' },
  openGraph: {
    title: 'Home Affordability Calculator',
    description: 'Find out how much house you can afford based on your finances.',
    url: '/tools/home-affordability-calculator',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading calculator...</div>}>
          <HomeAffordabilityCalculator locale="en" />
        </Suspense>
      </main>
    </>
  );
}