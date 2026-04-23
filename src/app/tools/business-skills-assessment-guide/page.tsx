import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessSkillsAssessmentGuide from '@/components/BusinessSkillsAssessmentGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What skill categories are assessed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skill categories include technical skills for job-specific abilities through competency tests, soft skills for interpersonal abilities through behavioral assessment, leadership skills for management capabilities through leadership assessment, and functional skills for domain expertise through knowledge tests."
      }
    },
    {
      "@type": "Question",
      "name": "What methods assess skills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skills assessment methods include self-assessment surveys, manager evaluations, peer feedback, competency testing, performance review, skill inventory, behavioral observation, work samples, 360-degree feedback, and simulation exercises."
      }
    },
    {
      "@type": "Question",
      "name": "What frameworks support skills assessment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skills assessment frameworks include competency model for role requirements with clear standards, skill matrix for team capabilities with gap visibility, skill taxonomy for skill categorization with organization, and proficiency levels for skill measurement with progress tracking."
      }
    },
    {
      "@type": "Question",
      "name": "What outcomes come from skills assessment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skills assessment outcomes include skill gaps identified, training needs defined, development plans created, career paths mapped, hiring criteria clarified, performance benchmarks set, team composition optimized, and promotion readiness assessed."
      }
    },
    {
      "@type": "Question",
      "name": "Why conduct skills assessment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skills assessment provides talent development foundation through defining categories, selecting methods, choosing frameworks, conducting evaluations, analyzing results, identifying gaps, defining needs, creating plans, mapping paths, and tracking progress."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Skills Assessment Guide - Categories, Methods & Outcomes',
  description: 'Skill categories, assessment methods, frameworks, and outcomes.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessSkillsAssessmentGuide />
    </Suspense>
  );
}