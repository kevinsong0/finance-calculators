import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessContinuousImprovementGuide from '@/components/BusinessContinuousImprovementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What approaches drive continuous improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Continuous improvement approaches include lean improvement for waste elimination through value stream method, Kaizen for small changes through daily improvement method, Six Sigma for variation reduction through DMAIC process method, Agile improvement for iterative change through sprint reviews method, PDCA cycle for trial learning through plan-do-check-act method, and BPR for process redesign through radical change method."
      }
    },
    {
      "@type": "Question",
      "name": "What is the improvement cycle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The continuous improvement cycle involves identifying improvement opportunity, analyzing current performance, defining improvement goals, developing improvement plan, implementing improvement changes, measuring improvement results, evaluating improvement impact, standardizing successful improvements, identifying next opportunities, and sustaining improvement momentum."
      }
    },
    {
      "@type": "Question",
      "name": "What tools support continuous improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Continuous improvement tools include process mapping for visualization and understanding flows, root cause analysis for problem solving and finding causes, benchmarking for comparison and performance gaps, and metrics tracking for measurement and progress monitoring."
      }
    },
    {
      "@type": "Question",
      "name": "What culture elements enable improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Continuous improvement culture elements include improvement mindset, learning environment, experiment encouragement, failure acceptance, knowledge sharing, recognition systems, training programs, and leadership support."
      }
    },
    {
      "@type": "Question",
      "name": "Why pursue continuous improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Continuous improvement delivers competitive advantage through identifying opportunities, analyzing performance, defining goals, developing plans, implementing changes, measuring results, evaluating impact, standardizing improvements, identifying next opportunities, and sustaining momentum."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Continuous Improvement Guide - Approaches, Cycle & Culture',
  description: 'Improvement approaches, process cycle, supporting tools, and culture elements.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessContinuousImprovementGuide />
    </Suspense>
  );
}