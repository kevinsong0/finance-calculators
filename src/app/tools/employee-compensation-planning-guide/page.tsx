import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeCompensationPlanningGuide from '@/components/EmployeeCompensationPlanningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the main components of employee compensation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Main compensation components include base salary (foundation), bonuses (variable based on performance), commissions (for sales roles), stock options (long-term incentive), benefits (healthcare, retirement), and perks (supplemental offerings)."
      }
    },
    {
      "@type": "Question",
      "name": "What factors determine employee pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pay determination factors include market rates (external benchmarking via salary surveys), role level (position value through job evaluation), experience (capability via skill assessment), performance (results via merit determination), budget constraints (affordability), and internal equity (fairness across similar roles)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the compensation planning process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves defining compensation philosophy, benchmarking market rates, evaluating job levels, designing pay structure, setting pay ranges, determining variable pay options, planning benefits packages, allocating budget, reviewing regularly, and adjusting as needed."
      }
    },
    {
      "@type": "Question",
      "name": "How do you ensure compensation fairness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fairness principles include using consistent criteria across all employees, aligning with market rates, maintaining internal equity, having transparent processes, avoiding bias in decisions, conducting regular reviews, documenting decisions clearly, and providing appeal processes."
      }
    },
    {
      "@type": "Question",
      "name": "How often should compensation plans be reviewed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compensation plans should be reviewed annually at minimum. Market conditions, company performance, industry trends, and regulatory changes may require more frequent adjustments. Regular benchmarking ensures competitiveness and fairness."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Compensation Planning Guide - Components, Factors & Fairness',
  description: 'Compensation components, determination factors, planning process, and fairness.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeCompensationPlanningGuide />
    </Suspense>
  );
}