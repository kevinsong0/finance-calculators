import type { Metadata } from 'next';
import { Suspense } from 'react';
import DSCRLoanCalculator from '@/components/DSCRLoanCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is DSCR (Debt Service Coverage Ratio)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DSCR measures a property's ability to cover its debt payments. Formula: Net Operating Income (NOI) divided by Annual Debt Service (mortgage payments). DSCR of 1.25 means NOI covers debt with 25% buffer. Lenders require minimum DSCR to ensure loan repayment ability."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum DSCR for commercial loans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimum DSCR varies by property type: multifamily: 1.25x, office: 1.35x, retail: 1.30x, industrial: 1.25x, hotel: 1.40x. Lenders prefer 1.25-1.50 for safety. Lower DSCR increases default risk. Some lenders approve loans at 1.0x with additional conditions or higher rates."
      }
    },
    {
      "@type": "Question",
      "name": "How is NOI calculated for DSCR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NOI (Net Operating Income) = Gross Rental Income minus Operating Expenses. Operating expenses include: property taxes, insurance, maintenance, property management, utilities (if landlord pays), vacancy allowance. Do NOT include mortgage payments or capital expenditures in NOI calculation."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get a DSCR loan with bad personal credit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DSCR loans focus on property income rather than personal credit. Some lenders approve loans with DSCR 1.0+ regardless of credit score. These 'no-doc' or 'non-QM' loans are popular for investors. Rates may be higher (7-10%) and terms shorter. Personal credit still affects rates and terms."
      }
    },
    {
      "@type": "Question",
      "name": "How can I improve my DSCR?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Increase NOI: raise rents (if market allows), reduce vacancies, cut operating costs, add income sources (parking, storage). Reduce debt service: lower loan amount, negotiate better rate, extend loan term. Lenders reward higher DSCR with better terms. Target 1.30+ for optimal financing."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'DSCR Loan Calculator - Debt Service Coverage Ratio',
  description: 'Calculate DSCR for commercial real estate loans. Analyze property NOI, debt service, and determine loan qualification based on property type requirements.',
  keywords: ['DSCR calculator', 'debt service coverage ratio', 'commercial loan', 'NOI calculator', 'real estate financing', 'DSCR loan', 'investment property loan', 'commercial mortgage'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DSCRLoanCalculator />
    </Suspense>
  );
}