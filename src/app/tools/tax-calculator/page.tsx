import type { Metadata } from 'next';
import { Suspense } from 'react';
import TaxCalculator from '@/components/TaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the standard deduction for 2024?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2024 standard deduction amounts: Single = $13,850, Married Filing Jointly = $27,700, Head of Household = $20,800. Add $1,850 (single/head) or $1,550 (married) if 65+ or blind."
      }
    },
    {
      "@type": "Question",
      "name": "How do tax brackets work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tax brackets are progressive - each portion of income is taxed at its bracket rate. For $80,000 income (single): first $11,000 at 10%, $11,001-$44,475 at 12%, $44,476-$80,000 at 22%. Your marginal rate is the highest bracket reached."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between tax deduction and tax credit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deductions reduce taxable income before calculating tax. Credits directly reduce the tax amount owed. A $1,000 deduction saves about $220 in tax (at 22% bracket), while a $1,000 credit saves exactly $1,000. Credits are more valuable."
      }
    },
    {
      "@type": "Question",
      "name": "How are capital gains taxed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Long-term capital gains (assets held >1 year) have preferential rates: 0% up to $44,475 income, 15% up to $517,200, 20% above that. Short-term gains (held <1 year) are taxed as ordinary income at your regular bracket rate."
      }
    },
    {
      "@type": "Question",
      "name": "Should I itemize or take the standard deduction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose whichever is larger. Itemize if mortgage interest, charitable donations, medical expenses (above 7.5% AGI), and state/local taxes (capped at $10,000) exceed the standard deduction. Most taxpayers now take standard deduction."
      }
    }
  ]
};

// SoftwareApplication schema for AI crawlers (GEO)
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Income Tax Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Calculate federal and state income taxes with deductions, credits, and filing status options.",
  "featureList": ["Tax bracket calculation", "Deduction comparison", "Capital gains tax", "Filing status options"]
};

// BreadcrumbList schema for navigation
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
    { "@type": "ListItem", "position": 2, "name": "Tax Hub", "item": "https://finance.128345827.xyz/tools/tax-hub" },
    { "@type": "ListItem", "position": 3, "name": "Tax Calculator", "item": "https://finance.128345827.xyz/tools/tax-calculator" }
  ]
};

export const metadata: Metadata = {
  title: 'Income Tax Calculator - Federal & State Tax Estimator',
  description: 'Calculate federal and state income taxes with deductions, credits, capital gains, and filing status options.',
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
          <TaxCalculator />
        </Suspense>
      </main>
    </>
  );
}