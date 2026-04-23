import type { Metadata } from 'next';
import { Suspense } from 'react';
import CareerPlanningGuide from '@/components/CareerPlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I plan my career?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Career planning steps: 1. Self-assessment - strengths, interests, values, skills. 2. Research - industries, roles, companies, market trends. 3. Set goals - 1 year, 5 year, 10 year vision. 4. Identify gaps - skills needed vs current. 5. Create plan - training, experiences, milestones. 6. Execute - take action, build skills, network. 7. Track progress - document achievements, adjust plan. 8. Reassess annually - goals change, market changes. Key: Career is nonlinear. Adapt as you learn. Multiple paths possible. Not one right answer. Plan = guide, not prescription. Flexibility + intentionality = career success."
      }
    },
    {
      "@type": "Question",
      "name": "Should I specialize or stay general?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Specialize vs Generalize: Specialize: Deep expertise in one area, higher value to specific employers, easier to be expert, harder to pivot. Good for: stable industries, deep technical roles, passion-driven careers. Generalize: Broad skill set, more flexibility, can pivot easier, harder to be top expert. Good for: changing industries, management paths, early career exploration. Consider: Industry stability, personal interests, market demand, long-term goals. Mix: Specialize in one area + general adjacent skills. T-shaped skills = depth in one + breadth across. Early career: explore. Mid-career: develop specialty. Senior: depth + leadership breadth. Not binary - balance both."
      }
    },
    {
      "@type": "Question",
      "name": "How do I advance to management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Transition to management: Prepare: Lead projects without authority, mentor others, understand team dynamics, develop communication skills. Demonstrate: Take on leadership tasks, show initiative, build trust with team, understand business impact. Skills needed: People management (feedback, motivation), delegation, conflict resolution, strategic thinking, budget awareness. Path: Ask for management opportunities, express interest to leadership, seek mentorship from managers, take leadership training. Consider: Management = different skill set. Not automatic promotion. Not everyone suited for it. Alternatives: Staff engineer (IC leadership), hybrid roles. Management = people focus. IC = technical depth. Both valid paths."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I change jobs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Job change frequency: Early career: 1-3 years per job common. Reason: Learn different environments, gain varied experience, salary growth. Mid-career: 2-4 years typical. Reason: Build depth, demonstrate results, establish reputation. Senior: 3-5+ years often. Reason: Strategic impact, leadership continuity. Stay if: Growing, learning, good culture, advancement path, interesting work. Leave if: Stagnant, bad culture, no growth, better opportunity, misaligned values. Average tenure varies by industry. Tech: shorter (2-3 years). Traditional: longer (4-5 years). Not too frequent: job-hopper perception. Not too long: stagnation risk. Balance learning + stability. Each change should advance goals."
      }
    },
    {
      "@type": "Question",
      "name": "How do I negotiate a promotion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Promotion negotiation: Prepare: Document achievements (results, impact), research role requirements, know market compensation, identify business value you&apos;ve added. Build case: Quantify contributions, align to next-level expectations, show readiness, have peer examples. Timing: After major accomplishment, during review cycles, when role opening exists. Conversation: Express interest clearly, present case factually, ask for timeline, get feedback on readiness. If denied: Ask what&apos;s missing, get specific plan, timeline commitment, follow up. Negotiate compensation: Research ranges, anchor high, justify with market data, consider total package (not just salary). Not just ask - demonstrate. Promotion = business case. Compensation = market + value."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Career Planning Guide - Phases, Skills & Decisions',
  description: 'Career development phases, skills, promotion strategies, and planning tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CareerPlanningGuide />
    </Suspense>
  );
}