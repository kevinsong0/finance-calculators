import type { Metadata } from 'next';
import { Suspense } from 'react';
import SaltDeductionCalculator from '@/components/SaltDeductionCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the SALT deduction cap for 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SALT (State and Local Tax) deduction is capped at $10,000 under TCJA (2018-2025). Cap applies to all filing statuses - married couples share one $10,000 cap. Includes state/local income taxes, property taxes. Cap expires after 2025 unless Congress extends. Before TCJA, SALT was unlimited."
      }
    },
    {
      "@type": "Question",
      "name": "Should I itemize or take standard deduction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2026 standard deduction: Single $15,000, Married $30,000, Head of Household $22,500. Itemize if total deductions (SALT capped at $10K + mortgage interest + charitable + medical over 7.5% AGI) exceed standard. SALT cap makes standard deduction better for most taxpayers. Compare both options."
      }
    },
    {
      "@type": "Question",
      "name": "What taxes are included in SALT deduction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SALT deduction includes: State and local income taxes OR sales taxes (choose one, not both), property taxes on real estate and personal property. Does not include: Federal taxes, foreign taxes, homeowner association fees, sewer/water fees. Total capped at $10,000 regardless of actual taxes paid."
      }
    },
    {
      "@type": "Question",
      "name": "How does the SALT cap affect high-tax states?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High-tax states (CA, NY, NJ, CT, IL) most affected by $10,000 cap. Residents pay $15,000-$30,000+ in state/property taxes but can only deduct $10,000. Tax cost: Lost deduction x marginal rate (e.g., $10,000 lost at 24% = $2,400 extra tax). PTET workaround in some states allows business-level uncapped SALT."
      }
    },
    {
      "@type": "Question",
      "name": "Will the SALT cap change after 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TCJA SALT cap expires after 2025. Possible changes: Increase cap ($20,000 proposed), eliminate cap entirely, state-by-state adjustments, or extend current $10,000 cap. Congressional negotiations ongoing. High-tax state representatives push for cap increase. Monitor legislation for 2026 tax planning."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'SALT Deduction Calculator - State and Local Tax Deduction Under $10K Cap',
  description: 'Calculate SALT deduction impact under TCJA $10,000 cap. Compare itemized vs standard deduction and estimate tax cost of cap.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SaltDeductionCalculator />
    </Suspense>
  );
}