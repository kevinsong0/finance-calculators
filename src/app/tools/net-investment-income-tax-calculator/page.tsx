import type { Metadata } from 'next';
import { Suspense } from 'react';
import NetInvestmentIncomeTaxCalculator from '@/components/NetInvestmentIncomeTaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Net Investment Income Tax (NIIT) rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NIIT rate is 3.8% on net investment income for individuals with MAGI above threshold limits ($200K for single, $250K for married filing jointly)."
      }
    },
    {
      "@type": "Question",
      "name": "What income is subject to the 3.8% NIIT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NIIT applies to capital gains, dividends, interest, rental income, royalties, and passive business income. It does not apply to wages, Social Security, tax-exempt interest, or active business income."
      }
    },
    {
      "@type": "Question",
      "name": "What are the NIIT income thresholds for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The thresholds are $200,000 for single filers, $250,000 for married filing jointly and head of household, and $125,000 for married filing separately."
      }
    },
    {
      "@type": "Question",
      "name": "How is the NIIT tax base calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NIIT applies to the lesser of: (1) your net investment income, or (2) your MAGI minus the threshold. This ensures NIIT only applies to investment income above the threshold."
      }
    },
    {
      "@type": "Question",
      "name": "How can I avoid or reduce the NIIT?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategies include: tax-loss harvesting to offset gains, investing in municipal bonds (tax-exempt), increasing retirement contributions to reduce MAGI, charitable giving to lower MAGI, and converting passive business income to active through material participation."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Net Investment Income Tax Calculator - Calculate 3.8% NIIT on Investment Income',
  description: 'Calculate your Net Investment Income Tax (NIIT) liability. 3.8% tax on capital gains, dividends, interest, and rental income above income thresholds.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NetInvestmentIncomeTaxCalculator />
    </Suspense>
  );
}