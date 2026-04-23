import type { Metadata } from 'next';
import { Suspense } from 'react';
import HELOCCalculator from '@/components/HELOCCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a HELOC and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Home Equity Line of Credit (HELOC) is a revolving credit line using your home as collateral. During the draw period (5-10 years), you can borrow up to your limit, repay, and borrow again, paying interest only. During repayment (10-20 years), you must pay principal and interest with no further withdrawals."
      }
    },
    {
      "@type": "Question",
      "name": "How much can I borrow with a HELOC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most lenders allow 80-85% combined loan-to-value (CLTV). Example: $500,000 home with $200,000 mortgage = $300,000 equity. At 80% CLTV, max total debt = $400,000, so max HELOC = $200,000. Lenders also consider credit score, income, and debt-to-income ratio."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between HELOC and home equity loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HELOC: Revolving credit line, variable rate, interest-only option during draw, borrow as needed. Home equity loan: Fixed lump sum, fixed rate, immediate full principal+interest payments. HELOC offers flexibility; home equity loan offers predictability and rate certainty."
      }
    },
    {
      "@type": "Question",
      "name": "Are HELOC interest rates fixed or variable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HELOC rates are typically variable, tied to the prime rate plus a margin. Current rates range 8-10%. When prime increases, your rate and payments increase. Some lenders offer fixed-rate conversion options or hybrid HELOCs with fixed portions for rate protection."
      }
    },
    {
      "@type": "Question",
      "name": "What are HELOC closing costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HELOC closing costs include: appraisal ($300-500), application fee ($50-100), title search ($200-400), credit report ($25-50), and potentially attorney fees. Total costs range $200-2,000. Many lenders waive fees for credit lines under certain amounts or offer no-cost HELOCs with higher rates."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'HELOC Calculator - Calculate Home Equity Line of Credit',
  description: 'Calculate your HELOC borrowing capacity, draw period payments, repayment costs, and total interest. Compare HELOC vs cash-out refinance options.',
  keywords: ['HELOC calculator', 'home equity line of credit', 'HELOC payment', 'home equity', 'second mortgage', 'draw period', 'repayment period', 'variable rate loan'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HELOCCalculator />
    </Suspense>
  );
}