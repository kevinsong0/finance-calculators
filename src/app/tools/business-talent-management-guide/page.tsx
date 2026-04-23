import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessTalentManagementGuide from '@/components/BusinessTalentManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the components of talent management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Talent management components include talent acquisition for hiring strategy and quality hires, talent development for learning programs and skill growth, talent retention for engagement efforts and employee loyalty, and talent succession for future planning and leadership pipeline."
      }
    },
    {
      "@type": "Question",
      "name": "What is the talent management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The talent management process involves defining talent needs, identifying talent gaps, developing talent strategy, creating talent programs, implementing talent initiatives, monitoring talent metrics, evaluating talent outcomes, adjusting talent approach, building talent culture, and sustaining talent pipeline."
      }
    },
    {
      "@type": "Question",
      "name": "What practices support talent management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Talent management practices include competency frameworks for skill definition and clear standards, career pathing for growth planning and employee development, mentoring programs for knowledge transfer and learning culture, and performance coaching for regular feedback and continuous improvement."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure talent management success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Talent management metrics include time to hire, quality of hire, employee engagement, retention rate, internal mobility, training completion, leadership pipeline strength, and performance ratings."
      }
    },
    {
      "@type": "Question",
      "name": "Why is talent management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Talent management builds organizational capability through defining needs, identifying gaps, developing strategy, creating programs, implementing initiatives, monitoring metrics, evaluating outcomes, adjusting approach, building culture, and sustaining pipeline."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Talent Management Guide - Components, Process & Metrics',
  description: 'Talent management components, process, best practices, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessTalentManagementGuide />
    </Suspense>
  );
}