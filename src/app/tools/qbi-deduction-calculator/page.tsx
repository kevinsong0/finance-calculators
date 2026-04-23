import type { Metadata } from 'next';
import { Suspense } from 'react';
import QBIDeductionCalculator from '@/components/QBIDeductionCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the QBI deduction (Section 199A)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The QBI deduction allows eligible businesses to deduct up to 20% of qualified business income. Available to sole proprietors, partnerships, S corporations, and certain trusts. Created by TCJA, available through 2025 (may be extended)."
      }
    },
    {
      "@type": "Question",
      "name": "What are the QBI income thresholds for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For 2026, the QBI thresholds are approximately $191,950 for single/head of household and $383,900 for married filing jointly. Below threshold: full 20% deduction. Above threshold: wage/property limitations apply."
      }
    },
    {
      "@type": "Question",
      "name": "What is an SSTB (Specified Service Trade or Business)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSTBs include health, law, accounting, actuarial science, performing arts, consulting, athletics, financial services, and brokerage services. SSTBs have limited QBI deduction above income thresholds. Architecture and engineering are NOT SSTBs."
      }
    },
    {
      "@type": "Question",
      "name": "How is QBI deduction limited at higher incomes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Above threshold, QBI deduction limited to: 50% of W-2 wages OR 25% of W-2 wages plus 2.5% of qualified property. SSTBs lose deduction entirely above upper threshold ($242,050 single, $484,100 married)."
      }
    },
    {
      "@type": "Question",
      "name": "What forms do I file for QBI deduction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "File Form 8995 for simple situations (income below threshold, no SSTB). File Form 8995-A for complex situations (income above threshold, SSTB, multiple businesses, aggregation). Deduction reported on Form 1040 line 13."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'QBI Deduction Calculator - Section 199A Qualified Business Income',
  description: 'Calculate 20% QBI deduction for small businesses. SSTB limitations, wage/property thresholds, and optimization strategies. Form 8995/8995-A analysis.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <QBIDeductionCalculator />
    </Suspense>
  );
}