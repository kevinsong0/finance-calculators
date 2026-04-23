import type { Metadata } from 'next';
import { Suspense } from 'react';
import DecisionMakingGuide from '@/components/DecisionMakingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I make better decisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Better decision making process: Define problem: Clear statement, impact understood, urgency assessed, scope defined. Gather information: Relevant data collected, stakeholders consulted, constraints identified, alternatives researched. Generate options: At least 3 alternatives, creative thinking, don&apos;t settle for obvious, check feasibility. Evaluate options: Criteria defined before evaluation, compare against criteria, consider risks, check for biases. Make decision: Clear owner, documented rationale, timeline set, stakeholder communication. Implement: Action plan created, owners assigned, progress tracking. Review: Outcomes measured, lessons learned, adjust if needed. Key principles: Clear decision owner, explicit criteria, multiple options, bias awareness, documented rationale, review mechanism. Better decisions = structured process. Poor decisions = unclear ownership, single option, hidden biases. Process, criteria, options, review."
      }
    },
    {
      "@type": "Question",
      "name": "What is RACI for decision making?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RACI matrix for decisions: R (Responsible): Does the work, gathers information, prepares recommendation. One or multiple people can be Responsible. A (Accountable): Makes final decision, owns outcome, signs off. Only ONE person is Accountable - prevents confusion. C (Consulted): Provides input before decision, expertise consulted, two-way communication. I (Informed): Notified after decision, one-way communication, no input expected. Application: For each decision type, assign RACI roles. Example: Budget decision - Finance prepares (R), VP decides (A), Team consulted (C), Staff informed (I). Benefits: Clear ownership, no confusion, faster decisions, accountability. Common mistake: Multiple A&apos;s = conflict. One A per decision. RACI = role clarity. Unclear roles = delayed decisions, finger-pointing. One accountable, others support."
      }
    },
    {
      "@type": "Question",
      "name": "What are common decision biases?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Decision biases to watch: Confirmation bias: Seeking only information that supports existing belief. Counter: Seek disconfirming evidence, ask &apos;What would prove me wrong?&apos;. Anchoring: Over-relying on first information received. Counter: Consider multiple starting points, ignore initial anchor. Groupthink: Conforming to group opinion, avoiding conflict. Counter: Assign devil&apos;s advocate, seek outside views, anonymous input. Availability bias: Over-weighting recent or memorable examples. Counter: Seek systematic data, not just memorable cases. Overconfidence: Overestimating accuracy of predictions. Counter: Consider base rates, ask &apos;How confident should I be?&apos;. Sunk cost fallacy: Continuing due to past investment, ignoring future value. Counter: Evaluate future value only, ignore past costs. Recency bias: Over-weighting recent events. Counter: Look at full timeframe. Authority bias: Deferring to authority regardless of merit. Counter: Evaluate arguments, not titles. Bias awareness = better decisions. Biases distort analysis. Name them, counter them."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use consensus vs single decider?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Decision approach selection: Single decider appropriate: Urgent decisions, clear expertise exists, low stakes, routine decisions, accountability needed. Speed advantage, clear ownership, no deadlock risk. Consensus appropriate: High-stakes team commitment needed, diverse expertise needed, implementation requires buy-in, learning opportunity. Commitment advantage, diverse input, shared ownership. Hybrid approaches: Consult then decide - gather input, one person decides. Recommend-approve - team prepares, leader approves. Majority vote - democratic, less critical decisions. Consensus risks: Takes longer, deadlock possible, lowest-common-denominator outcomes. Single decider risks: Less input, commitment gaps, bias unchecked. Match approach to decision. High stakes + need commitment = consensus. Urgent + expertise = single decider. Not binary choice - hybrid approaches often best."
      }
    },
    {
      "@type": "Question",
      "name": "How do I run a decision meeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Decision meeting process: Before: Decision clearly defined, options analyzed in advance, criteria agreed, decision-maker present, time limit set, materials shared. During: State decision needed (5 min), Review options with pros/cons (15 min), Discuss criteria and evaluation (10 min), Address concerns/questions (10 min), Make decision (5 min), Document rationale (5 min). After: Communicate decision to stakeholders, document in decision log, assign implementation owners, set review timeline. Facilitator tips: Don&apos;t reopen analysis if done in prep, focus on evaluation and decision, parking lot for tangents, clear decision at end, no &apos;we&apos;ll decide later&apos;. Decision meeting = outcome. Not analysis meeting. Prep work done beforehand. Decide, document, communicate, implement."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Decision Making Guide - Frameworks, Biases & Techniques',
  description: 'Decision frameworks, process steps, bias awareness, and decision techniques.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DecisionMakingGuide />
    </Suspense>
  );
}