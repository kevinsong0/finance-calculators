import type { Metadata } from 'next';
import { Suspense } from 'react';
import EstateTaxCalculator from '@/components/EstateTaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the federal estate tax exemption?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The federal estate tax exemption is $13.61 million per person in 2024, doubling to $27.22 million for married couples with proper planning. Estates below this threshold pay no federal estate tax. The exemption is portable between spouses, allowing a surviving spouse to use both exemptions."
      }
    },
    {
      "@type": "Question",
      "name": "How much is the federal estate tax rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The federal estate tax rate is 40% on amounts exceeding the exemption. This is a flat rate applied to the taxable portion of the estate, not a progressive scale. Some estates may also owe state estate taxes, which vary from 8% to 20% depending on the state."
      }
    },
    {
      "@type": "Question",
      "name": "Which states have estate taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "States with estate taxes include: New York, Massachusetts, Connecticut, New Jersey, Maryland, Oregon, Vermont, Rhode Island, Hawaii, Washington, Minnesota, Illinois, and Maine. Exemptions vary widely from $675,000 (NJ inheritance) to over $13 million. Some states also have inheritance taxes on recipients."
      }
    },
    {
      "@type": "Question",
      "name": "How can I reduce or avoid estate taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategies include: annual gift exclusion ($17,000/person in 2024), charitable giving and deductions, irrevocable life insurance trusts (ILITs), family limited partnerships, qualified personal residence trusts, spending down estate, and using both spouses' exemptions. Professional estate planning can significantly reduce or eliminate estate taxes."
      }
    },
    {
      "@type": "Question",
      "name": "Is life insurance subject to estate tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Life insurance proceeds are included in your estate if you own the policy or have incidents of ownership. Using an irrevocable life insurance trust (ILIT) removes policy value from your estate, potentially saving significant taxes. The trust owns the policy, and proceeds go directly to beneficiaries outside the estate."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Estate Tax Calculator - Calculate Federal and State Estate Taxes',
  description: 'Calculate estate taxes based on federal and state exemptions. Plan inheritance tax strategies including charitable deductions and trust planning.',
  keywords: ['estate tax calculator', 'inheritance tax', 'estate planning', 'federal estate tax', 'state estate tax', 'estate exemption', 'tax reduction strategies', 'wealth transfer'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EstateTaxCalculator />
    </Suspense>
  );
}