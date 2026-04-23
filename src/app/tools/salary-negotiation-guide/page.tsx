import type { Metadata } from 'next';
import { Suspense } from 'react';
import SalaryNegotiationGuide from '@/components/SalaryNegotiationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I negotiate a higher salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Salary negotiation approach: Research: Market salary range for role (Glassdoor, PayScale, LinkedIn Salary), your company&apos;s pay ranges if known, industry benchmarks for your level. Preparation: Document specific achievements, quantify value delivered, prepare comparison to market, set specific target number. Negotiation: Lead with market data (&apos;Based on market research...&apos;), highlight specific achievements, request specific number (not range), explain why the number is justified, keep professional and positive tone. Response to resistance: Acknowledge constraints, offer alternatives (bonus, equity, benefits), ask what&apos;s possible, maintain collaborative approach. Best timing: New job offer (highest leverage), after major success, performance review time, promotion opportunity. Key principle: Negotiate based on value and market data, not personal needs. Employers pay for value. Market data + achievements + specific request = strong negotiation."
      }
    },
    {
      "@type": "Question",
      "name": "When is the best time to negotiate salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best salary negotiation timing: Highest leverage: New job offer - you have competing leverage, company invested in finding you, easiest time to negotiate, can walk away if too low. Strong timing: After major achievement - value recently demonstrated, hard to deny impact, results documented, momentum high. During promotion - role change justifies increase, new level market rate, natural salary review moment. Good timing: Annual review - budget often allocated, performance discussed, regular increase window. Company growth periods - more budget available, good results context. After completing major project - value proven, success leverage. Avoid: Company layoffs/difficult times, poor performance period, arbitrary timing without justification. Timing matters. Right moment = success probability. Leverage matters more than perfect preparation. New offer highest leverage, achievements good leverage, company health affects budget."
      }
    },
    {
      "@type": "Question",
      "name": "How do I negotiate salary for a new job offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "New job salary negotiation: Before negotiation: Research market range thoroughly, set your target number, know your minimum acceptable, prepare value points from your background, consider total package not just salary. After receiving offer: Thank them for offer, express enthusiasm for role, ask for time to consider (24-48 hours), review all offer components. Counteroffer: Lead with enthusiasm first, present market data for role, highlight your specific value, propose specific number (10-20% above offer typical), explain justification clearly, stay professional and collaborative. If they resist: Ask what&apos;s possible, consider alternatives (signing bonus, earlier review, equity, better title), negotiate other elements if salary capped, ask for written review timeline. Accepting: Get final offer in writing, confirm all terms, clarify review timing. Never accept first offer without negotiation. Most companies expect negotiation. Research + specific counteroffer + total package focus."
      }
    },
    {
      "@type": "Question",
      "name": "What should I consider besides salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Total compensation elements: Base salary - core compensation, negotiation focus. Bonus - annual performance bonus, signing bonus, ask about typical payout. Equity/stock - RSUs, stock options, vesting timeline, value estimation. 401(k) match - employer contribution percentage, immediate vesting or not. Healthcare - premium costs, coverage quality, compare to current. Paid time off - vacation days, sick days, flexibility. Work arrangements - remote options, flexible hours, office location. Career growth - advancement opportunities, skill development, mentorship. Professional development - training budget, conference attendance, certifications. Other perks - commuting benefits, meals, equipment, other allowances. Valuing package: Calculate annual value of each element. Compare total package not just salary. Negotiate elements that matter to you. Example: $10,000 salary difference vs $5,000 better healthcare costs vs 401(k) match improvement. Total package = real compensation. Salary is headline but not whole story. Negotiate what matters most to you."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I ask for in salary negotiation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Salary request amount: Research-based approach: Find market range for role (low, mid, high), identify your position in range (experience, skills, value), target appropriate percentile. Requesting strategy: New job offer - 10-20% above initial offer typical, justify with market data and value, may counteroffer multiple times. Current job negotiation - market rate adjustment, highlight gap vs market, specific increase request. Example: Offer $80,000, market mid $90,000, counter at $95,000 with justification, settle around $90,000. Range handling: When asked for your range, provide top of market range for your level, anchor high, explain you&apos;re flexible based on total package. Don&apos;t undercut yourself: Research anchors you appropriately, don&apos;t ask below market, confidence in request matters. Request = market data + your value level. Undershooting = lost income. Overshooting = unrealistic appearance. Market anchor + justified request + flexibility on total package."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Salary Negotiation Guide - Timing, Preparation & Strategies',
  description: 'Negotiation timing, preparation steps, total package elements, and tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SalaryNegotiationGuide />
    </Suspense>
  );
}