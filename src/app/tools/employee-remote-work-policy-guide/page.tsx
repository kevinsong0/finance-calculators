import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeRemoteWorkPolicyGuide from '@/components/EmployeeRemoteWorkPolicyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What elements should a remote work policy include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote work policy elements include eligibility criteria (role requirements with performance standards), equipment provisions (hardware and software with company support), communication expectations (availability and responsiveness with response times), work hours (schedule flexibility with core hours policy), security requirements (data protection with VPN and encryption), and performance tracking (output measurement with regular reviews)."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of remote work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote work benefits include increased flexibility (improved employee satisfaction measured by engagement surveys), cost savings (reduced office overhead measured by expense reduction), talent attraction (expanded hiring reach measured by applicant pool), productivity gains (more focus time measured by output metrics), reduced commute (less time and stress measured by wellness scores), and geographic reach (location flexibility measured by hiring geography)."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges arise with remote work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common challenges include communication gaps, collaboration difficulties, isolation concerns, management visibility issues, technology problems, security risks, time zone differences, and culture maintenance difficulties."
      }
    },
    {
      "@type": "Question",
      "name": "What best practices support remote work success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Best practices include clear policy documentation, regular check-ins between managers and employees, comprehensive technology support, flexible scheduling options, outcome-based evaluation methods, team bonding activities, training for managers on remote leadership, and continuous policy improvement."
      }
    },
    {
      "@type": "Question",
      "name": "How should remote work performance be evaluated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote work performance should be evaluated through outcome-based metrics rather than time-based monitoring. Focus on deliverables, project completion, quality of work, responsiveness to communications, and meeting participation. Regular virtual check-ins and documented goals help maintain accountability while respecting employee autonomy."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Remote Work Policy Guide - Elements, Benefits & Best Practices',
  description: 'Remote work policy elements, benefits, challenges, and management best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeRemoteWorkPolicyGuide />
    </Suspense>
  );
}