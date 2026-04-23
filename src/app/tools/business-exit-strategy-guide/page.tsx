import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessExitStrategyGuide from '@/components/BusinessExitStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What exit options exist for businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exit options include: Sale to third party (find buyer, negotiate, cash liquidity benefit), Management buyout (internal transfer, legacy preservation benefit), IPO (public offering, maximum value benefit), and Liquidation (asset sale, clean closure benefit)."
      }
    },
    {
      "@type": "Question",
      "name": "What phases does exit planning include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exit phases include: assess exit readiness, determine exit objectives, evaluate exit options, prepare business for exit, engage advisors, structure exit transaction, negotiate terms, complete documentation, execute transaction, and post-exit transition."
      }
    },
    {
      "@type": "Question",
      "name": "What preparations enhance exit value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exit preparations include: Financial cleanup (clean records, credibility value), Operational optimization (efficiency focus, value enhancement), Legal compliance (risk mitigation, deal readiness value), and Management continuity (succession planning, stability value)."
      }
    },
    {
      "@type": "Question",
      "name": "What factors influence exit strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key factors include: business value, market conditions, buyer availability, timing constraints, tax implications, legal requirements, management preferences, family considerations, employee impact, and customer continuity."
      }
    },
    {
      "@type": "Question",
      "name": "Why is exit strategy planning important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exit strategy enables planned transition, maximizes value, ensures continuity, reduces disruption, and achieves objectives. Strategic exit planning transforms uncertain endings into successful transitions."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Exit Strategy Guide - Options, Phases & Preparations',
  description: 'Exit options, planning phases, value preparations, and influencing factors.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessExitStrategyGuide />
    </Suspense>
  );
}
