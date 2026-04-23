import type { Metadata } from 'next';
import { Suspense } from 'react';
import NegotiationSkillsGuide from '@/components/NegotiationSkillsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is BATNA in negotiation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BATNA (Best Alternative to Negotiated Agreement): your backup plan if negotiation fails. Know your BATNA before negotiating - gives you confidence and limits. Example: job negotiation, BATNA = current job, other offers, unemployment. Better BATNA = stronger position. If offer worse than BATNA, walk away. Keep BATNA private (don't reveal alternatives). Improve BATNA before negotiation (create more options). BATNA = negotiation power. Never accept worse deal than your alternative."
      }
    },
    {
      "@type": "Question",
      "name": "How do I negotiate salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Salary negotiation: Research market rate (Glassdoor, industry data, similar roles). Wait for offer (don't reveal expectations first). Counter with specific number (not range - range anchors low). Negotiate total package (salary + bonus + benefits + equity + flexibility). Justify with data (market rate, experience, unique value). Stay professional (don't threaten, get emotional). Get in writing (verbal offers unreliable). Practice conversation (prepare responses). Aim for win-win (company wants you too). First offer usually has room - 10-20% negotiation typical."
      }
    },
    {
      "@type": "Question",
      "name": "What are negotiation phases?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Negotiation phases: 1. Preparation (research other party, define goals, know BATNA, prepare arguments). 2. Opening (set tone, build rapport, state position, listen to theirs). 3. Exploration (understand interests not positions, find common ground, ask questions, share information strategically). 4. Bargaining (exchange offers, make concessions, trade issues, find creative solutions). 5. Closing (agree terms, document agreement, confirm commitment, set follow-up). Most important: preparation. 80% of outcome determined before meeting. Rush preparation = weak negotiation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle a negotiation standoff?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Negotiation standoff solutions: Pause (take break, reduce tension). Reframe (change perspective, find new angle). Find interests (ask why they want X, find underlying need). Trade issues (give something they value for what you need). Add options (introduce new variables, expand negotiation). Use time (set deadline, or let urgency work). Involve third party (mediator, boss). Walk away (if offer worse than BATNA). Improve BATNA (create alternatives, return stronger). Most standoffs resolve by finding interests behind positions. Ask: 'Help me understand why this is important to you.'"
      }
    },
    {
      "@type": "Question",
      "name": "What is anchoring in negotiation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anchoring: first number mentioned frames the negotiation range. Psychology: people anchor on first number, adjust from there. Strategy: anchor first with your ideal number (if appropriate). Anchors work: first offer influences final agreement significantly. Example: want $100k, anchor at $115k, negotiate to $105k. Counter anchors: if they anchor first, don't react immediately, counter with your anchor, question their number. Anchoring powerful - research shows even arbitrary numbers influence outcomes. Anchor high (or low if selling), but not absurdly - credibility matters."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Negotiation Skills Guide - Phases, Tactics & Salary Tips',
  description: 'Negotiation phases, tactics, common mistakes, and salary negotiation tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NegotiationSkillsGuide />
    </Suspense>
  );
}