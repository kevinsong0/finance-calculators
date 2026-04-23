import type { Metadata } from 'next';
import { Suspense } from 'react';
import ResumeWritingGuide from '@/components/ResumeWritingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I write a good resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good resume tips: Tailor to specific job (match keywords from posting). Focus on achievements not duties (quantify with numbers, percentages, results). Use action verbs (Led, Developed, Improved, Achieved, Managed). Keep concise (1 page for < 10 years experience, 2 pages max). Highlight relevant experience only. Include key sections: Contact info, Summary, Experience, Skills, Education. Use clean format (consistent font, bullet points, PDF). Proofread multiple times. Generic resume = rejected. Tailored resume = interviews."
      }
    },
    {
      "@type": "Question",
      "name": "What should I include in a resume summary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resume summary: 2-3 lines at top highlighting your value. Include: Years of experience, key skills, industry expertise, notable achievement. Example: 'Software Engineer with 5 years experience building web applications. Led team delivering product used by 1M users. Expert in React, Node.js, AWS.' Avoid generic statements ('Hard worker', 'Team player'). Match to job - emphasize relevant skills. For entry-level: use objective statement instead. Summary = quick pitch, recruiter scans first."
      }
    },
    {
      "@type": "Question",
      "name": "How do I quantify achievements on a resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quantify achievements: Use numbers, percentages, time saved, revenue generated. Examples: 'Increased conversion rate 15%' not 'Improved conversion'. 'Led 8-person team' not 'Led team'. 'Reduced load time 40%' not 'Improved performance'. 'Managed $2M budget' not 'Managed budget'. 'Completed project 2 weeks ahead of schedule' not 'Completed project early'. Quantified = credible, memorable, impressive. Estimate if exact numbers unavailable. Every role has quantifiable achievements - find them."
      }
    },
    {
      "@type": "Question",
      "name": "How long should my resume be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resume length: Entry-level, recent grad: 1 page. 5-10 years experience: 1 page recommended, 2 if necessary. 10+ years, senior roles: 2 pages maximum. Academic, research positions: longer acceptable. Exceptions: federal jobs may require more detail. Rules: Every line must add value. Cut irrelevant experience. Don't pad with unnecessary content. Recruiters spend 6-7 seconds scanning - longer resume = less read. Focus on recent, relevant experience. Older experience summarize briefly."
      }
    },
    {
      "@type": "Question",
      "name": "What resume format should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resume formats: Chronological (most common) - jobs listed newest to oldest, works for steady career history. Functional - skills grouped by category, hides gaps, not preferred by recruiters. Hybrid/Combination - skills section then chronological experience, good for career change. Recommendation: Use chronological format (recruiters prefer, ATS friendly). Include dates for all positions. Don't hide employment gaps (explain in interview). Save as PDF (preserves formatting). File name: FirstName_LastName_Resume.pdf. Avoid unusual fonts, colors, designs (ATS may reject)."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Resume Writing Guide - Sections, Best Practices & Formatting',
  description: 'Resume sections, best practices, common mistakes, and formatting tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ResumeWritingGuide />
    </Suspense>
  );
}