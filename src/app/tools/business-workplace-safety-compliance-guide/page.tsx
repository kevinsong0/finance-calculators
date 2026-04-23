import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessWorkplaceSafetyComplianceGuide from '@/components/BusinessWorkplaceSafetyComplianceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What safety areas require compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workplace safety areas include physical safety for equipment and environment with engineering controls, chemical safety for substances and materials with handling procedures, biological safety for pathogens and organisms with exposure prevention, ergonomic safety for work positioning with workspace design, psychological safety for stress and harassment with support programs, and fire safety for fire risks with prevention systems."
      }
    },
    {
      "@type": "Question",
      "name": "What are safety compliance requirements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safety compliance requirements include identifying workplace hazards, assessing risk levels, implementing control measures, training employees on safety, monitoring safety performance, reporting safety incidents, investigating safety events, correcting safety deficiencies, documenting safety activities, and reviewing safety compliance."
      }
    },
    {
      "@type": "Question",
      "name": "What safety programs support compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safety programs include safety training for education with initial and ongoing frequency, safety inspections for monitoring with regular audits frequency, incident reporting for documentation with event-based frequency, and emergency response for preparedness with regular drills frequency."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure safety compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safety compliance metrics include incident rate, lost time injuries, near miss reports, safety training completion, inspection compliance, hazard correction time, safety suggestion count, and employee safety perception."
      }
    },
    {
      "@type": "Question",
      "name": "Why ensure safety compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safety compliance protects employees through identifying hazards, assessing risks, implementing controls, training employees, monitoring performance, reporting incidents, investigating events, correcting deficiencies, documenting activities, and reviewing compliance."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Workplace Safety Compliance Guide - Areas, Requirements & Metrics',
  description: 'Safety areas, compliance requirements, safety programs, and performance metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessWorkplaceSafetyComplianceGuide />
    </Suspense>
  );
}