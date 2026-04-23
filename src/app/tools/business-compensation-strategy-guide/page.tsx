import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessCompensationStrategyGuide from '@/components/BusinessCompensationStrategyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the elements of compensation strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compensation elements include base salary for market positioning with competitive levels, incentive pay for performance drive with goal alignment, benefits package for total rewards meeting employee needs, and equity compensation for long-term retention with ownership."
      }
    },
    {
      "@type": "Question",
      "name": "What is the compensation strategy process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The compensation strategy process involves conducting market analysis, defining compensation philosophy, developing pay structures, creating incentive plans, designing benefits programs, implementing compensation systems, communicating compensation, reviewing regularly, adjusting levels, and monitoring effectiveness."
      }
    },
    {
      "@type": "Question",
      "name": "What factors affect compensation strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compensation strategy factors include market rates affecting competitive positioning through benchmarking, internal equity affecting fairness perception through job evaluation, performance affecting pay differentiation through merit systems, and budget constraints affecting affordability through cost management."
      }
    },
    {
      "@type": "Question",
      "name": "What are compensation strategy principles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compensation strategy principles include external competitiveness, internal fairness, performance alignment, budget responsibility, legal compliance, transparency, flexibility, and communication clarity."
      }
    },
    {
      "@type": "Question",
      "name": "Why develop a compensation strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compensation strategy enables talent attraction and retention through market analysis, philosophy definition, pay structures, incentive plans, benefits design, system implementation, communication, regular reviews, level adjustments, and effectiveness monitoring."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Compensation Strategy Guide - Elements, Process & Principles',
  description: 'Compensation elements, strategy process, key factors, and principles.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessCompensationStrategyGuide />
    </Suspense>
  );
}