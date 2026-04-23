import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContractNegotiationGuide from '@/components/ContractNegotiationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is BATNA in negotiation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BATNA (Best Alternative To Negotiated Agreement): Your backup plan if negotiation fails. Importance: Sets your walk-away point, determines negotiation power, prevents accepting bad deals. How to determine: Identify alternatives if no agreement, evaluate each alternative&apos;s value, select best alternative, know when to walk away. Example: Salary negotiation - BATNA = current job, other offer, unemployment. Use BATNA: Don&apos;t accept worse than BATNA, improve BATNA before negotiation (get other offers), keep BATNA private (don&apos;t reveal), negotiate knowing you have options. Strong BATNA = negotiation power. Weak BATNA = vulnerable position. Know your BATNA before negotiating. Improve it if possible. Don&apos;t accept below it."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prepare for a contract negotiation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Negotiation preparation: Research: Counterparty (company, person, needs), market conditions, precedent deals, typical terms. Your side: Objectives (what you want), limits (what you won&apos;t accept), BATNA (backup plan), priorities (must-haves vs nice-to-haves). Strategy: Opening offer (anchor point), trade-offs (what you can give/get), questions to ask, team roles. Documentation: Draft terms, comparison tables, questions list, previous agreements. Timeline: Deadlines, sequence of negotiations, decision-making process. Preparation = negotiation success foundation. Underprepare = vulnerable. Overprepare = confident. Research both sides. Know priorities. Plan strategy. The more you prepare, the better you negotiate."
      }
    },
    {
      "@type": "Question",
      "name": "What is anchoring in negotiation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anchoring: First offer sets reference point for negotiation. Psychology: People adjust from anchor, not reset, first number influences entire negotiation. Strategy: Set anchor favorably (high if selling, low if buying), reasonable but aggressive, don&apos;t reveal too much. Example: Salary negotiation - anchor high (market rate + 10%), employer anchors low, middle ground influenced by both anchors. Counter-anchor: If their anchor first, don&apos;t accept, reset with your anchor, question their anchor&apos;s basis. Tips: Anchor first if possible, anchor with justification (data), counter unreasonable anchors, don&apos;t anchor outside reasonable range (loses credibility). Anchoring = negotiation framing. First offer matters. Set it strategically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle unfair contract terms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Handle unfair terms: Identify: Understand what&apos;s unfair, why it&apos;s unfair, impact on your position, compare to standard terms. Question: Ask why term exists, what purpose, is it negotiable. Counter-propose: Offer alternative terms, explain why alternative fair, show standard practice. Negotiate: Trade - accept if get something else, modify language, add protections, limit scope. Refuse: If truly unacceptable, say no, explain why, walk away if necessary. Tactics: Check industry standards, get legal review, find precedent agreements, show comparative deals. Red flags: Unilateral termination, unlimited liability, hidden fees, automatic renewals, vague terms. Unfair terms = red flags. Don&apos;t accept blindly. Question, counter-propose, negotiate. Protect your position. Get legal review if significant contract."
      }
    },
    {
      "@type": "Question",
      "name": "Should I accept the first offer in negotiation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "First offer decision: Generally no - first offer usually not best deal, room to negotiate exists, accepting immediately signals desperation or naivety. When to accept: First offer exceeds your target (better than expected), time pressure (no time to negotiate), relationship more important than deal terms, offer clearly fair/at market, no room to negotiate (fixed terms). When to negotiate: Offer below expectations, room for improvement likely, terms matter for relationship, precedent for future deals, want to signal competence. Approach: Thank for offer, ask for time to consider, counter-offer with justification, negotiate toward better terms. First offer = starting point, not destination. Counter-offer shows engagement. Negotiate unless clearly best deal. Balance relationship vs terms."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Contract Negotiation Guide - Phases, Tactics & Principles',
  description: 'Contract negotiation phases, BATNA, anchoring, and preparation strategies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContractNegotiationGuide />
    </Suspense>
  );
}