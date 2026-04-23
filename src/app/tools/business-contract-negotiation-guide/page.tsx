import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessContractNegotiationGuide from '@/components/BusinessContractNegotiationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the phases of contract negotiation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contract negotiation phases include: Preparation (research, objectives, team setup), Opening (initial offer, terms review), Negotiation (counter offers, concessions), and Closing (final terms, signatures). Each phase builds toward a successful agreement."
      }
    },
    {
      "@type": "Question",
      "name": "What negotiation tactics are effective?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective negotiation tactics include: anchor high pricing, bundle multiple terms, use time pressure, offer alternatives, create walkaway options, highlight mutual benefits, address objections, and propose creative solutions. These tactics help achieve favorable contract terms."
      }
    },
    {
      "@type": "Question",
      "name": "What are critical contract elements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Critical contract elements include: Price terms (payment amounts, schedule), Scope definition (deliverables, boundaries), Timeline (deadlines, milestones), and Risk allocation (liabilities, warranties). These elements define the agreement's core terms."
      }
    },
    {
      "@type": "Question",
      "name": "What outcomes should contract negotiation achieve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Desired outcomes include: win-win agreement, cost savings achieved, risk mitigation secured, relationship strengthened, clear deliverables defined, compliance ensured, dispute resolution set, and renewal terms agreed."
      }
    },
    {
      "@type": "Question",
      "name": "Why is contract negotiation important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contract negotiation secures favorable terms, reduces costs, mitigates risks, and builds stronger business relationships. Skilled negotiation transforms contracts from legal documents into strategic assets."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Contract Negotiation Guide - Phases, Tactics & Elements',
  description: 'Negotiation phases, tactics, contract elements, and desired outcomes for effective agreements.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessContractNegotiationGuide />
    </Suspense>
  );
}