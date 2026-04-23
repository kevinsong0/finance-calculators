import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessLearningDevelopmentGuide from '@/components/BusinessLearningDevelopmentGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of learning exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learning types include formal training for structured courses and certification, on-the-job learning for work experience and practical skills, mentoring for expert guidance and knowledge transfer, coaching for personal development and performance improvement, e-learning for digital platforms and flexible access, and workshops for interactive sessions and team skills."
      }
    },
    {
      "@type": "Question",
      "name": "What is the learning development process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The learning development process involves identifying learning needs, defining learning objectives, designing learning programs, selecting learning methods, developing learning content, delivering learning experiences, supporting learning transfer, assessing learning outcomes, evaluating program effectiveness, and improving learning initiatives."
      }
    },
    {
      "@type": "Question",
      "name": "What learning approaches work well?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective learning approaches include blended learning combining online and offline for flexibility, microlearning using short modules for retention, social learning through peer interaction for collaboration, and experiential learning with real projects for application."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure learning success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learning success metrics include training completion rate, learning assessment scores, skill application rate, performance improvement, knowledge retention, employee engagement, training ROI, and time to proficiency."
      }
    },
    {
      "@type": "Question",
      "name": "Why invest in learning development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learning development drives organizational growth through identifying needs, defining objectives, designing programs, selecting methods, developing content, delivering experiences, supporting transfer, assessing outcomes, evaluating effectiveness, and improving initiatives."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Learning & Development Guide - Types, Process & Metrics',
  description: 'Learning types, development process, approaches, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessLearningDevelopmentGuide />
    </Suspense>
  );
}