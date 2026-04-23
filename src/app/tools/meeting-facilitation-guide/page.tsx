import type { Metadata } from 'next';
import { Suspense } from 'react';
import MeetingFacilitationGuide from '@/components/MeetingFacilitationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I facilitate an effective meeting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meeting facilitation process: Before meeting: Define clear purpose, create agenda with time allocations, invite only necessary attendees, share prep materials in advance, set expected outcome. During meeting: Start on time, review agenda with group, assign timekeeper if needed, keep discussion focused, use parking lot for tangents, ensure equal participation, summarize key points, capture action items with owners and dates. After meeting: Send summary within 24 hours, list action items clearly, schedule follow-ups if needed, cancel unnecessary recurring meetings. Facilitator role: Guide not dominate, neutral on content, focus on process, time management, participation balance, decision clarity. Facilitation = meeting effectiveness. Poor facilitation = wasted time. Prepare, guide, document, follow up."
      }
    },
    {
      "@type": "Question",
      "name": "What are different types of meetings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meeting types and purposes: Decision Meeting: Purpose - reach specific outcome. Prep - options analyzed, criteria defined, decision-maker present. Duration - 30-60 min. Status Meeting: Purpose - share updates. Prep - brief updates prepared, no discussion needed. Duration - 15-30 min. Brainstorming: Purpose - generate ideas. Prep - problem defined, no solutions prepared, creative mindset. Duration - 60-90 min. Planning: Purpose - create roadmap. Prep - goals known, constraints defined, resources understood. Duration - 60-120 min. Retrospective: Purpose - learn from past. Prep - data collected, safe space created, facilitator skilled. Duration - 60-90 min. 1:1 Meeting: Purpose - individual connection. Prep - topics prepared, private setting. Duration - 30-60 min. Match type to purpose. Wrong type = wrong outcome. Each type has different prep and facilitation needs."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle tangent discussions in meetings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Managing tangents: Parking lot technique: Acknowledge tangent is important, write it on parking lot list, promise follow-up later, return to agenda topic. Redirect phrases: &apos;That&apos;s important - let&apos;s park it and address after&apos;, &apos;Interesting point but let&apos;s stay on agenda&apos;, &apos;We have 5 min left on this topic&apos;, &apos;Can we schedule separate meeting for that?&apos;. When to allow tangent: Topic affects current decision, quick clarification helps, safety/urgency issue. When to cut tangent: Purely separate topic, extended discussion, few people interested, time pressure on agenda. Follow-up obligation: Review parking lot at end or schedule separate discussion, don&apos;t ignore parked items, owner assigned for each. Tangents = meeting derailment. Parking lot = focus tool. Acknowledge, park, return to agenda, follow up later."
      }
    },
    {
      "@type": "Question",
      "name": "How do I ensure equal participation in meetings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Equal participation techniques: Before: Invite right people only (no observers), share agenda so introverts can prepare, clarify expectations for input. During: Direct questions to quiet participants (&apos;Sarah, what&apos;s your view?&apos;), round-robin input collection, small group discussions then share, written input before verbal, pause after questions (give thinking time). Managing dominators: Thank and redirect (&apos;Thanks John, let&apos;s hear from others&apos;), private feedback after meeting, assign specific role (timekeeper, scribe) to redirect energy, use structure that limits individual time. Reading the room: Watch for disengaged participants, ask for concerns explicitly, check if people need clarification, observe non-verbal cues. Participation = better decisions. Dominators = missed perspectives. Structure, direct questions, round-robin ensure balance."
      }
    },
    {
      "@type": "Question",
      "name": "How long should meetings be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meeting duration guidelines: Decision meetings: 30-60 minutes - longer risks fatigue, shorter risks rushed decision. Status meetings: 15-30 minutes - updates only, no discussion. Brainstorming: 60-90 minutes - creative energy has limits, breaks needed. Planning: 60-120 minutes - complex roadmap needs time, break after 60 min. Retrospective: 60-90 minutes - reflection needs depth but not exhaustion. 1:1 meetings: 30-60 minutes - relationship depth, not rushed. Principles: Default shorter not longer, break every 60 minutes, end on time (or early), cut meeting if purpose achieved. Research: Attention drops after 30-45 min, fatigue increases, decisions worsen. Shorter meetings = better outcomes. Timebox rigorously. Start on time, end on time."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Meeting Facilitation Guide - Types, Tips & Timeboxing',
  description: 'Meeting types, facilitation techniques, timeboxing rules, and participation tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MeetingFacilitationGuide />
    </Suspense>
  );
}