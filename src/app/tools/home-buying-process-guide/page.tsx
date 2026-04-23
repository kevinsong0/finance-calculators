import type { Metadata } from 'next';
import { Suspense } from 'react';
import HomeBuyingProcessGuide from '@/components/HomeBuyingProcessGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the steps to buy a house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Home buying steps: 1. Financial preparation - check credit score (740+ ideal), calculate budget, save down payment (3-20%), reduce debt. 2. Pre-approval - compare mortgage lenders, submit application, get pre-approval letter (shows sellers you&apos;re serious). 3. Home search - define criteria (location, size, budget), work with real estate agent, view properties, compare options. 4. Make offer - determine price, include contingencies (inspection, appraisal, financing), negotiate with seller, sign purchase agreement. 5. Inspection - hire professional inspector, review report, negotiate repairs or price adjustment if issues found. 6. Final mortgage approval - submit full application, provide documentation, underwriting review, clear conditions. 7. Closing - review documents, transfer funds, sign paperwork, receive keys. 8. Move-in - setup utilities, plan move, settle into home. Timeline: 4-9 months total. 30-45 days from offer to closing. Preparation = smoother process. Start early, prepare financially, protect with contingencies."
      }
    },
    {
      "@type": "Question",
      "name": "How much money do I need to buy a house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Money needed to buy house: Down payment: 3% minimum (FHA, some conventional), 10% common (middle ground), 20% ideal (avoids PMI, better rates). Example: $300,000 house - 3% = $9,000, 10% = $30,000, 20% = $60,000. Closing costs: 2-5% of purchase price typically. $300,000 house - $6,000-15,000. Includes: loan origination, appraisal, title insurance, recording fees, attorney fees. Additional costs: Home inspection - $300-500, appraisal - $300-500 (often in closing costs), moving expenses - $1,000-5,000, immediate repairs/setup - varies, first mortgage payment reserve - 1 month. Total upfront: Price x (down payment % + 5% closing) + $2,000-10,000 extras. Example: $300K house, 10% down = $30K + $15K closing + $5K move = ~$50K needed. Emergency fund: Keep savings for repairs after purchase. Money = down payment + closing + extras. Save more than minimum. Have buffer for unexpected."
      }
    },
    {
      "@type": "Question",
      "name": "What credit score do I need to buy a house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit score requirements: Minimum scores: FHA loans - 500 minimum (580+ for 3.5% down), VA loans - no official minimum, lenders often require 580-620, USDA loans - 640 typical, Conventional loans - 620 minimum typically, 640+ for better options. Best rates: 740+ score - best mortgage rates, lowest costs, most options, 700-739 - good rates, competitive terms, 680-699 - acceptable rates, slightly higher costs, 620-679 - limited options, higher rates, PMI required. Score impact: 620 vs 740 = 0.5-1% higher rate, thousands more over loan life. Improving score: Pay bills on time, reduce credit card balances, don&apos;t open new credit, dispute errors, wait for improvements before applying. Check score early: Know your score 6+ months before buying, time to improve if needed, affects rate significantly. 620 = minimum, 740+ = ideal. Check early, improve if needed, score affects rate and approval."
      }
    },
    {
      "@type": "Question",
      "name": "What should I look for during home inspection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Home inspection focus areas: Major systems: Foundation - cracks, settling, water damage signs. Roof - age, condition, leaks, needed repairs. Electrical - safety, capacity, outdated wiring. Plumbing - leaks, water pressure, pipe condition. HVAC - heating/cooling function, age, efficiency. Structure: Walls, floors, ceilings - cracks, water damage, settling. Windows/doors - seals, function, condition. Attic - insulation, ventilation, leaks. Basement/crawlspace - moisture, foundation, access. Exterior: Siding, paint, condition. Drainage - water flow away from house. Deck/patio - safety, condition. Safety issues: Mold, asbestos, lead paint (older homes), radon, electrical hazards. Inspector provides report: Detailed written report with photos, identifies issues, suggests repairs, estimates costs. Your actions: Attend inspection if possible, ask questions, review report thoroughly, negotiate repairs or price reduction, decide if issues acceptable, may request specialist inspections (roof, foundation). Inspection = protect yourself. Never skip inspection. Major issues = negotiation or walk away."
      }
    },
    {
      "@type": "Question",
      "name": "What contingencies should I include in my offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Important contingencies: Inspection contingency: Right to inspect, negotiate repairs based on findings, can cancel if major issues, usually 7-10 day timeframe. Must-have for buyer protection. Appraisal contingency: If appraisal below offer price, renegotiate or cancel, protects against overpaying, lender requires appraisal anyway. Financing contingency: If loan denied, can cancel without penalty, protects if financing fails, specifies loan terms you&apos;re seeking, usually 30-45 day timeframe. Title contingency: Clear title required, title search reveals issues, title insurance protects, cancels if title problems. Sale of current home: If selling existing home first, depends on that sale closing, common for buyers who need proceeds. Other contingencies: Survey (property boundaries), radon test, mold inspection, specific systems inspection. Removing contingencies: Don&apos;t waive unless certain, can be negotiating tactic, removing early risks deposit, contingencies expire automatically if not resolved. Contingencies = buyer protection. Waiving = risky. Standard contingencies protect without hurting offer strength."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Home Buying Process Guide - Steps, Costs & Checklist',
  description: 'Buying steps, costs breakdown, timeline, and preparation checklist.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeBuyingProcessGuide />
    </Suspense>
  );
}