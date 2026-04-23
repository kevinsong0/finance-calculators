import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessTeamDynamicsGuide from '@/components/BusinessTeamDynamicsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the stages of team development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Team development stages include forming with orientation and testing needing structure and clarity, storming with conflict and resistance needing conflict resolution, norming with agreement and cooperation needing norm establishment, performing with high productivity needing challenge and support, and adjourning with task completion needing recognition and closure."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect team dynamics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Team dynamics factors include team composition, communication patterns, leadership style, decision-making process, conflict management, goal alignment, role clarity, and trust levels."
      }
    },
    {
      "@type": "Question",
      "name": "What dysfunctions hinder team performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Team dysfunctions include absence of trust with vulnerability avoidance solved by open dialogue, fear of conflict with artificial harmony solved by constructive debate, lack of commitment with ambiguity acceptance solved by clear decisions, avoidance of accountability with low standards solved by peer pressure, and inattention to results with individual focus solved by team goals."
      }
    },
    {
      "@type": "Question",
      "name": "How do you improve team dynamics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Team dynamics improvements include building trust through openness, encouraging healthy conflict, driving commitment through clarity, establishing accountability systems, focusing on collective results, improving communication flow, clarifying roles and responsibilities, and strengthening goal alignment."
      }
    },
    {
      "@type": "Question",
      "name": "Why focus on team dynamics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Team dynamics provide performance foundation through building trust, encouraging conflict, driving commitment, establishing accountability, focusing on results, improving communication, clarifying roles, and aligning goals."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Team Dynamics Guide - Stages, Factors & Improvements',
  description: 'Team development stages, dynamic factors, dysfunctions, and improvement strategies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessTeamDynamicsGuide />
    </Suspense>
  );
}