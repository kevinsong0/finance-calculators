import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessLoanCalculator from '@/components/BusinessLoanCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the types of business loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Main types: term loans (fixed payments, full amortization), business lines of credit (flexible draws, interest-only), SBA loans (government-backed, lower rates), equipment financing (asset-secured), invoice financing (advance on receivables). Each serves different needs - choose based on use case."
      }
    },
    {
      "@type": "Question",
      "name": "What interest rates do business loans have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business loan rates vary widely: SBA 7(a): Prime + 2.25-4.75% (7-10%), traditional bank term loans: 6-13%, online lenders: 7-30%, lines of credit: 7-25%. Rates depend on credit score, time in business, revenue, collateral. Banks offer best rates but stricter requirements."
      }
    },
    {
      "@type": "Question",
      "name": "What credit score is needed for a business loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional banks: 680+ preferred, often 700+ for best rates. Online lenders: 600-650 minimum acceptable. SBA loans: 650-680+ required. Personal credit matters for small businesses (under 2 years). Build business credit separately with vendor accounts and credit cards."
      }
    },
    {
      "@type": "Question",
      "name": "How long does business loan approval take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Approval times vary: online lenders: 1-3 days, banks: 2-4 weeks, SBA loans: 2-6 weeks (sometimes longer). SBA expedited processing available for some loans. Prepare documents upfront: financial statements, tax returns, business plan. Faster approval with complete applications."
      }
    },
    {
      "@type": "Question",
      "name": "What is an SBA loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SBA (Small Business Administration) loans are government-backed loans with lower rates and longer terms. Main programs: 7(a) general business (up to $5M), 504 real estate/equipment (up to $5.5M), microloans (up to $50K). Government guarantee reduces lender risk, enabling better terms for borrowers."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Loan Calculator - Calculate Payments & Costs',
  description: 'Calculate business loan payments for term loans, lines of credit, and SBA loans. Compare financing options and analyze total borrowing costs.',
  keywords: ['business loan calculator', 'SBA loan', 'term loan', 'business line of credit', 'commercial loan', 'small business financing', 'loan payment calculator', 'business borrowing'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessLoanCalculator />
    </Suspense>
  );
}