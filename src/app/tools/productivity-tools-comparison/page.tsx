import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductivityToolsComparison from '@/components/ProductivityToolsComparison';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best productivity app?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best productivity app depends on needs: Task management - Todoist (simple, reliable, natural language), Notion (flexible, all-in-one), Things (Apple, beautiful design). Notes - Notion (collaborative), Obsidian (local, markdown, free), Evernote (web clipper). Calendar - Google Calendar (free, integrates), Outlook (Microsoft users). Focus - Forest (gamified), Freedom (block distractions). No single best - depends on: platform (Apple vs cross-platform), needs (simple vs powerful), team vs individual, price preference. Try free versions, commit to one, learn it fully."
      }
    },
    {
      "@type": "Question",
      "name": "Is Notion or Obsidian better?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notion vs Obsidian: Notion - cloud-based, collaborative, all-in-one (docs, tasks, databases), template library, web clipper, mobile app native. Best for: teams, students, those who want everything in one place. Obsidian - local files, markdown, free core, plugin ecosystem, graph view connections, no vendor lock-in. Best for: personal notes, knowledge management, privacy-conscious, technical users. Choose Notion if: collaborate, want simplicity, mobile focus. Choose Obsidian if: local ownership, markdown preference, free forever core, customize with plugins. Both excellent - different philosophies."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use multiple productivity tools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiple tools approach: Recommended - use one per category (one task app, one calendar, one note app). Avoid - using multiple in same category (confusing, scattered data). Integration - connect tools where possible (Zapier, native integrations). Example stack: Todoist (tasks) + Google Calendar (time) + Notion (notes) + Slack (communication). Risk of too many: context switching, incomplete data, learning burden. Simpler stack often better. Start minimal, add only when clear need. Master one tool before adding another. 3-5 tools sufficient for most."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose between free and paid productivity apps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Free vs paid decision: Start free (test features, fit workflow). Upgrade paid when: hitting limits (storage, features), collaboration needed (team features), priority (time savings worth cost), integrations required (premium tier). Typical costs: Todoist Pro $4/month, Notion Personal $8/month, Obsidian free (sync optional $4). Evaluate: hours saved vs cost (if saves 1 hour/month, $8 worth it for many). Free forever options: Obsidian, Google Calendar, basic Todoist, Trello. Don't pay until you're committed to tool - wasted subscription if you abandon."
      }
    },
    {
      "@type": "Question",
      "name": "What productivity features matter most?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key productivity app features: Cross-platform (work everywhere). Sync (seamless between devices). Quick capture (add items fast - shortcuts, mobile widget). Search (find anything quickly). Organization (tags, folders, views). Integrations (connect other tools). Collaboration (share, assign). Offline (work without internet). Notifications (reminders, deadlines). Keyboard shortcuts (speed). Mobile experience (native app, not just web). Prioritize features matching your workflow. Don't pay for features you won't use. Core: capture + organize + find."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Productivity Tools Comparison - Categories, Features & Selection',
  description: 'Tool categories, key features, pros/cons, and selection tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProductivityToolsComparison />
    </Suspense>
  );
}