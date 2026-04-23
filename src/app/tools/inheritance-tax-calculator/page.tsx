import type { Metadata } from 'next';
import { Suspense } from 'react';
import InheritanceTaxCalculator from '@/components/InheritanceTaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do beneficiaries pay federal inheritance tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, there is no federal inheritance tax. Beneficiaries pay no federal tax on inherited assets. The deceased's estate may owe federal estate tax (if over $13.61M exemption), but beneficiaries receive the net amount tax-free. Only 6 states have state inheritance taxes."
      }
    },
    {
      "@type": "Question",
      "name": "Which states have inheritance tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Six states: New Jersey, Pennsylvania, Kentucky, Iowa, Maryland, and Nebraska (as inheritance tax states). Rates vary by relationship: children/spouses typically exempt or low rate, siblings 4-15%, other relatives/non-relatives 10-18%. Most other states have no inheritance tax."
      }
    },
    {
      "@type": "Question",
      "name": "What is step-up in basis for inherited assets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Step-up in basis resets the cost basis of inherited assets to fair market value at date of death. Example: Parent bought stock at $10, worth $100 at death. Your basis is $100, not $10. Sell at $105: only $5 capital gains, not $95. Saves significant taxes on appreciated assets."
      }
    },
    {
      "@type": "Question",
      "name": "Are inherited IRAs taxed differently?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, inherited IRAs/401(k)s have special rules. Traditional IRA: distributions taxed as ordinary income to beneficiary. Roth IRA: tax-free distributions (if account held 5+ years). Most beneficiaries must withdraw within 10 years (SECURE Act). Spouse can treat as own IRA. No step-up in basis."
      }
    },
    {
      "@type": "Question",
      "name": "Is life insurance inheritance taxable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Life insurance proceeds are generally tax-free to beneficiaries. No federal income tax on death benefit. Not subject to inheritance tax. However, if payable to estate, may be included in estate tax calculation. Interest earned after death is taxable. Consider naming beneficiaries directly."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Inheritance Tax Calculator - State Inheritance Taxes by Relationship',
  description: 'Calculate inheritance taxes based on state, relationship to deceased, and asset type. Understand inheritance vs estate tax and step-up basis rules.',
  keywords: ['inheritance tax calculator', 'inheritance tax', 'state inheritance tax', 'beneficiary tax', 'step-up basis', 'inherited assets', 'estate vs inheritance', 'inheritance tax rates'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <InheritanceTaxCalculator />
    </Suspense>
  );
}