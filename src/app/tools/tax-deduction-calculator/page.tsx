import type { Metadata } from 'next';
import { Suspense } from 'react';
import TaxDeductionCalculator from '@/components/TaxDeductionCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Should I itemize deductions or take the standard deduction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You should itemize if your total itemized deductions exceed the standard deduction ($13,850 for single filers in 2024). Common itemized deductions include mortgage interest, property taxes, charitable donations, and medical expenses exceeding 7.5% of AGI."
      }
    },
    {
      "@type": "Question",
      "name": "What deductions are available without itemizing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Above-the-line deductions are available regardless of itemizing: student loan interest (up to $2,500), traditional IRA contributions, HSA contributions, self-employment tax deduction, alimony payments, and educator expenses (up to $300)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the SALT deduction cap?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The State and Local Tax (SALT) deduction is capped at $10,000 total. This includes state income taxes, local income taxes, and property taxes combined. This cap applies to both single and married filing jointly statuses."
      }
    },
    {
      "@type": "Question",
      "name": "How much medical expenses can I deduct?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Medical expenses are only deductible if they exceed 7.5% of your adjusted gross income (AGI). For example, if your AGI is $100,000, you can only deduct medical expenses above $7,500. Qualifying expenses include insurance premiums, doctor visits, prescriptions, and medical equipment."
      }
    },
    {
      "@type": "Question",
      "name": "What records should I keep for tax deductions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Keep documentation for all claimed deductions: mortgage interest statements (Form 1098), property tax bills, charitable donation receipts, medical expense records, and receipts for other itemized deductions. The IRS may request proof of deductions during audits."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Tax Deduction Calculator - Itemized vs Standard Deduction',
  description: 'Compare itemized deductions vs standard deduction. Calculate mortgage interest, property tax, charitable donations, and medical expense deductions.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <TaxDeductionCalculator />
    </Suspense>
  );
}
