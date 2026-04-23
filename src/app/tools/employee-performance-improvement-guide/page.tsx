import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeePerformanceImprovementGuide from '@/components/EmployeePerformanceImprovementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the performance improvement process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process includes identifying performance gaps, documenting specific issues, meeting with the employee, setting improvement goals, creating an action plan, providing support resources, monitoring progress, providing feedback, evaluating improvement, and making a final decision."
      }
    },
    {
      "@type": "Question",
      "name": "What should a performance improvement plan include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A plan should include performance gaps (specific, measurable issues), improvement goals (clear, achievable targets with deadlines), action steps (concrete activities with weekly milestones), support provided (training, coaching, resource allocation), progress reviews (regular check-ins with scheduled meetings), and success criteria (measurable outcomes for final evaluation)."
      }
    },
    {
      "@type": "Question",
      "name": "What support resources help performance improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Support resources include additional training, mentor assignment, coaching sessions, resource materials, time adjustments, peer assistance, manager guidance, and regular feedback sessions."
      }
    },
    {
      "@type": "Question",
      "name": "What are possible outcomes of performance improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Possible outcomes include successful improvement (continue employment with ongoing support), partial improvement (extended timeline with modified plan), no improvement (separation decision with transition process), or new issues identified (plan revision with updated goals)."
      }
    },
    {
      "@type": "Question",
      "name": "How long should a performance improvement period last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance improvement periods typically last 30-90 days depending on the nature of performance gaps, complexity of improvement required, and company policy. The timeline should be realistic for achieving measurable improvement while providing adequate support and feedback opportunities."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Performance Improvement Guide - Steps, Plans & Support',
  description: 'Improvement process, plan elements, support resources, and possible outcomes.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeePerformanceImprovementGuide />
    </Suspense>
  );
}