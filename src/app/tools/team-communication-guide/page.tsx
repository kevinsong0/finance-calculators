import type { Metadata } from 'next';
import { Suspense } from 'react';
import TeamCommunicationGuide from '@/components/TeamCommunicationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I choose the right communication channel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Channel selection guide: Email: Formal communications, documentation needed, external stakeholders, complex information, non-urgent matters. Slack/Chat: Quick questions, informal updates, team coordination, time-sensitive (but not urgent), brief information. Video Call: Complex topics needing discussion, relationship building, remote collaboration, nuanced subjects, problem-solving. In-Person: Sensitive matters, confidential topics, emotional discussions, performance issues, relationship repair. Meeting: Group decisions, brainstorming, planning, complex coordination, multiple stakeholders need input. Document/Wiki: Reference material, long-form content, procedures, training, archival information. Wrong channel = poor outcomes. Urgent via email = delayed. Sensitive via chat = misunderstood. Match channel to message purpose, urgency, sensitivity, and documentation need."
      }
    },
    {
      "@type": "Question",
      "name": "How do I run effective team meetings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective meeting practices: Before: Clear agenda shared in advance, right people invited (not too many), preparation requested, time block appropriate. During: Start on time, follow agenda, facilitator keeps focus, time limits per item, encourage participation, capture action items. After: Send summary within 24h, document decisions, track action items, schedule follow-ups if needed. Meeting types: Decision meetings - clear outcome needed. Status meetings - brief updates only. Brainstorming - open discussion, no immediate decisions. Planning - structured timeline building. Avoid: Meetings without agenda, meetings that could be emails, repeating same meeting type, no action items captured, no follow-up. Meeting = time investment. Poor meetings = wasted time. Clear purpose, agenda, action items."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write clear team messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clear message writing: Subject line: Specific, action-needed if applicable, category indicator. Opening: Main point first (BLUF - bottom line up front), purpose clear. Body: Necessary context only, structured with headers/bullets if long, specific details. Closing: Action requested (who, what, when), deadline if applicable, question clearly stated if response needed. Tone: Professional but not overly formal, direct but respectful, appropriate for audience. Length: Concise - aim for less than 150 words for emails, shorter for chat. Avoid: Buried main point, unnecessary context, vague requests, no deadline, assuming context known, overly long messages. Clear message = quick understanding. Vague message = confusion, delay. Bottom line first, action clear, concise."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve team communication culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Communication culture improvement: Norms: Establish team communication guidelines, channel preferences documented, response time expectations, meeting protocols. Training: Clear writing workshop, active listening skills, feedback techniques, conflict communication. Tools: Shared documentation platform, team chat norms, meeting templates, status update rhythms. Regular rhythms: Daily standups if needed, weekly team sync, monthly retrospectives, quarterly planning. Feedback culture: Regular feedback encouraged, upward feedback normalized, safe to raise concerns, feedback skills taught. Transparency: Information shared proactively, decisions explained, changes communicated early, rationale visible. Measurement: Communication satisfaction surveys, meeting effectiveness reviews, action item completion rates. Culture = foundation. Tools alone don&apos;t fix. Norms, training, regular rhythms build culture."
      }
    },
    {
      "@type": "Question",
      "name": "What communication mistakes should I avoid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Communication mistakes to avoid: Channel mistakes: Urgent matters via email, complex via chat, sensitive via group channel, time-sensitive without marking. Content mistakes: Buried main point, unclear action request, missing deadline, assuming context, overlong messages. Response mistakes: Ignoring messages, delayed responses without acknowledgment, incomplete answers, no follow-up. Meeting mistakes: No agenda, wrong attendees, no time limit, no action items, repeated meetings on same topic, decisions undocumented. Documentation mistakes: Decisions not recorded, assumptions undocumented, changes not shared, no reference for absent team members. Culture mistakes: Hoarding information, feedback not encouraged, concerns dismissed, communication styles not respected. Avoid mistakes = better outcomes. Mistakes = delays, confusion, frustration. Self-awareness, training, norms help avoid."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Team Communication Guide - Channels, Best Practices & Meetings',
  description: 'Communication channels, best practices, meeting tips, and message writing.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TeamCommunicationGuide />
    </Suspense>
  );
}