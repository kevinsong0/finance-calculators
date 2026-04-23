import type { Metadata } from 'next';
import { Suspense } from 'react';
import EstatePlanningGuide from '@/components/EstatePlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is estate planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Estate planning: Preparing for management and distribution of assets during life and after death. Components: Will (asset distribution directives), Trusts (control, tax benefits, avoid probate), Powers of attorney (financial/medical decision-makers), Healthcare directives (end-of-life wishes), Beneficiary designations (account inheritance). Goals: Assets distributed as intended, minimize taxes, avoid probate, protect family, ensure wishes followed, reduce family conflict. When needed: Everyone - not just wealthy. Basic documents essential. Start when: Have assets, have children, reach adulthood, before incapacity. Estate planning = peace of mind. Document wishes. Avoid court involvement. Protect family."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a will and a trust?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Will vs trust: Will: Document directing asset distribution after death, requires probate (court process), public record, simpler, less expensive initially, effective only at death. Trust: Legal entity holding assets, avoids probate, private, more control over distribution, can be effective during life, more complex, higher initial cost, ongoing management. Use will when: Simpler estate, no probate concerns, budget limited, straightforward distribution wishes. Use trust when: Avoid probate, privacy matters, complex distribution wishes, tax benefits, business interests, want control during incapacity, large estate. Many have both: Will for remaining items, trust for major assets. Trust = more control + complexity + cost. Will = simpler + probate. Choose based on needs and budget."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I die without a will?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dying without will (intestate): State laws determine distribution, not your wishes. Process: Probate court appoints administrator, state intestacy laws dictate heirs, typically spouse + children, no spouse = parents/siblings, assets divided by formula, longer process, potentially more costs. Problems: Not your intended distribution, family conflict possible, unmarried partner may get nothing, stepchildren may be excluded, court involvement required, delays in distribution, public process. Solution: Create basic will - simple, inexpensive, documents wishes. Intestate = state decides. Not you. Even simple will better than nothing. Take basic step now."
      }
    },
    {
      "@type": "Question",
      "name": "When should I update my estate plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Update estate plan: Major life events: Marriage, divorce, remarriage, birth/adoption of children, death of beneficiary, major asset changes (inheritance, business), moving to different state, significant wealth change. Regular review: Every 3-5 years minimum, laws change, circumstances change, beneficiary designations age. Specific triggers: New child = add guardian provisions, divorce = remove ex-spouse from documents, remarriage = update all documents, moving = check state law differences, large inheritance = review distribution/tax. Common missed updates: Beneficiary designations on retirement accounts, insurance policies - override will, check these separately. Estate plan = living document. Update as life changes. Don&apos;t let old documents govern current situation."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need an attorney for estate planning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Attorney for estate planning: Recommended when: Complex assets (businesses, investments), trusts needed, large estate (tax implications), family complexity (multiple marriages, special needs), out-of-state assets, want certainty documents valid. Basic will: Online templates work for simple situations, but risk of errors, state-specific requirements matter, attorney review adds certainty. Benefits of attorney: State law compliance, proper execution, advice on strategy, address complexities, ongoing relationship. Cost: Basic will $200-500, Trust $1,000-3,000+, varies by complexity. Consider: Complex = attorney essential. Simple = online option possible but attorney adds security. Risk of DIY errors = documents invalid. Estate planning = important documents. Cost of attorney vs risk of invalid documents. Balance budget with needs."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Estate Planning Guide - Components, Documents & Tips',
  description: 'Estate planning basics, will vs trust, essential documents, and planning tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EstatePlanningGuide />
    </Suspense>
  );
}