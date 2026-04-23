import type { Metadata } from 'next';
import { Suspense } from 'react';
import Exchange1031Calculator from '@/components/Exchange1031Calculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a 1031 exchange?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1031 exchange (IRS Section 1031) allows tax-deferred swap of like-kind investment properties. Sell property, reinvest proceeds in replacement property within 180 days, defer all capital gains tax. Requirements: Properties must be like-kind (real estate for real estate), use Qualified Intermediary (QI), replacement value must equal or exceed sale price."
      }
    },
    {
      "@type": "Question",
      "name": "What are the deadlines for a 1031 exchange?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1031 exchange deadlines: 45 days to identify replacement properties (submit list to QI), 180 days to close on replacement property. Both deadlines start from sale of relinquished property. Can identify up to 3 properties (3-property rule), or more under alternative rules. Extensions not allowed (even for holidays/weekends)."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if 1031 exchange requirements aren't met?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Failed 1031 consequences: Capital gains tax (20% federal + state), depreciation recapture (25% on accumulated depreciation), plus potential penalties. Boot (cash or lesser value) is immediately taxable. Partial exchange: Only deferred portion is tax-free. Missed deadlines cannot be extended. Consult tax advisor before exchange."
      }
    },
    {
      "@type": "Question",
      "name": "Can I do multiple 1031 exchanges?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, unlimited 1031 exchanges allowed. Each exchange defers gain, with new basis carried forward. Continue deferring until final sale (tax then due) or death (heirs get step-up basis, deferred gain eliminated). Strategy: Keep deferring through lifetime. Estate planning benefit: Heirs inherit at market value, no deferred tax."
      }
    },
    {
      "@type": "Question",
      "name": "What property types qualify for 1031 exchange?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Like-kind: Any real estate for any real estate (residential rental, commercial, land, industrial, vacation rental). Not like-kind: Personal residence, stocks/bonds, partnership interests, personal property. Must be held for investment/business (not personal use). Primary residence excluded. Vacation home: May qualify if rented most of year."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: '1031 Exchange Calculator - Calculate Tax Savings for Real Estate Like-Kind Exchange',
  description: 'Calculate 1031 exchange tax savings, deferred gain, and new basis. Compare tax with exchange vs without exchange for real estate investors.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Exchange1031Calculator />
    </Suspense>
  );
}