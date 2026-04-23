import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeTaxWithholdingGuide from '@/components/EmployeeTaxWithholdingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of taxes are withheld from employee pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tax withholding types include federal income tax (progressive brackets based on wage and filing status), state income tax (state-specific rates based on residence), Social Security (6.2% employee rate up to wage cap), Medicare (1.45% employee rate on all wages), local tax (local jurisdiction specific), and additional Medicare (0.9% above threshold for high earners)."
      }
    },
    {
      "@type": "Question",
      "name": "What forms are used for tax withholding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key forms include W-4 for federal withholding setup, state withholding forms, I-9 for employment eligibility verification, W-2 for year-end reporting, 1099 for contractor reporting, 941 for quarterly filing, 940 for annual unemployment tax, and various state tax returns."
      }
    },
    {
      "@type": "Question",
      "name": "How is tax withholding calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calculation steps include determining filing status from W-4, checking allowances claimed, using IRS withholding tables, applying wage brackets, calculating periodic withholding amounts, adjusting for additional withholding requests, verifying total withholding accuracy, and reporting on pay stub."
      }
    },
    {
      "@type": "Question",
      "name": "When should withholding be adjusted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Adjustment triggers include filing status changes (marriage, divorce requiring W-4 update), allowance changes (dependent changes requiring revised withholding), additional withholding requests (tax planning adding extra amounts), and exempt status claims (no tax liability situations)."
      }
    },
    {
      "@type": "Question",
      "name": "How often should employees update their W-4?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employees should update W-4 whenever their tax situation changes significantly: marriage, divorce, new dependents, major income changes, or when tax planning adjustments are needed. Annual review is recommended to ensure withholding matches expected tax liability."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Tax Withholding Guide - Taxes, Forms & Calculation',
  description: 'Tax types, forms, calculation steps, and withholding adjustments.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeTaxWithholdingGuide />
    </Suspense>
  );
}