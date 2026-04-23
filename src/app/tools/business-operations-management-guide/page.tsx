import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessOperationsManagementGuide from '@/components/BusinessOperationsManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What functions does operations management include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Operations functions include process management (workflow optimization for efficiency), quality control (standard compliance for consistency), supply chain (material flow for availability), inventory management (stock control for balance), capacity planning (resource allocation for utilization), and cost management (expense control for profitability)."
      }
    },
    {
      "@type": "Question",
      "name": "What principles guide operations management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Operations principles include continuous improvement, process standardization, quality focus, efficiency optimization, resource efficiency, customer satisfaction, cost effectiveness, and risk management."
      }
    },
    {
      "@type": "Question",
      "name": "What tools support operations management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management tools include process mapping (visual workflows for clarity), lean principles (waste elimination for efficiency), Six Sigma (variation reduction for quality), and KPI tracking (performance monitoring for accountability)."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure operations performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Operations metrics include process efficiency, quality rate, on-time delivery, inventory turnover, capacity utilization, cost per unit, productivity rate, and customer satisfaction."
      }
    },
    {
      "@type": "Question",
      "name": "How does operations management impact business success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Operations management directly impacts business success by ensuring efficient production, maintaining quality standards, controlling costs, optimizing resources, meeting customer demands, and creating competitive advantages through operational excellence."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Operations Management Guide - Functions, Principles & Metrics',
  description: 'Operations functions, principles, management tools, and performance metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessOperationsManagementGuide />
    </Suspense>
  );
}