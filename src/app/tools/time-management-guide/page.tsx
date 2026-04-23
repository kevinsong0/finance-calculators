import type { Metadata } from 'next';
import { Suspense } from 'react';
import TimeManagementGuide from '@/components/TimeManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Pomodoro technique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pomodoro technique: work in focused 25-minute intervals called Pomodoros, followed by 5-minute breaks. After 4 Pomodoros (100 min work), take a longer 15-30 minute break. Benefits: maintains focus, prevents burnout, tracks progress, reduces procrastination. How to use: choose task, set timer 25 min, work until timer, take 5 min break, repeat. Tools: Pomodoro Timer, Focus apps. Customize timing (some prefer 50/10). Pomodoro = structured focus + recovery rhythm."
      }
    },
    {
      "@type": "Question",
      "name": "What is time blocking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Time blocking: scheduling specific tasks into dedicated time slots in calendar. Each block has one specific task or type of work. Benefits: prevents multitasking, creates structure, ensures important tasks get time, visualizes workload. Types: Task blocks (specific work), Theme blocks (category like 'admin', 'meetings'), Buffer blocks (flexibility for unexpected). Tips: block deep work first, group similar tasks, leave buffer time, protect blocks from interruptions. Review and adjust weekly. Time blocking = intentional calendar, not reactive."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Eisenhower matrix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eisenhower matrix (priority matrix): categorize tasks by urgency and importance into 4 quadrants. Do First (Urgent + Important) - deadlines, crises, must do now. Schedule (Important + Not Urgent) - planning, learning, health - most value long-term. Delegate (Urgent + Not Important) - interruptions, some emails - can others handle? Eliminate (Not Urgent + Not Important) - busywork, distraction - stop doing. Key insight: most people spend too much on urgent-not-important, neglect important-not-urgent. Schedule quadrant = growth, prevention, strategy."
      }
    },
    {
      "@type": "Question",
      "name": "How do I stop procrastinating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stop procrastination: Break task into smallest possible step (start tiny). Use 2-minute rule (if task under 2 min, do now). Set artificial deadlines (Parkinson's Law). Remove friction (prepare materials ahead). Start with easiest part (build momentum). Use Pomodoro (commit to just 25 min). Identify root cause (fear, perfectionism, unclear goals). Visualize completion. Reward progress. Tell someone (social accountability). Most effective: just start - momentum overcomes resistance. Action creates motivation, not vice versa."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage time with multiple projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiple projects time management: Prioritize ruthlessly (Eisenhower matrix). Block specific days/times for each project (theme days). Track all tasks in one system (not scattered). Set realistic deadlines (overcommitting = failure). Communicate availability (team knows your schedule). Review weekly (adjust priorities). Single-task (don't multitask across projects). Use project management tools (Asana, Notion). Define project boundaries (avoid scope creep). Focus on highest-impact project first each day. Key: visibility of all commitments + realistic scheduling."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Time Management Guide - Methods, Prioritization & Tips',
  description: 'Time management methods, Eisenhower matrix, tips, and solutions.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TimeManagementGuide />
    </Suspense>
  );
}