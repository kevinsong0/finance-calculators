import type { Metadata } from 'next';
import { Suspense } from 'react';
import InterviewPreparationGuide from '@/components/InterviewPreparationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I prepare for a job interview?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interview preparation steps: 1. Update resume - tailor to job, highlight relevant experience, quantify achievements. 2. Research company - website, LinkedIn, Glassdoor, recent news, products, culture. 3. Practice questions - behavioral (STAR method), technical (coding, domain), situational. 4. Prepare questions to ask - about role, team, challenges, growth. 5. Mock interview - practice with friend/AI, record, review. 6. Logistics - outfit, arrival time, bring resume copies. 7. Follow-up plan - thank you note template. Preparation time: 2-5 hours minimum, more for technical roles."
      }
    },
    {
      "@type": "Question",
      "name": "What is the STAR method for interviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "STAR method: structured way to answer behavioral questions. S - Situation: set the scene, provide context (what, when, where). T - Task: your responsibility, challenge faced, goal to achieve. A - Action: what YOU specifically did, steps taken, skills used (focus on your contribution). R - Result: outcome achieved, impact, lessons learned, quantify if possible. Example: 'Tell me about solving a difficult problem.' Use STAR for all behavioral questions. Prepare 5-10 STAR stories covering leadership, conflict, challenge, failure, success."
      }
    },
    {
      "@type": "Question",
      "name": "What questions should I ask in an interview?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Questions to ask interviewer: About role (day-to-day responsibilities, biggest challenges, success metrics, first 90 days expectations). About team (team size, structure, collaboration style, biggest project). About company (growth plans, recent changes, culture, values in practice). About interviewer (their background, favorite part of job, biggest challenge). Career growth (advancement path, learning opportunities, mentorship). Avoid: salary (unless they ask), benefits (save for later), Googleable info. Ask 2-4 questions, show genuine interest, reference earlier discussion."
      }
    },
    {
      "@type": "Question",
      "name": "How do I answer behavioral interview questions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer behavioral questions: Use STAR method. Listen carefully - identify what trait they're assessing (leadership, problem-solving, teamwork). Choose relevant story from experience. Be specific - 'In my previous role at Company X...' Focus on YOUR actions - not 'we did' but 'I did'. Include result - what happened, impact, lessons. Don't: ramble, blame others, give hypothetical answers, skip the result. Common behavioral questions: 'Tell me about a challenge you overcame', 'Leadership example', 'How you handled conflict', 'Time you failed', 'Most proud accomplishment'. Prepare stories beforehand."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle technical interview questions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technical interview approach: Coding problems - clarify requirements, think aloud, start with brute force, optimize, explain trade-offs, test edge cases. System design - clarify scope, define requirements, sketch architecture, discuss components, consider scale, explain decisions. Domain knowledge - demonstrate depth, explain concepts clearly, relate to experience. Tips: don't panic if stuck, ask clarifying questions, communicate thought process, show problem-solving approach, admit if you don't know (better than fake), ask for hints if needed. Practice beforehand (LeetCode, mock interviews)."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Interview Preparation Guide - Phases, STAR Method & Tips',
  description: 'Interview phases, question types, STAR method, and preparation tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InterviewPreparationGuide />
    </Suspense>
  );
}