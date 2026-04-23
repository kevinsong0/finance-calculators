import type { Metadata } from 'next';
import { Suspense } from 'react';
import WeddingBudgetGuide from '@/components/WeddingBudgetGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a wedding cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wedding cost varies: US average: $20k-30k total (varies by region, city, guest count). Regional differences: Major cities (NYC, LA) = $40k-60k+, rural/smaller cities = $15k-25k. Guest count impact: More guests = higher catering, venue, invitation costs. Average per guest: $100-200 total cost. Components: Venue (30-40%), catering (20-25%), photography (10-15%), attire (5-10%), music (5-10%), flowers/decor (5-10%), misc (10-15%). Cost drivers: Location, guest count, season, day of week, vendor choices. Budget weddings: $10k-15k possible with small guest list, DIY, simpler choices. Luxury weddings: $50k-100k+ for high-end venues, services. Your budget = your choices. Set budget first, allocate accordingly."
      }
    },
    {
      "@type": "Question",
      "name": "How do I plan a wedding budget?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wedding budget planning: 1. Determine total budget - couple contribution + family help + what you can afford. 2. Prioritize - what&apos;s most important (venue, photography, food?). 3. Allocate percentages - venue 30-40%, catering 20-25%, photo 10-15%, attire 5-10%, music 5-10%, decor 5-10%, misc 10-15%. 4. Research costs - get quotes before committing. 5. Set guest count - impacts almost every cost. 6. Adjust allocation - move budget to priorities, reduce elsewhere. 7. Contingency - reserve 10% for unexpected. 8. Track spending - spreadsheet or app, update regularly. 9. Reallocate if needed - overspend in one area = cut another. Budget = guide, not rigid. Stay within total, adjust allocations."
      }
    },
    {
      "@type": "Question",
      "name": "How do I save money on a wedding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wedding savings: Venue: Off-season dates (winter, early spring), weekday vs weekend, negotiate package deals, consider non-traditional venues (parks, community halls). Guest count: Smaller wedding = significant savings across all categories, consider limiting guest list. Catering: Buffet vs plated (cheaper), limit alcohol options, smaller cake + sheet cake for serving, consider lunch vs dinner. Photography: Off-season discounts, shorter coverage hours, hire emerging photographers. Attire: Sample sales, second-hand dresses, rental suits, non-traditional dress choices. DIY: Invitations, centerpieces, favors - if you have skills. Prioritize: Spend on what matters, cut what doesn&apos;t. Savings = smart choices, not cutting everything. Know where to splurge vs save."
      }
    },
    {
      "@type": "Question",
      "name": "What wedding costs are often overlooked?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Overlooked wedding costs: Taxes + fees: Venue taxes, service fees, gratuity (often 20% on catering). Marriage license: $50-100 depending on state. Officiant: $200-500 if not provided by venue. Transportation: Getting to venue, between venues, guest transport. Hotel for wedding night: Accommodation costs. Post-wedding brunch: Next day meal for close guests. Alterations: Dress alterations ($200-500+), suit adjustments. Beauty services: Hair, makeup for bride + bridal party. Gifts: Vendor tips, bridal party gifts, parents&apos; gifts. Insurance: Wedding insurance for protection. Setup/breakdown: Some venues charge extra. Administrative: Planning software, postage for invitations. Hidden costs = 10-15% of budget. Research thoroughly. Ask vendors for full cost breakdowns."
      }
    },
    {
      "@type": "Question",
      "name": "Should we pay for wedding ourselves?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Self-funded wedding considerations: Pay yourself when: Want full control over decisions, families can&apos;t contribute, prefer not to have strings attached, can afford within budget. Family contribution: Traditional but not mandatory, often comes with expectations/opinions, may limit budget size, discuss boundaries clearly. Approach: Determine what you can afford, ask families if they want to contribute (don&apos;t assume), clarify if contribution = decision input, consider partial contribution + partial self-funded. Self-funding benefits: No family pressure, decisions align with your vision, financial independence. Downsides: Budget may be smaller, more pressure on couple&apos;s finances. Best: Honest conversation with families early. Know budget before planning. Don&apos;t commit to wedding size you can&apos;t afford."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Wedding Budget Guide - Costs, Categories & Tips',
  description: 'Wedding budget planning, typical costs, saving tips, and hidden expenses.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WeddingBudgetGuide />
    </Suspense>
  );
}