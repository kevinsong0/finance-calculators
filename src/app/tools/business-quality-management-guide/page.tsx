import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessQualityManagementGuide from '@/components/BusinessQualityManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What frameworks guide quality management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality frameworks include: ISO 9001 (quality management systems for global certification), TQM (total quality approach for culture-driven quality), Six Sigma (defect reduction for process improvement), and Lean (waste elimination for efficiency optimization)."
      }
    },
    {
      "@type": "Question",
      "name": "What principles drive quality excellence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality principles include: customer focus, leadership commitment, process approach, continuous improvement, evidence-based decisions, relationship management, risk-based thinking, and employee engagement. These principles create quality culture."
      }
    },
    {
      "@type": "Question",
      "name": "What processes manage quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality processes include: quality planning, quality control, quality assurance, quality improvement, quality audit, quality review, quality documentation, and quality training. Each process ensures consistent quality outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure quality success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Success metrics include: defect rate, customer satisfaction, process efficiency, first-pass yield, cost of quality, quality compliance, audit score, and improvement rate. These metrics track quality performance."
      }
    },
    {
      "@type": "Question",
      "name": "Why is quality management important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality management creates competitive advantage through excellence, improves customer satisfaction and loyalty, reduces costs through defect prevention, enables regulatory compliance, and drives continuous improvement. Strategic quality builds business success."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Quality Management Guide - Frameworks & Principles',
  description: 'Quality frameworks, management principles, processes, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessQualityManagementGuide />
    </Suspense>
  );
}
