import type { Metadata } from 'next';
import { Suspense } from 'react';
import AgileMethodologyGuide from '@/components/AgileMethodologyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Agile methodology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Agile methodology: iterative approach to software development emphasizing flexibility, collaboration, and customer feedback. Core principles: Iterative development (small increments), continuous feedback (adapt quickly), cross-functional teams, customer collaboration over contracts, respond to change over follow plan. Benefits: Faster delivery, higher quality, better alignment with needs, reduced risk, improved morale. Agile is mindset + practices. Not rigid process - adapt to context. Choose framework (Scrum/Kanban/XP) based on team size, project type, organizational culture."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Scrum and Kanban?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scrum vs Kanban: Scrum - Fixed sprints (2-4 weeks), defined roles (PO, SM, Dev Team), prescribed ceremonies (planning, standup, review, retro), sprint commitments, velocity tracking. Kanban - Continuous flow, no fixed iterations, WIP limits, visual board, pull system, focus on throughput. Choose Scrum: need structure, fixed deadlines, team learning curve. Choose Kanban: continuous delivery, changing priorities, support teams, mature teams. Both are Agile. Scrum = time-boxed iterations. Kanban = flow-based. Many teams combine (Scrumban)."
      }
    },
    {
      "@type": "Question",
      "name": "What are Scrum ceremonies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scrum ceremonies (events): Sprint Planning (start of sprint) - select backlog items, define sprint goal, estimate effort. Daily Standup (daily, 15 min) - what done yesterday, doing today, blockers. Sprint Review (sprint end) - demo completed work, gather feedback, update backlog. Sprint Retrospective (after review) - discuss process improvements, action items. Backlog Refinement (ongoing) - clarify items, estimate, add details. Purpose: alignment, transparency, continuous improvement. Keep ceremonies focused. Standup = status sync, not problem-solving session."
      }
    },
    {
      "@type": "Question",
      "name": "How do I measure Agile success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Agile success metrics: Velocity (story points per sprint) - track trends, not absolute numbers. Sprint burndown - progress within sprint. Lead time - request to delivery. Cycle time - start work to complete. Throughput - items completed per period. Quality metrics - bugs, defects, rework. Team happiness/morale. Customer satisfaction. Business value delivered. Predictability - commitment vs completion. Don&apos;t use metrics to punish - use to improve. Focus on trends over snapshots. Metrics support conversations, not replace them."
      }
    },
    {
      "@type": "Question",
      "name": "What is a product backlog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Product backlog: prioritized list of work items (features, bugs, tech debt, spikes). Owned by Product Owner. Characteristics: Single source of work, prioritized by value, refined continuously, visible to all, estimated by team. Items: User stories (As a [user], I want [feature], so that [benefit]). Bugs, technical debt, research tasks. Backlog refinement: clarify items, add acceptance criteria, estimate effort, break large items, remove outdated. Healthy backlog = ready items for next 2-3 sprints. Not dumping ground - actively managed."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Agile Methodology Guide - Scrum, Kanban & Best Practices',
  description: 'Agile frameworks, Scrum roles, ceremonies, and implementation tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgileMethodologyGuide />
    </Suspense>
  );
}