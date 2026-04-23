import type { Metadata } from 'next';
import { Suspense } from 'react';
import CreditCardPayoffCalculator from '@/components/CreditCardPayoffCalculator';

const faqs = [
  {
    q: "How long does it take to pay off a credit card?",
    a: "Payoff time depends on balance, interest rate, and monthly payment. A $5,000 balance at 22% APR with $200 monthly payment takes about 31 months. Increasing payment to $300 reduces payoff time to 18 months and saves about $400 in interest."
  },
  {
    q: "What is the minimum payment on a credit card?",
    a: "Minimum payment is typically 1-3% of balance plus interest, or a flat amount like $25. Making only minimum payments dramatically extends payoff time and increases total interest. A $5,000 balance at minimum payment could take 15+ years to pay off."
  },
  {
    q: "How can I pay off my credit card faster?",
    a: "Strategies: pay more than minimum, stop adding new charges, consider balance transfer to lower APR card, use avalanche method (highest APR first), or snowball method (smallest balance first). Extra payments directly reduce principal and shorten payoff time."
  },
  {
    q: "Should I pay off credit cards or save first?",
    a: "If APR exceeds 15%, prioritize debt payoff over saving. Build a small emergency fund ($1,000) first, then attack high-interest debt. Once debt is cleared, build full emergency fund and invest. Mathematically, paying 22% APR debt beats any savings return."
  },
  {
    q: "What is a good APR for a credit card?",
    a: "Good APR varies by credit score: excellent (720+) qualifies for 12-15%, good (660-719) gets 15-20%, fair (620-659) gets 20-25%. Average credit card APR is about 22%. Consider 0% introductory APR cards for balance transfers if you have good credit."
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
  title: 'Credit Card Payoff Calculator (2026) - Debt-Free Date & Interest',
  description: 'Calculate credit card payoff date, total interest, and savings from extra payments so you can become debt-free faster.',
  alternates: { canonical: '/tools/credit-card-payoff-calculator' },
  openGraph: {
    title: 'Credit Card Payoff Calculator (2026) - Debt-Free Date & Interest',
    description: 'Calculate credit card payoff date, total interest, and savings from extra payments so you can become debt-free faster.',
    url: '/tools/credit-card-payoff-calculator',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading calculator...</div>}>
          <CreditCardPayoffCalculator locale="en" />
        </Suspense>
      </main>
    </>
  );
}
