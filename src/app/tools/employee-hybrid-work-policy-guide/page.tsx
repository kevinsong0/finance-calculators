import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeHybridWorkPolicyGuide from '@/components/EmployeeHybridWorkPolicyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What hybrid work models exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hybrid models include fixed schedule (set onsite days providing predictable routine), flexible choice (employee discretion for personal control), team-based (team coordination based on collaboration needs), role-specific (job requirements driving function), manager-approved (case-by-case with supervised flexibility), and project-driven (work demands dictating task requirements)."
      }
    },
    {
      "@type": "Question",
      "name": "What components should hybrid policy address?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Policy components include onsite schedule definition, remote work expectations, communication protocols, technology requirements, meeting coordination procedures, performance measurement methods, equipment allocation, and office space management."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges arise in hybrid work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common challenges include scheduling complexity (coordination effort solved by clear calendar systems), communication gaps (hybrid disconnect solved by unified platforms), equity concerns (treatment fairness solved by consistent policy), and space constraints (office capacity solved by booking systems)."
      }
    },
    {
      "@type": "Question",
      "name": "What best practices support hybrid work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best practices include clear policy documentation, technology investment, team coordination protocols, flexible scheduling options, outcome-based evaluation, regular check-ins, space booking systems, and continuous policy review."
      }
    },
    {
      "@type": "Question",
      "name": "How do you choose the right hybrid model?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choosing the right model depends on company culture, role requirements, team collaboration needs, employee preferences, office capacity, technology capabilities, and management capacity. Consider starting flexible and adjusting based on performance data and employee feedback."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Hybrid Work Policy Guide - Models, Components & Best Practices',
  description: 'Hybrid work models, policy components, challenges, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeHybridWorkPolicyGuide />
    </Suspense>
  );
}