import type { Metadata } from 'next';
import { Suspense } from 'react';
import RentalPropertyCalculator from '@/components/RentalPropertyCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 1% rule in rental property investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 1% rule states that monthly rent should be at least 1% of the property purchase price. For a $300,000 property, you should charge at least $3,000/month rent. This rule provides a quick screening test for potential investments, though you should also analyze actual expenses and cash flow."
      }
    },
    {
      "@type": "Question",
      "name": "What is cap rate for rental properties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cap rate (capitalization rate) measures rental property return without financing. Formula: NOI divided by property value. Example: $12,000 NOI on $200,000 property = 6% cap rate. Higher cap rates indicate higher returns but potentially higher risk. Most residential properties have 4-8% cap rates."
      }
    },
    {
      "@type": "Question",
      "name": "What is cash-on-cash return?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash-on-cash return measures annual cash flow relative to cash invested. Formula: Annual pre-tax cash flow divided by total cash invested. Example: $8,000 cash flow on $50,000 down payment = 16% cash-on-cash. This metric accounts for financing and shows actual return on your invested capital."
      }
    },
    {
      "@type": "Question",
      "name": "What is the 50% rule for operating expenses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 50% rule estimates that operating expenses (excluding mortgage) equal about 50% of gross rental income. This includes taxes, insurance, maintenance, property management, and vacancy. Quick estimate: $2,000 rent - $1,000 expenses - mortgage payment = cash flow. Use for initial screening only."
      }
    },
    {
      "@type": "Question",
      "name": "How much down payment for rental property?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investment property down payments typically require 20-25%, compared to 3-5% for primary residences. Lenders see higher risk. Conventional loans: 15-25% down. Portfolio loans: 20-30% down. Better rates and terms with 25%+ down. Calculate if lower down payment reduces cash-on-cash return too much."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Rental Property ROI Calculator - Analyze Investment Returns',
  description: 'Calculate rental property cash flow, cap rate, cash-on-cash return, and appreciation. Analyze investment property metrics including DSCR and 10-year projections.',
  keywords: ['rental property calculator', 'investment property ROI', 'cap rate calculator', 'cash flow analysis', 'real estate investment', 'rental ROI', 'cash-on-cash return', 'landlord calculator'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RentalPropertyCalculator />
    </Suspense>
  );
}