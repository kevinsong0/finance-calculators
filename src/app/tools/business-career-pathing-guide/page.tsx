import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCareerPathingGuide from '@/components/BusinessCareerPathingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What career paths exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Career paths include vertical progression for upward promotion and authority growth, horizontal movement for cross-functional skill breadth, expert deepening for specialization expertise, leadership track for management roles, project leadership for project ownership, and entrepreneurial path for new ventures innovation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the career pathing process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The career pathing process involves assessing current skills, identifying career interests, exploring career options, defining career goals, planning career milestones, identifying skill gaps, creating development plan, executing development actions, seeking career opportunities, and reviewing and adjusting path."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect career pathing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Career pathing factors include skills and abilities for current strengths assessment, organization needs for future roles alignment, personal interests for career preferences exploration, and market opportunities for external options research."
      }
    },
    {
      "@type": "Question",
      "name": "What support systems help career pathing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Career pathing support systems include career counseling, mentoring programs, development plans, training opportunities, job rotations, stretch assignments, leadership programs, and career conversations."
      }
    },
    {
      "@type": "Question",
      "name": "Why implement career pathing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Career pathing drives employee growth and retention through assessing skills, identifying interests, exploring options, defining goals, planning milestones, identifying gaps, creating plans, executing actions, seeking opportunities, and reviewing paths."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Career Pathing Guide - Paths, Process & Support',
  description: 'Career paths, pathing process, planning factors, and support systems.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCareerPathingGuide />
    </Suspense>
  );
}