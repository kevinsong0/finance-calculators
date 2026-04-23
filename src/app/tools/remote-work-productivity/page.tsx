import type { Metadata } from 'next';
import { Suspense } from 'react';
import RemoteWorkProductivity from '@/components/RemoteWorkProductivity';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I stay productive while working remotely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote productivity: set consistent routine (same start/end times), create dedicated workspace, use time blocking (focus blocks, meetings, breaks), take regular breaks (Pomodoro 25min work + 5min break), set daily goals (3 key tasks), over-communicate progress, separate work/personal time. Tools: Slack for communication, Notion for planning, Toggl for tracking. Key: boundaries + routine + communication."
      }
    },
    {
      "@type": "Question",
      "name": "What are common remote work challenges?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote work challenges: distractions (home environment, family, chores) - use headphones, focus blocks, dedicated space. Isolation (lack of social interaction) - virtual coffee chats, team meetings, coworking spaces. Overwork (no clear end time) - set boundaries, track hours, end-day ritual. Communication gaps (async misunderstandings) - over-communicate, video for complex topics. Tech issues (internet, equipment) - backups, test equipment."
      }
    },
    {
      "@type": "Question",
      "name": "What tools do remote workers need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote work tools: Communication (Slack, Zoom, Teams, Discord for team chat/video). Project management (Notion, Trello, Jira, Asana for tasks/projects). Time tracking (Toggl, Clockify, RescueTime for productivity). Focus (Forest, Focusmate, Pomodoro Timer for concentration). Documentation (Google Docs, Confluence, Obsidian for notes). Automation (Calendly for scheduling, Zapier for workflows). Essential: reliable internet, good headphones, ergonomic setup."
      }
    },
    {
      "@type": "Question",
      "name": "How do I avoid burnout when working remotely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avoid remote burnout: set clear boundaries (work hours, workspace), take real breaks (walk, stretch, not screen switching), maintain social connections (virtual coffee, team events), track working hours (don&apos;t overwork), establish end-day ritual (review, plan, log off), separate work/personal devices if possible, take vacation (don&apos;t skip), communicate workload issues early. Signs of burnout: exhaustion, cynicism, reduced productivity - address early."
      }
    },
    {
      "@type": "Question",
      "name": "Should remote workers use asynchronous communication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Async communication: Yes, default to async for most work. Benefits: flexibility (respond when convenient), documentation (written record), thoughtful responses (time to think), global teams (timezone friendly). When to use: updates, questions, documentation, non-urgent decisions. When to sync: complex discussions, brainstorming, urgent decisions, relationship building, onboarding. Rule: async by default, sync when necessary. Tools: Slack threads, Loom videos, written docs."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Remote Work Productivity Guide - Habits, Tools & Tips',
  description: 'Daily habits, remote work tools, challenges, and productivity tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RemoteWorkProductivity />
    </Suspense>
  );
}