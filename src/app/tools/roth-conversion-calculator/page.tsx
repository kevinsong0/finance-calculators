import type { Metadata } from 'next';
import { Suspense } from 'react';
import RothConversionCalculator from '@/components/RothConversionCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Roth IRA conversion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Roth conversion transfers money from a Traditional IRA, 401(k), or other pre-tax retirement account to a Roth IRA. You pay income tax on the converted amount in the year of conversion. Future growth and withdrawals become tax-free, providing tax diversification in retirement."
      }
    },
    {
      "@type": "Question",
      "name": "When should I convert Traditional IRA to Roth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Convert when your current tax rate is lower than your expected retirement tax rate. Good times include: early career with lower income, years with lower earnings due to job change, before large future income increases, or when you have cash outside retirement accounts to pay conversion taxes."
      }
    },
    {
      "@type": "Question",
      "name": "How do I pay taxes on a Roth conversion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conversion taxes are paid with your regular income tax filing. Best practice: pay taxes from non-retirement funds to maximize the converted amount. Using retirement funds to pay taxes reduces your tax-advantaged savings and may trigger penalties if under 59.5. Plan ahead to have cash available."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of Roth conversion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefits include: tax-free growth and withdrawals, no required minimum distributions (RMDs) during owner's lifetime, tax diversification strategy, estate planning benefits (heirs inherit tax-free), protection against future tax rate increases. Roth accounts are ideal for high-growth investments and long-term planning."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a limit on Roth conversions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There's no limit on conversion amounts. Previously, high-income earners couldn't contribute to Roth IRAs, but conversions had income limits. Since 2010, anyone can convert regardless of income. However, converted funds must stay in Roth for 5+ years and until age 59.5 to avoid penalties on earnings."
      }
    }
  ]
};

// SoftwareApplication schema for AI crawlers (GEO)
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Roth IRA Conversion Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Calculate the tax implications of converting Traditional IRA to Roth IRA and plan optimal conversion timing.",
  "featureList": ["Conversion tax analysis", "Current vs future tax rates", "5-year rule tracking", "Roth ladder strategy"]
};

// BreadcrumbList schema for navigation
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
    { "@type": "ListItem", "position": 2, "name": "Investment Hub", "item": "https://finance.128345827.xyz/tools/investment-hub" },
    { "@type": "ListItem", "position": 3, "name": "Roth Conversion Calculator", "item": "https://finance.128345827.xyz/tools/roth-conversion-calculator" }
  ]
};

export const metadata: Metadata = {
  title: 'Roth IRA Conversion Calculator - Analyze Tax Benefits',
  description: 'Calculate the tax implications of converting Traditional IRA to Roth IRA. Compare current vs future tax rates and plan optimal conversion timing.',
  keywords: ['Roth conversion calculator', 'Traditional IRA to Roth', 'backdoor Roth', 'IRA conversion', 'tax-free retirement', 'Roth IRA', 'retirement tax planning', 'conversion timing'],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
          <RothConversionCalculator />
        </Suspense>
      </main>
    </>
  );
}