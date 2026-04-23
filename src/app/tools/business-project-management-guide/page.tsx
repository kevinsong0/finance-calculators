import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessProjectManagementGuide from '@/components/BusinessProjectManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What methodologies guide project management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Project methodologies include: Waterfall (sequential phases for defined scope), Agile (iterative delivery for adaptive projects), Hybrid (mixed approach for balanced needs), and PMI/PMBOK (standard framework for structured projects)."
      }
    },
    {
      "@type": "Question",
      "name": "What phases define project lifecycle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Project phases include: initiation, planning, execution, monitoring, controlling, closing, post-project review, and lessons learned. Each phase ensures structured project progression."
      }
    },
    {
      "@type": "Question",
      "name": "What elements require project management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management elements include: scope management, time management, cost management, quality management, resource management, risk management, communication management, and stakeholder management. Each element controls critical project aspects."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure project success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: project completion rate, on-time delivery, budget adherence, scope delivery, quality score, stakeholder satisfaction, risk mitigation success, and team performance. These metrics track project effectiveness."
      }
    },
    {
      "@type": "Question",
      "name": "Why is project management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Project management ensures successful delivery through structure, improves resource utilization and efficiency, manages risk and complexity, enables stakeholder alignment, and drives continuous improvement. Strategic project management delivers business value."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Project Management Guide - Methodologies & Phases',
  description: 'Project methodologies, lifecycle phases, management elements, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessProjectManagementGuide />
    </Suspense>
  );
}
