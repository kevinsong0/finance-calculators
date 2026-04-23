import type { Metadata } from 'next';
import { Suspense } from 'react';
import CarBuyingGuide from '@/components/CarBuyingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Should I buy new or used car?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "New vs used car: New car benefits: Full warranty, latest safety/tech features, no prior damage/history, predictable costs initially, financing incentives. New car downsides: Higher price, rapid depreciation (20% first year), insurance higher. Used car benefits: Lower price, less depreciation (already taken), more models within budget, lower insurance. Used car downsides: Limited/no warranty, unknown history, potential repairs, older tech. Best financial choice: Used 2-3 year old car (depreciation already happened, still has reliability). Consider certified pre-owned (inspected + warranty). Decision: New if warranty matters, want latest features, prefer predictability. Used if budget matters, depreciation concerns, accept some risk. Run numbers for your situation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I negotiate car price?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Negotiate car price: Research: Know fair market value (Edmunds, KBB, true market value), invoice price for new cars, comparable listings for used. Set target price before negotiations. Approach: Don&apos;t show attachment to car, negotiate from invoice price (new), not MSRP, offer below target, let them counter. Negotiate: Start low but reasonable, be willing to walk away, negotiate total price not monthly payment (traps you), get competing quotes from other dealers. Extras: Resist add-ons (extended warranty, packages), negotiate separately if you want them. Timing: End of month/quarter = dealers want numbers, shop when slow. Negotiation = preparation + confidence + willingness to leave. Never pay sticker. Always negotiate."
      }
    },
    {
      "@type": "Question",
      "name": "What should I check when test driving?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Test drive checklist: Engine: Start cold, listen for noises, check acceleration, idle smoothness. Transmission: Shift smooth (auto), clutch feel (manual), no slipping. Brakes: Firm pedal, no noise, smooth stop, no pulling. Steering: No play, tracks straight, smooth turning. Suspension: No bouncing, no noise over bumps, stable. Comfort: Seat adjustment, visibility, controls reachable, climate system, noise level at speed. Features: Radio, windows, locks, lights, all work. Body: Paint condition, dents, scratches (used), tire condition. Drive: City streets, highway speeds, hills, parking maneuver. Take time - don&apos;t rush. Test multiple cars for comparison. Bring checklist, take notes. Test drive = feel the car. Don&apos;t buy without thorough test."
      }
    },
    {
      "@type": "Question",
      "name": "What is dealer financing vs bank loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dealer vs bank financing: Dealer financing: Convenient (at dealership), may have incentives (low rates on new), captive lender (manufacturer), handles paperwork. Check: Compare rate to bank quotes, watch for markups, read all terms, understand total cost. Bank/credit union: Often better rates, pre-approval gives leverage, separate from dealer negotiation, clear terms. Best approach: Get pre-approval from bank/credit union first, compare to dealer&apos;s offer, use whichever is better, negotiate dealer price separately from financing. Watch for: Longer terms = more interest, low rate on higher price vs higher rate on lower price, monthly payment focus hides true cost. Compare total cost, not just rate or payment. Pre-approval = negotiating power."
      }
    },
    {
      "@type": "Question",
      "name": "How do I inspect a used car?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Used car inspection: Professional inspection: Hire mechanic ($100-200), comprehensive check, unbiased assessment, worth cost. Self-check basics: Exterior - paint, dents, scratches, panel gaps, lights, glass. Interior - seats, carpet, dashboard, odors, electronics. Under hood - fluid levels, belts, hoses, battery, leaks visible. Tires - wear pattern, age, matching. Under car - rust, leaks, exhaust. Test drive - noises, shifting, braking, handling. Documents - title, maintenance records, accidents reported. Checklist available online. Don&apos;t skip inspection = avoid expensive problems. Small inspection fee prevents huge repairs. Always inspect used cars, even from dealers."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Car Buying Guide - Steps, Costs & Tips',
  description: 'Car buying process, new vs used comparison, negotiation tips, and costs.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CarBuyingGuide />
    </Suspense>
  );
}