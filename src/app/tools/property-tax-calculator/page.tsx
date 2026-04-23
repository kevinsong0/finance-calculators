import type { Metadata } from 'next';
import { Suspense } from 'react';
import PropertyTaxCalculator from '@/components/PropertyTaxCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is property tax calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Property tax is calculated by multiplying the assessed value by the local tax rate. Assessed value = market value x assessment ratio (some states assess at a fraction of market value). Annual tax = assessed value x tax rate. Rates vary by state: Colorado ~0.52%, New Jersey ~2.49%, national average ~1.1%."
      }
    },
    {
      "@type": "Question",
      "name": "What is a homestead exemption for property taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Homestead exemption reduces assessed value for primary residences. Florida offers $25,000-$50,000 exemption. Texas provides $25,000 school tax exemption. California's Prop 13 limits annual increases to 2%. Exemptions vary by state - check with your county assessor for eligibility and amounts."
      }
    },
    {
      "@type": "Question",
      "name": "Which states have the highest property taxes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Highest property tax states: New Jersey (2.49% effective rate), Illinois (2.2%), Connecticut (1.75%), New Hampshire (1.74%), Wisconsin (1.68%). Lowest: Hawaii (0.29%), Alabama (0.39%), Colorado (0.52%), Delaware (0.56%). High-tax states often have lower income/sales taxes as tradeoff."
      }
    },
    {
      "@type": "Question",
      "name": "Can I appeal my property tax assessment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can appeal if assessed value exceeds market value. Gather comparable sales data showing similar homes sold for less. File appeal within deadline (typically 30-90 days after assessment notice). County assessor reviews and may adjust. Success rate ~50% for valid appeals with supporting evidence."
      }
    },
    {
      "@type": "Question",
      "name": "What property tax exemptions are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common exemptions: Homestead (primary residence), Senior (over 65, varies by state), Veteran/Disabled (military service or disability), Agricultural (farm land), Historic Property. Some states offer freeze programs for seniors. Apply with county assessor - deadlines and amounts vary by jurisdiction."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Property Tax Calculator - Calculate Annual Taxes by State',
  description: 'Calculate property taxes by state including assessment ratios, homestead exemptions, and effective rates. Compare to national average.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PropertyTaxCalculator />
    </Suspense>
  );
}