import type { Metadata } from 'next';

const faqs = [
  {
    q: "What is a good interest rate for an auto loan?",
    a: "Good auto loan rates depend on credit score and loan term. For new cars in 2026: excellent credit (720+) gets 5-6%, good credit (660-719) gets 6-8%, fair credit (620-659) gets 8-12%. Used car rates are typically 1-2% higher. Shorter terms (36-48 months) have lower rates than longer terms (72-84 months)."
  },
  {
    q: "How much down payment should I make on a car?",
    a: "A 20% down payment is recommended for new cars to avoid negative equity and reduce monthly payments. For used cars, 10% is acceptable. Zero down payment is possible but increases total interest and risks owing more than the car's value. Larger down payments reduce loan amount and interest costs."
  },
  {
    q: "Should I choose a longer loan term for lower payments?",
    a: "Longer terms lower monthly payments but increase total interest significantly. A $30,000 loan at 6%: 36 months costs $2,800 interest, 72 months costs $5,900 interest. Longer terms also risk negative equity if the car depreciates faster than you pay down principal. Choose the shortest term you can afford."
  },
  {
    q: "What fees should I include in my auto loan calculation?",
    a: "Include sales tax (typically 5-10% depending on state), registration and title fees ($50-300), dealer documentation fees ($100-500), and any extended warranty or protection packages. These can add 10-15% to the car price. Some states allow tax deduction for trade-in value."
  },
  {
    q: "How does prepayment affect my auto loan?",
    a: "Auto loans typically allow prepayment without penalty. Paying extra reduces principal faster, shortens the loan term, and saves interest. Adding $100 extra monthly on a $25,000 5-year loan at 6% saves about $400 in interest and finishes 4 months early. Always confirm no prepayment penalty before signing."
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
  title: 'Auto Loan Calculator (2026) - Car Payment, APR & Total Interest',
  description: 'Estimate auto loan monthly payment, total interest, payoff timeline, and the impact of down payment, taxes, and fees.',
  openGraph: {
    title: 'Auto Loan Calculator (2026) - Car Payment, APR & Total Interest',
    description: 'Estimate auto loan monthly payment, total interest, payoff timeline, and the impact of down payment, taxes, and fees.',
    type: 'website',
  },
};

export default function AutoLoanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
