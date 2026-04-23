import type { Metadata } from 'next';
import { Suspense } from 'react';
import RemoteTeamManagementGuide from '@/components/RemoteTeamManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I manage a remote team effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote team management: Communication: Async-first approach (document first, call second), clear expectations for response times, designated channels for different topics, over-communicate important decisions. Trust: Focus on outcomes not hours, autonomy in how work gets done, regular but not excessive check-ins, avoid micromanagement. Connection: Regular video check-ins, virtual team events, 1:1 meetings consistently, celebrate wins publicly. Documentation: Write decisions down, accessible knowledge base, meeting notes shared, processes documented. Tools: Choose standard tools, provide training, ensure everyone can use them. Remote = intentional communication + trust + documentation. Not watching people work. Set expectations, then trust."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I check in with remote team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote check-in frequency: 1:1 meetings: Weekly (30-60 min) - consistent, discuss progress, blockers, growth, concerns. Too often = micromanagement, too rare = disconnection. Team meetings: Weekly team sync (30-60 min), quarterly retrospectives, occasional all-hands (monthly/biweekly). Daily: Async updates (Slack thread, status post) optional, not required video calls daily. Impromptu: As needed for urgent issues, respect schedules. Balance: Enough to maintain connection, not so much as to overwhelm. Rules: Weekly 1:1 = minimum, daily video = overkill for most, async updates = supplement. Check-ins = connection, not surveillance. Quality > frequency. Adjust based on team needs."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build trust with remote team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Build remote trust: Demonstrate trust: Give autonomy, don&apos;t micromanage, assume positive intent, focus on outcomes. Communicate transparently: Share context, share decisions, share challenges, be accessible. Follow through: Do what you say, meet commitments, be consistent. Be vulnerable: Share your challenges, admit mistakes, ask for feedback. Show care: Remember personal details, acknowledge life events, support during difficulties, genuine interest. Regular connection: Consistent 1:1s, not just work talk, share non-work updates. Team rituals: Virtual coffee, celebrations, shared activities. Trust = behavior over time. Not one event. Consistent demonstration. Takes time to build, can break quickly. Invest in trust foundation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle time zones in remote teams?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Time zone management: Identify overlap hours: Find common hours where most team available, schedule important meetings then, 2-4 overlap hours often sufficient. Async-first: Default to async communication, documents not calls, respect that not everyone can respond immediately. Rotation: Rotate meeting times if needed (share inconvenience), record meetings for absent members, written summaries for everyone. Clear expectations: Set response time expectations (24h, 48h), indicate urgency levels, distinguish immediate vs eventual needs. Documentation: Everything important written down, accessible to all, no dependency on being online at specific time. Tools: World time tools, calendar with all zones visible. Time zones = coordination challenge, not blocker. Async-first + overlap hours = balance. Don&apos;t force everyone to one zone."
      }
    },
    {
      "@type": "Question",
      "name": "What is async-first communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Async-first communication: Default to asynchronous methods, not synchronous (meetings/calls). How it works: Write first (post, document), allow time for response (hours, not minutes), call/meeting only when truly needed (complex, urgent, relational). Benefits: Time zone friendly, focused work time, documented decisions, fewer interruptions, inclusive (everyone can participate). When to go synchronous: Complex discussion (many angles), urgent issues (need immediate answer), relationship building (connection), conflict resolution (sensitive). Implementation: Set norms (async default, sync exception), documentation culture, clear urgency levels, respect response time expectations. Async-first = efficiency + inclusion. Not elimination of meetings. Reduce meetings, improve those remaining. Default to writing, call when necessary."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Remote Team Management Guide - Challenges & Best Practices',
  description: 'Remote team challenges, communication, trust building, and async-first approach.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RemoteTeamManagementGuide />
    </Suspense>
  );
}