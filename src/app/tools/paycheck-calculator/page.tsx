import type { Metadata } from 'next';
import { Suspense } from 'react';
import PaycheckCalculator from '@/components/PaycheckCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate my take-home pay after taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Take-home pay = Gross salary - Federal tax - State tax - Social Security - Medicare - Deductions. Federal tax uses progressive brackets (10-37%). Social Security is 6.2% up to $168,600. Medicare is 1.45% + 0.9% over $200k. State tax varies by state."
      }
    },
    {
      "@type": "Question",
      "name": "What is FICA tax and how is it calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FICA includes Social Security (6.2% of wages, capped at $168,600 in 2024) and Medicare (1.45% of all wages, plus 0.9% additional for income over $200,000). Employees pay half; employers pay the other half. Self-employed pay both halves."
      }
    },
    {
      "@type": "Question",
      "name": "How do pre-tax deductions affect my paycheck?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pre-tax deductions (401k, health insurance, HSA) reduce your taxable income before tax calculation. This lowers your federal and state tax liability. A $500/month 401k contribution can save approximately $1,800 in annual federal taxes for someone earning $75k."
      }
    },
    {
      "@type": "Question",
      "name": "Which states have no income tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "States with no income tax: Texas, Florida, Washington, Nevada, Wyoming, South Dakota, Alaska (some local taxes). Tennessee and New Hampshire tax only investment income. Living in these states increases take-home pay significantly."
      }
    },
    {
      "@type": "Question",
      "name": "How does filing status affect my tax withholding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Married filing jointly has higher tax brackets (roughly double single brackets), meaning less tax for the same combined income. Single filers pay more tax at higher incomes. Choose the status that matches your actual tax return filing."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Paycheck Calculator - Estimate Take-Home Pay After Taxes',
  description: 'Calculate net income after federal, state, and FICA taxes. Plan budget with actual paycheck amounts.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PaycheckCalculator />
    </Suspense>
  );
}