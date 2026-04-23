import type { Metadata } from 'next';

const faqs = [
  {
    q: "What is an amortization schedule?",
    a: "An amortization schedule is a table showing each loan payment breakdown into principal and interest portions. Early payments are mostly interest; later payments are mostly principal. The schedule also shows the remaining balance after each payment."
  },
  {
    q: "How is monthly payment calculated in amortization?",
    a: "Monthly payment is calculated using the formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is principal, r is monthly interest rate, and n is number of payments. This formula ensures equal payments throughout the loan term."
  },
  {
    q: "How much interest do I pay in the first years?",
    a: "In the early years of a 30-year mortgage, approximately 70-80% of each payment goes toward interest. For a $300,000 loan at 6.5%, you pay about $19,500 in interest in year 1, while only $3,500 reduces principal."
  },
  {
    q: "How do extra payments affect my loan?",
    a: "Extra payments directly reduce principal, which reduces future interest charges. Adding $200 extra monthly on a $300,000 30-year mortgage at 6.5% can save approximately $47,000 in interest and shorten the term by about 7 years."
  },
  {
    q: "When is the best time to make extra payments?",
    a: "Extra payments are most effective early in the loan term when interest portion is highest. In the first 5-10 years, extra payments save the most interest. After year 20 of a 30-year loan, extra payments have minimal impact on total interest."
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
  title: 'Amortization Calculator - Payment Schedule Breakdown',
  description: 'Complete amortization schedule calculator showing monthly payment breakdown, principal vs interest ratio, and extra payment savings analysis.',
  openGraph: {
    title: 'Amortization Calculator - Payment Schedule Breakdown',
    description: 'View your full loan payment schedule with principal and interest breakdown. Analyze extra payment savings.',
    type: 'website',
  },
};

export default function AmortizationLayout({
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