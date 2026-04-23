import type { Metadata } from 'next';
import { Suspense } from 'react';
import GiftTaxCalculator from '@/components/GiftTaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the gift tax annual exclusion for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The gift tax annual exclusion for 2026 is approximately $18,000 per recipient. You can give up to this amount to any number of individuals without reporting or tax consequences. Married couples can split gifts for $36,000 per recipient."
      }
    },
    {
      "@type": "Question",
      "name": "What is the lifetime gift tax exemption?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The lifetime gift tax exemption for 2026 is approximately $12.92 million per individual. This exemption is unified with the estate tax exemption - gifts during life reduce the exemption available at death."
      }
    },
    {
      "@type": "Question",
      "name": "Are gifts to spouses subject to gift tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The unlimited marital deduction allows gifts of any amount to a U.S. citizen spouse without gift tax consequences. Gifts to non-citizen spouses have a special annual exclusion limit of approximately $185,000 for 2026."
      }
    },
    {
      "@type": "Question",
      "name": "What gifts are excluded from gift tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Excluded gifts include: tuition paid directly to educational institutions, medical expenses paid directly to healthcare providers, gifts to qualifying charities, political donations, and gifts to spouses (unlimited marital deduction)."
      }
    },
    {
      "@type": "Question",
      "name": "When must I file Form 709 for gift tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "File Form 709 if you made gifts exceeding the annual exclusion, gifts of future interests, gifts requiring GST allocation, or if you elected gift splitting with spouse. Form 709 is due April 15 of the year following the gift."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Gift Tax Calculator - Annual Exclusion & Lifetime Exemption 2026',
  description: 'Calculate federal gift tax on transfers. Annual exclusion, lifetime exemption, educational/medical exclusions, and estate tax impact. Form 709 reporting.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GiftTaxCalculator />
    </Suspense>
  );
}