import type { Metadata } from 'next';
import { Suspense } from 'react';
import StartupFundingGuide from '@/components/StartupFundingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are startup funding stages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Startup funding stages: Pre-Seed ($10K-100K) - personal savings, friends/family, validate idea. Seed ($100K-1M) - angel investors, early VCs, build product/MVP. Series A ($1M-10M) - VCs for proven business model, scale product/team. Series B ($10M-50M) - expansion capital, market growth. Series C+ ($50M+) - late-stage, major expansion, IPO prep. Progression: prove concept → build product → prove business → scale → dominate. Each stage requires metrics/traction to justify investment. Don't raise too early - traction first."
      }
    },
    {
      "@type": "Question",
      "name": "Should I bootstrap or seek investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bootstrap vs investment: Bootstrap longer if possible - advantages: full control, no dilution, freedom, no investor pressure. Bootstrap until: need capital to scale (not to build), proven business model, clear growth opportunity. Seek investment when: market opportunity requires speed, scale beyond personal means, strategic partnerships/network benefits, willing to trade equity for acceleration. Reality: most startups bootstrap initially, raise when traction + scale need. Investors want proof, not dreams. Raise to accelerate growth, not to survive."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prepare for investor meetings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Investor meeting prep: Pitch deck (10-15 slides: problem, solution, market, product, traction, team, financials, ask). Business plan (strategy, operations, detailed financials). Demo/MVP (show product working). Market research (market size, competition, differentiation). Team backgrounds (relevant experience). Clear ask (amount, use of funds, milestones). Valuation rationale (why this valuation). Practice pitch multiple times (refine, anticipate questions). Research investor (portfolio, focus areas, typical investments). Prepare for tough questions (traction, competition, risks). Preparation = credibility, confidence, better outcome."
      }
    },
    {
      "@type": "Question",
      "name": "What is venture capital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Venture capital (VC): professional investors who fund startups in exchange for equity. Characteristics: Large amounts ($1M+), active involvement (board seats, guidance), expect high returns (10x+), invest in specific sectors/stages, portfolio approach (bet on multiple, expect failures). Pros: significant capital, network/connections, credibility, strategic guidance. Cons: equity dilution, pressure for growth, milestones/deadlines, loss of some control, exit expectations. VCs invest in teams/markets/traction - not just ideas. Research VC focus areas before pitching. Match startup stage to VC investment stage."
      }
    },
    {
      "@type": "Question",
      "name": "What is startup valuation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Startup valuation: value of company before investment. Methods: Comparable startups (similar company valuations). Revenue multiples (revenue x multiplier, for revenue stage). Market size (potential = higher valuation). Team quality (experienced team = premium). Traction metrics (users, growth, engagement). Negotiation between founder and investor. Pre-money: value before investment. Post-money: value after (pre-money + investment). Example: $4M pre-money, $1M investment = $5M post-money, investor gets 20%. Early stage = hard to value (no revenue). Later stage = metrics-based. Higher valuation = less dilution, but harder to justify."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Startup Funding Guide - Stages, Sources & Preparation',
  description: 'Funding stages, sources, preparation checklist, and tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StartupFundingGuide />
    </Suspense>
  );
}